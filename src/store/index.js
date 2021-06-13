import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// import slices
import asyncReducer from "./asyncSlice";
import diariesReducer from "./diariesSlice";
import diaryReducer from "./diarySlice";
import tabReducer from "./tabSlice";
import userReducer from "./userSlice";

import initiateSagas from "../sagas";

const sagaMiddleware = createSagaMiddleware();

// register reducers
const store = configureStore({
  reducer: {
    async: asyncReducer,
    diaries: diariesReducer,
    diary: diaryReducer,
    tab: tabReducer,
    user: userReducer,
  },
  // register sagaMiddleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// register
initiateSagas(sagaMiddleware);

export default store;
