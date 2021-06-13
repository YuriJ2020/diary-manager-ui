import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";

import { selectJWT } from "../store/userSlice";
import { selectActiveKey, setActiveKey } from "../store/tabSlice";
import { setReadDiaries } from "../sagas/sagaActions";
import DiaryEditor from "../components/DiaryEditor";
import DiaryList from "../components/DiaryList";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const App = () => {
  const dispatch = useDispatch();
  const isJWTMissing = _.isEmpty(useSelector(selectJWT));
  const activeKey = useSelector(selectActiveKey);
  const handleTabSelection = (key) => {
    dispatch(setActiveKey(key));
    if (key === "diaryList") dispatch(setReadDiaries());
  };

  return (
    <Container fluid="md" className="mt-3">
      <Tabs activeKey={activeKey} onSelect={handleTabSelection} fill>
        <Tab eventKey="signup" title="Sign Up">
          <SignUp />
        </Tab>
        <Tab eventKey="login" title="Login">
          <Login />
        </Tab>
        <Tab eventKey="diaryList" title="Diary List" disabled={isJWTMissing}>
          <DiaryList />
        </Tab>
        <Tab
          eventKey="diaryEditor"
          title="Diary Editor"
          disabled={isJWTMissing}
        >
          <DiaryEditor />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default App;
