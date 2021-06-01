import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import moment from "moment";
import Nav from "react-bootstrap/Nav";
import React from "react";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import { selectActiveKey, setActiveKey } from "../store/diariesSlice";
import { selectReadDiariesResponse } from "../store/asyncSlice";
import DiaryListItem from "./DiaryListItem";
import frontend from "../settings/frontend";

const DiaryList = () => {
  const dispatch = useDispatch();
  const activeKey = useSelector(selectActiveKey);
  const { apiData, hasError } = useSelector(selectReadDiariesResponse);
  const diaries = hasError ? [] : _.get(apiData, "diaries", []);
  return (
    <Container fluid className="p-3" style={{ backgroundColor: "azure" }}>
      <Tab.Container
        defaultActiveKey={0}
        activeKey={activeKey}
        onSelect={(key) => dispatch(setActiveKey(key))}
      >
        <Row>
          <Col sm={3} className="mb-3">
            <Nav variant="pills" className="flex-column">
              {_.map(diaries, (diary, idx) => (
                <Nav.Item key={idx}>
                  <Nav.Link eventKey={idx}>
                    {moment(diary.datetime).format(frontend.moment.format)}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {_.map(diaries, (diary, idx) => (
                <Tab.Pane key={idx} eventKey={idx}>
                  <DiaryListItem index={idx} message={diary.message} />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default DiaryList;
