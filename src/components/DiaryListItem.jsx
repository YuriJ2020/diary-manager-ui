import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup, Container, Button } from "react-bootstrap";

import { selectReadDiariesResponse } from "../store/asyncSlice";
import { setActiveKey } from "../store/tabSlice";
import { setDeleteDiary } from "../sagas/sagaActions";
import { setDiary } from "../store/diarySlice";

import styled from "styled-components";

import NotePNG from "../assets/note.png";

const DivS = styled.div`
  // background: url(${NotePNG});
  // min-height: 90vh;
  // width: 100%;
  // height: auto;
  // background-position: center;
  // background-repeat: no-repeat;
  // background-size: cover;
  width: 88%;
  margin: 0 auto;
  min-height: 60vh;
  background-color: rgb(227, 235, 238);
  border-radius: 2rem;
  white-space: pre-line;
  line-height: 2rem;
`;

/**
 *
 * @param {object} a prop oject that consists of index and message.
 * @returns DiaryListItem component.
 */
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
          variant="info"
          size="sm"
          className="mx-1 text-white"
          style={{ minWidth: "15%", maxWidth: "18%" }}
          onClick={() => {
            dispatch(setDiary(diary));
            dispatch(setActiveKey("diaryEditor"));
          }}
        >
          Edit
        </Button>
      </ButtonGroup>
      <DivS className="my-5">
        <div style={{ padding: "2rem" }}>{message}</div>
      </DivS>
    </Container>
  );
};

export default DiaryListItem;
