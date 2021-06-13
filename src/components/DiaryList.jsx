import _ from "lodash";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Container, Nav, Row, Tab, Col } from "react-bootstrap";
import moment from "moment";

import { selectActiveKey, setActiveKey } from "../store/diariesSlice";
import { selectReadDiariesResponse } from "../store/asyncSlice";
import DiaryListItem from "./DiaryListItem";
import frontend from "../settings/frontend";

import styled from "styled-components";

const ContainerS = styled(Container)`
  border-radius: 2rem;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  background-color: #d9afd9;
  background-image: linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%);
  text-align: center;
`;

const DiaryList = () => {
  const dispatch = useDispatch();
  const activeKey = useSelector(selectActiveKey);
  const { apiData, hasError } = useSelector(selectReadDiariesResponse);
  const diaries = hasError ? [] : _.get(apiData, "diaries", []);
  return (
    <ContainerS
      fluid
      className="p-3"
      style={{
        backgroundColor: " #D9AFD9",
        backgroundImage: "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
      }}
    >
      <Tab.Container
        defaultActiveKey={0}
        activeKey={activeKey}
        onSelect={(key) => dispatch(setActiveKey(key))}
      >
        <Row>
          <Col sm={3} style={{ paddingTop: "5rem" }}>
            <Nav variant="" className="flex-column">
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
    </ContainerS>
  );
};

export default DiaryList;
