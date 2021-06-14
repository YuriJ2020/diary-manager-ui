import _ from "lodash";
import { apply, call, takeLatest } from "redux-saga/effects";
import fetch from "isomorphic-fetch";

import { sagaActions } from "./sagaActions";
import { setEmail } from "../store/diarySlice";
import { setJWT, setUser } from "../store/userSlice";
import { setLoginResponse } from "../store/asyncSlice";
import backend from "../settings/backend";
import store from "../store";

function handleResponse({ body, status }) {
  const hasError = status !== 200;
  if (hasError) {
    const { error } = body;
    const message = _.isString(error) ? error : _.get(error, "[0].message");
    if (!_.isEmpty(message)) {
      store.dispatch(setLoginResponse({ apiData: body, hasError, message }));
    } else {
      const msg = "Unexpected error occurred";
      store.dispatch(
        setLoginResponse({
          apiData: body,
          hasError,
          message: msg,
        })
      );
    }
  } else {
    const {
      user: { email },
    } = body;
    store.dispatch(setEmail(email));
    store.dispatch(setLoginResponse({ apiData: body, hasError }));
  }
}

export function* handleLogin({ payload }) {
  const body = JSON.stringify(payload);
  const options = {
    body,
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  const response = yield call(fetch, backend.endpoints.login, options);
  const resBody = yield apply(response, response.json);

  const { headers, status } = response;
  const { user } = resBody;
  const jwt = yield apply(headers, headers.get, ["JWT"]);
  if (status === 200) {
    store.dispatch(setUser(user));
    store.dispatch(setJWT(jwt));
  }
  handleResponse({ body: resBody, status });
}

export function* loginSaga() {
  yield takeLatest(sagaActions.login, handleLogin);
}
