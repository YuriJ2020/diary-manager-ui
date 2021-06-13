import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import moment from "moment";

import { setCreateDiary, setUpdateDiary } from "../sagas/sagaActions";
import frontend from "../settings/frontend";

import styled from "styled-components";

import {
  selectDatetime,
  selectEmail,
  selectMessage,
  setDatetime,
  setMessage,
} from "../store/diarySlice";

const ContainerS = styled(Container)`
  border-radius: 2rem 0 2rem 2rem;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  background-color: #d9afd9;
  background-image: linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%);
  text-align: center;
`;

const TextareaS = styled.textarea`
  whitespace: pre-line;
  width: 86%;
  border-radius: 2rem;
  border: none;
  padding: 1.2rem;
  outline: none;
`;

const DiaryEditor = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const datetime = useSelector(selectDatetime);
  const message = useSelector(selectMessage);

  const isNew = _.isEmpty(datetime) || _.isEmpty(message);

  const title = isNew
    ? "Create New Diary"
    : `Existing Diary (${moment(datetime).format(frontend.moment.format)})`;

  return (
    <ContainerS fluid className="p-3">
      <ButtonGroup className="d-flex justify-content-end mb-3">
        <Button
          variant="secondary"
          size="sm"
          className="mx-1"
          style={{ minWidth: "15%", maxWidth: "18%" }}
          onClick={() => {
            dispatch(setDatetime(""));
            dispatch(setMessage(""));
          }}
        >
          New
        </Button>
        <Button
          variant="info"
          size="sm"
          className="mx-1 text-white"
          style={{ minWidth: "15%", maxWidth: "18%" }}
          disabled={_.isEmpty(message)}
          onClick={() => {
            if (isNew) {
              const dt = moment().format();
              const diary = { email, datetime: dt, message };
              dispatch(setDatetime(dt));
              dispatch(setCreateDiary(diary));
            } else {
              dispatch(setUpdateDiary({ email, datetime, message }));
            }
          }}
        >
          Save
        </Button>
      </ButtonGroup>
      <h5 className="text-center py-3">{title}</h5>
      <div className="text-center pb-5">
        <TextareaS
          rows={12}
          value={message}
          onChange={(e) => dispatch(setMessage(e.currentTarget.value))}
        />
      </div>
    </ContainerS>
  );
};

export default DiaryEditor;
