import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import asyncReducer from "./asyncSlice";
import diariesReducer from "./diariesSlice";
import diaryReducer from "./diarySlice";
import tabReducer from "./tabSlice";
import userReducer from "./userSlice";

import initiateSagas from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    async: asyncReducer,
    diaries: diariesReducer,
    diary: diaryReducer,
    tab: tabReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

initiateSagas(sagaMiddleware);

export default store;
