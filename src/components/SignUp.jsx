import _ from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  Button,
  ButtonGroup,
  Container,
  Image,
  FormControl,
  InputGroup,
} from "react-bootstrap";

import { selectSignUpResponse } from "../store/asyncSlice";
import { setSignUp } from "../sagas/sagaActions";

import { BsEnvelope, BsLock, BsPerson } from "react-icons/bs";
import styled from "styled-components";

import diarySVG from "../assets/diary2.svg";

const ContainerS = styled(Container)`
  text-align: center;
  border-radius: 0 2rem 2rem 2rem;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  background-color: #d9afd9;
  background-image: linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%);
`;

const InputGroupS = styled(InputGroup)`
  @media (min-width: 992px) {
    width: 60%;
  }
`;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { hasError, message } = useSelector(selectSignUpResponse);

  return (
    <ContainerS fluid className="p-5">
      <div className="text-center">
        <h1 className="h2-responsive pt-3 text-white font-weight-bold">
          Simple Diary
        </h1>

        <p className="my-3 text-white" style={{ fontSize: "1.2rem" }}>
          This app for the ones who love writing Diary.
        </p>
        <Image src={diarySVG} style={{ width: "5.4rem" }} className="py-4" />

        <p className="mb-2">Please sign up before you start.</p>
        <InputGroupS className="py-2 mx-auto">
          <InputGroup.Text>
            <BsEnvelope />
          </InputGroup.Text>
          <FormControl
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </InputGroupS>

        <InputGroupS className="py-2 mx-auto">
          <InputGroup.Text>
            <BsPerson />
          </InputGroup.Text>
          <FormControl
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.currentTarget.value)}
          />
        </InputGroupS>

        <InputGroupS className="py-2 mx-auto">
          <InputGroup.Text>
            <BsLock />
          </InputGroup.Text>
          <FormControl
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </InputGroupS>
      </div>

      <ButtonGroup className="d-flex justify-content-center my-2">
        <Button
          variant="secondary"
          className="mx-1"
          style={{ minWidth: "21%", maxWidth: "24%" }}
          onClick={() => {
            setEmail("");
            setNickname("");
            setPassword("");
          }}
        >
          Reset
        </Button>
        <Button
          variant="info"
          className="mx-1 text-white"
          style={{ minWidth: "21%", maxWidth: "24%" }}
          onClick={() => dispatch(setSignUp({ email, nickname, password }))} // dispatchされるactionはsetSignUpが呼び起こされた後の返り値となる　setSignUp= action Creater 試図
        >
          Sign Up
        </Button>
      </ButtonGroup>

      <Alert
        className="mt-3 mx-auto w-75"
        variant={hasError ? "danger" : "success"}
        hidden={_.isNil(hasError)}
      >
        {hasError ? message : "Sign up is successful!"}
      </Alert>
    </ContainerS>
  );
};

export default SignUp;
