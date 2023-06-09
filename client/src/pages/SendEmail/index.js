import React from "react";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import {
  Back,
  Button,
  ButtonBar,
  Container,
  InputGroup,
  LogoContainer,
  Page,
  Paragraph,
  Title,
} from "../../components/common";

import { useState } from "react";
import { appleImg, emailImg } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postResetPassword } from "../../api";
import {
  requestResetPassword,
  setResetPasswordError,
} from "../../store/slice/mainSlice";
import useWindowSize from "../../utils/hook/useWindowSize";

export default function SendEmail() {
  const [error, seterror] = useState([]);
  const [validateEmail, setValidateEmail] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || !regEmail.test(email)) {
      setValidateEmail(true);
      return;
    }

    if (email) {
      setValidateEmail(false);
      dispatch(requestResetPassword(email));
      try {
        const data = await postResetPassword(email);
        console.log("postResetPassword.data", data);
        if (data.message === "User not found.") {
          seterror(data);
        } else {
          navigate("/verify-forgot-password");
        }
      } catch (error) {
        dispatch(setResetPasswordError(error.message));
        seterror(error.response.data);
      }
    }
  };

  const { width } = useWindowSize();

  return (
    <Page>
      <Container margin="100px" padding="70px" borderRadius="20px">
        <Back back="back" />

        <Title margin="30px">Forgot Password</Title>
        <Paragraph color="#4B4646" width="200px">
          Please enter the email address you used to register
        </Paragraph>
        <form
          onSubmit={handleForgotPassword}
          style={{
            width: width < 600 && "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <InputGroup
            label="Email"
            placeholder="Enter your email here"
            imageSrc={emailImg}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          {error.message && (
            <Paragraph color="#FF5F5F">{error.message}</Paragraph>
          )}
          {error.non_field_errors && (
            <Paragraph color="#FF5F5F">{error.non_field_errors[0]}</Paragraph>
          )}
          {validateEmail && (
            <Paragraph color="#FF5F5F">Please Enter a valid Email</Paragraph>
          )}
          {error.username && (
            <Paragraph color="#FF5F5F">Fields cannot be empty</Paragraph>
          )}

          <ButtonBar>
            <Button color="#00A652" type="submit">
              Submit
            </Button>
          </ButtonBar>
        </form>

        <LogoContainer>
          <Logo />
        </LogoContainer>
      </Container>
    </Page>
  );
}
