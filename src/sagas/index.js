import { createDiarySaga } from "./createDiarySaga";
import { deleteDiarySaga } from "./deleteDiarySaga";
import { loginSaga } from "./loginSaga";
import { readDiariesSaga } from "./readDiariesSaga";
import { signUpSaga } from "./signUpSaga";
import { updateDiarySaga } from "./updateDiarySaga";

const initiateSagas = (sagaMiddleware) => {
  sagaMiddleware.run(createDiarySaga);
  sagaMiddleware.run(deleteDiarySaga);
  sagaMiddleware.run(loginSaga);
  sagaMiddleware.run(readDiariesSaga);
  sagaMiddleware.run(signUpSaga);
  sagaMiddleware.run(updateDiarySaga);
};

export default initiateSagas;
