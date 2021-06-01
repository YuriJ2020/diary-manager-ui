import _ from "lodash";
import fetch from "isomorphic-fetch";

import { apply, call, select, takeLatest } from "redux-saga/effects";

import { sagaActions } from "./sagaActions";
import { selectJWT } from "../store/userSlice";
import { setCreateDiaryResponse } from "../store/asyncSlice";
import backend from "../settings/backend";
import store from "../store";

function handleResponse({ body, status }) {
  const hasError = status !== 200;
  if (hasError) {
    const { error } = body;
    const message = _.isString(error) ? error : _.get(error, "[0].message");
    if (!_.isEmpty(message)) {
      store.dispatch(
        setCreateDiaryResponse({ apiData: body, hasError, message })
      );
    } else {
      const msg = "Unexpected error occurred";
      store.dispatch(
        setCreateDiaryResponse({
          apiData: body,
          hasError,
          message: msg,
        })
      );
    }
  } else {
    store.dispatch(setCreateDiaryResponse({ apiData: body, hasError }));
  }
}

export function* handleCreateDiary({ payload }) {
  const body = JSON.stringify(payload);
  const JWT = yield select(selectJWT);
  const options = {
    body,
    method: "POST",
    headers: { "Content-Type": "application/json", JWT },
  };
  const response = yield call(fetch, backend.endpoints.diary, options);
  const resBody = yield apply(response, response.json);
  const { status } = response;
  handleResponse({ body: resBody, status });
}

export function* createDiarySaga() {
  yield takeLatest(sagaActions.createDiary, handleCreateDiary);
}
