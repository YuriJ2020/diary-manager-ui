import _ from "lodash";
import { apply, call, takeLatest } from "redux-saga/effects";
import fetch from "isomorphic-fetch";

import { sagaActions } from "./sagaActions";
import { setEmail } from "../store/diarySlice";
import { setJWT, setUser } from "../store/userSlice";
import { setSignUpResponse } from "../store/asyncSlice";
import backend from "../settings/backend";
import store from "../store";

function handleResponse({ body, status }) {
  const hasError = status !== 200;
  if (hasError) {
    const code = _.get(body, "error.code");
    const emailKeyPattern = _.get(body, "error.keyPattern.email");
    const message = _.get(body, "error.[0].message");
    if (code === 11000 && emailKeyPattern === 1) {
      const msg = "Email address is in use";
      store.dispatch(
        setSignUpResponse({
          apiData: body,
          hasError,
          message: msg,
        })
      );
    } else if (!_.isEmpty(message)) {
      store.dispatch(setSignUpResponse({ apiData: body, hasError, message }));
    } else {
      const msg = "Unexpected error occurred";
      store.dispatch(
        setSignUpResponse({
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
    store.dispatch(setSignUpResponse({ apiData: body, hasError }));
  }
}

export function* handleSignUp({ payload }) {
  const body = JSON.stringify(payload);
  const options = {
    body,
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  const response = yield call(fetch, backend.endpoints.signup, options);
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

export function* signUpSaga() {
  yield takeLatest(sagaActions.signUp, handleSignUp);
}
