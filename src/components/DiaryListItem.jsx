import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import React from "react";

import { selectReadDiariesResponse } from "../store/asyncSlice";
import { setActiveKey } from "../store/tabSlice";
import { setDeleteDiary } from "../sagas/sagaActions";
import { setDiary } from "../store/diarySlice";

const DiaryListItem = ({ index, message }) => {
  const dispatch = useDispatch();
  const {
    apiData: { diaries },
  } = useSelector(selectReadDiariesResponse);
  const diary = diaries[index];

  return (
    <Container>
      <ButtonGroup className="d-flex justify-content-end mb-3">
        <Button
          variant="secondary"
          size="sm"
          className="mx-1"
          style={{ minWidth: "15%", maxWidth: "18%" }}
          onClick={() => dispatch(setDeleteDiary(diary))}
        >
          Delete
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="mx-1"
          style={{ minWidth: "15%", maxWidth: "18%" }}
          onClick={() => {
            dispatch(setDiary(diary));
            dispatch(setActiveKey("diaryEditor"));
          }}
        >
          Edit
        </Button>
      </ButtonGroup>
      <div style={{ whiteSpace: "pre" }}>{message}</div>
    </Container>
  );
};

export default DiaryListItem;
