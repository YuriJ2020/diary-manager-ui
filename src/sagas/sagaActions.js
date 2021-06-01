export const sagaActions = {
  signUp: 'sagaActions/signUp',
  login: 'sagaActions/login',
  createDiary: 'sagaActions/createDiary',
  readDiaries: 'sagaActions/readDiaries',
  updateDiary: 'sagaActions/updateDiary',
  deleteDiary: 'sagaActions/deleteDiary',
};

export const setSignUp = user => ({
  type: sagaActions.signUp,
  payload: user,
});

export const setLogin = user => ({
  type: sagaActions.login,
  payload: user,
});

export const setCreateDiary = diary => ({
  type: sagaActions.createDiary,
  payload: diary,
});

export const setReadDiaries = diaries => ({
  type: sagaActions.readDiaries,
  payload: diaries,
});

export const setUpdateDiary = diary => ({
  type: sagaActions.updateDiary,
  payload: diary,
});

export const setDeleteDiary = diary => ({
  type: sagaActions.deleteDiary,
  payload: diary,
});
