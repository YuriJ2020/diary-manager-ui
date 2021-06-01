import _ from "lodash";
import fetch from "isomorphic-fetch";

import { apply, call, put, select, takeLatest } from "redux-saga/effects";

import { reset } from "../store/diarySlice";
import { sagaActions, setReadDiaries } from "./sagaActions";
import { selectActiveKey, setActiveKey } from "../store/diariesSlice";
import { selectJWT } from "../store/userSlice";
import { setDeleteDiaryResponse } from "../store/asyncSlice";
import backend from "../settings/backend";
import moment from "moment";
import store from "../store";

function* handleResponse({ body, status }) {
  const hasError = status !== 200;
  if (hasError) {
    const { error } = body;
    const message = _.isString(error) ? error : _.get(error, "[0].message");
    if (!_.isEmpty(message)) {
      store.dispatch(
        setDeleteDiaryResponse({ apiData: body, hasError, message })
      );
    } else {
      const msg = "Unexpected error occurred";
      store.dispatch(
        setDeleteDiaryResponse({
          apiData: body,
          hasError,
          message: msg,
        })
      );
    }
  } else {
    const activeKey = _.toNumber(yield select(selectActiveKey));
    const nextActiveKey = activeKey > 0 ? activeKey - 1 : 0;
    store.dispatch(setDeleteDiaryResponse({ apiData: body, hasError }));
    store.dispatch(reset());
    yield put(setReadDiaries());
    yield put(setActiveKey(nextActiveKey));
  }
}

export function* handleDeleteDiary({ payload }) {
  const { email, datetime } = payload;
  const body = JSON.stringify({ email, datetime: moment(datetime).format() });
  const JWT = yield select(selectJWT);
  const options = {
    body,
    method: "DELETE",
    headers: { "Content-Type": "application/json", JWT },
  };
  const response = yield call(fetch, backend.endpoints.diary, options);
  const resBody = yield apply(response, response.json);
  const { status } = response;
  yield handleResponse({ body: resBody, status });
}

export function* deleteDiarySaga() {
  yield takeLatest(sagaActions.deleteDiary, handleDeleteDiary);
}
