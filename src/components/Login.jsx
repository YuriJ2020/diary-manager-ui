import _ from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Image,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  InputGroup,
} from "react-bootstrap";

import { selectLoginResponse } from "../store/asyncSlice";
import { selectNickname } from "../store/userSlice";
import { setLogin } from "../sagas/sagaActions";

import styled from "styled-components";
import { BsEnvelope, BsLock } from "react-icons/bs";

import UserSVG from "../assets/user.svg";

const ContainerS = styled(Container)`
  border-radius: 2rem;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  background-color: #d9afd9;
  background-image: linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%);
  text-align: center;
`;

const InputGroupS = styled(InputGroup)`
  @media (min-width: 992px) {
    width: 60%;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const nickname = useSelector(selectNickname);
  const { hasError, message } = useSelector(selectLoginResponse);

  return (
    <ContainerS fluid className="p-5">
      <Image src={UserSVG} style={{ width: "6rem" }} />
      <p className="py-4">Please enter your Login details.</p>
      <InputGroupS className="mb-3 mx-auto">
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
      <InputGroupS className="mb-3 mx-auto">
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
      <ButtonGroup className="d-flex justify-content-center mt-4 ">
        <Button
          variant="secondary"
          className="mx-1"
          style={{ minWidth: "21%", maxWidth: "24%" }}
          onClick={() => {
            setEmail("");
            setPassword("");
          }}
        >
          Reset
        </Button>
        <Button
          variant="info"
          className="mx-1 text-white"
          style={{ minWidth: "21%", maxWidth: "24%" }}
          onClick={() => dispatch(setLogin({ email, password }))}
        >
          Login
        </Button>
      </ButtonGroup>
      <Alert
        className="mt-3  mx-auto w-75"
        variant={hasError ? "danger" : "info"}
        hidden={_.isNil(hasError)}
      >
        {hasError ? message : `${nickname}, welcome back!`}
      </Alert>
    </ContainerS>
  );
};

export default Login;
