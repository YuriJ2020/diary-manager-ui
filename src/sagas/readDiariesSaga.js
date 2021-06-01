import _ from "lodash";
import fetch from "isomorphic-fetch";

import { apply, call, select, takeLatest } from "redux-saga/effects";

import { sagaActions } from "../sagas/sagaActions";
import { selectJWT, selectEmail } from "../store/userSlice";
import { setReadDiariesResponse } from "../store/asyncSlice";
import backend from "../settings/backend";
import store from "../store";

function handleResponse({ body, status }) {
  const hasError = status !== 200;
  if (hasError) {
    const { error } = body;
    const message = _.isString(error) ? error : _.get(error, "[0].message");
    if (!_.isEmpty(message)) {
      store.dispatch(
        setReadDiariesResponse({ apiData: body, hasError, message })
      );
    } else {
      const msg = "Unexpected error occurred";
      store.dispatch(
        setReadDiariesResponse({
          apiData: body,
          hasError,
          message: msg,
        })
      );
    }
  } else {
    store.dispatch(setReadDiariesResponse({ apiData: body, hasError }));
  }
}

export function* handleReadDiaries() {
  const email = yield select(selectEmail);
  const url = new URL(backend.endpoints.diary);
  url.search = new URLSearchParams({ email }).toString();
  const JWT = yield select(selectJWT);
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json", JWT },
  };
  const response = yield call(fetch, url, options);
  const resBody = yield apply(response, response.json);
  const { status } = response;
  handleResponse({ body: resBody, status });
}

export function* readDiariesSaga() {
  yield takeLatest(sagaActions.readDiaries, handleReadDiaries);
}
