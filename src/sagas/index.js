import { createDiarySaga } from "./createDiarySaga";
import { deleteDiarySaga } from "./deleteDiarySaga";
import { loginSaga } from "./loginSaga";
import { readDiariesSaga } from "./readDiariesSaga";
import { signUpSaga } from "./signUpSaga";
import { updateDiarySaga } from "./updateDiarySaga";

// iniciate sagas それぞれの小sagamiddlewareに登録する
const initiateSagas = (sagaMiddleware) => {
  sagaMiddleware.run(createDiarySaga);
  sagaMiddleware.run(deleteDiarySaga);
  sagaMiddleware.run(loginSaga);
  sagaMiddleware.run(readDiariesSaga);
  sagaMiddleware.run(signUpSaga);
  sagaMiddleware.run(updateDiarySaga);
};

export default initiateSagas;

// 1.redux store にsagaのmiddlewareを登録
// 2. それぞれの小sagaをsagaのmiddlewareに登録する
