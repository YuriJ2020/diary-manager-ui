import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useState } from "react";

import { selectSignUpResponse } from "../store/asyncSlice";
import { setSignUp } from "../sagas/sagaActions";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { hasError, message } = useSelector(selectSignUpResponse);

  return (
    <Container fluid className="p-5" style={{ backgroundColor: "azure" }}>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Email</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Nickname</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.currentTarget.value)}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Password</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </InputGroup>

      <ButtonGroup className="d-flex justify-content-center mt-4">
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
          variant="primary"
          className="mx-1"
          style={{ minWidth: "21%", maxWidth: "24%" }}
          onClick={() => dispatch(setSignUp({ email, nickname, password }))}
        >
          Sign Up
        </Button>
      </ButtonGroup>

      <Alert
        className="mt-3"
        variant={hasError ? "danger" : "success"}
        hidden={_.isNil(hasError)}
      >
        {hasError ? message : "Sign up is successful!"}
      </Alert>
    </Container>
  );
};

export default SignUp;
