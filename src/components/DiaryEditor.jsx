import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import moment from "moment";
import React from "react";

import { setCreateDiary, setUpdateDiary } from "../sagas/sagaActions";
import frontend from "../settings/frontend";

import {
  selectDatetime,
  selectEmail,
  selectMessage,
  setDatetime,
  setMessage,
} from "../store/diarySlice";

const DiaryEditor = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const datetime = useSelector(selectDatetime);
  const message = useSelector(selectMessage);

  const isNew = _.isEmpty(datetime) || _.isEmpty(message);

  const title = isNew
    ? "New Diary"
    : `Existing Diary (${moment(datetime).format(frontend.moment.format)})`;

  return (
    <Container fluid className="p-3" style={{ backgroundColor: "azure" }}>
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
          variant="primary"
          size="sm"
          className="mx-1"
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
      <p className="text-center">{title}</p>
      <textarea
        rows={12}
        style={{ whiteSpace: "pre-line", width: "100%" }}
        value={message}
        onChange={(e) => dispatch(setMessage(e.currentTarget.value))}
      />
    </Container>
  );
};

export default DiaryEditor;
