import _ from "lodash";
import fetch from "isomorphic-fetch";
import moment from "moment";

import { apply, call, select, takeLatest } from "redux-saga/effects";

import { sagaActions } from "../sagas/sagaActions";
import { selectJWT } from "../store/userSlice";
import { setUpdateDiaryResponse } from "../store/asyncSlice";
import backend from "../settings/backend";
import store from "../store";

function handleResponse({ body, status }) {
  const hasError = status !== 200;
  if (hasError) {
    const { error } = body;
    const message = _.isString(error) ? error : _.get(error, "[0].message");
    if (!_.isEmpty(message)) {
      store.dispatch(
        setUpdateDiaryResponse({ apiData: body, hasError, message })
      );
    } else {
      const msg = "Unexpected error occurred";
      store.dispatch(
        setUpdateDiaryResponse({
          apiData: body,
          hasError,
          message: msg,
        })
      );
    }
  } else {
    store.dispatch(setUpdateDiaryResponse({ apiData: body, hasError }));
  }
}

export function* handleUpdateDiary({ payload }) {
  const { email, datetime, message } = payload;
  const body = JSON.stringify({
    email,
    datetime: moment(datetime).format(),
    message,
  });
  const JWT = yield select(selectJWT);
  const options = {
    body,
    method: "PUT",
    headers: { "Content-Type": "application/json", JWT },
  };
  const response = yield call(fetch, backend.endpoints.diary, options);
  const resBody = yield apply(response, response.json);
  const { status } = response;
  handleResponse({ body: resBody, status });
}

export function* updateDiarySaga() {
  yield takeLatest(sagaActions.updateDiary, handleUpdateDiary);
}
