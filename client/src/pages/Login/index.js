import React, { Fragment, useContext, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import {
  // Button,
  ButtonBar,
  CheckBox,
  Container,
  CustomLink,
  Divider,
  // Image,
  InputGroup,
  LogoContainer,
  Page,
  Paragraph,
  Title,
} from "../../components/common";
import { useState } from "react";
import {
  appleImg,
  emailImg,
  facebookImg,
  googleImg,
  passwordImg,
} from "../../assets/images";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import AppleSignin from "react-apple-signin-auth";
import { login } from "../../networks/auth";
import { useGoogleLogin } from "@react-oauth/google";
import useWindowSize from "./../../utils/hook/useWindowSize";
import { AuthContext } from "../../context/AuthContext";
import { getProfile } from "../../networks/profile";
import BankForm from "../../components/common/Forms/BankForm";
import CreditcardForm from "../../components/common/Forms/CreditcardForm";
import Recipe from "../../components/common/Forms/Recipe";
import LoanAccountForm from "../../components/common/Forms/LoanAccountForm";
import MerchantAccountForm from "../../components/common/Forms/MerchantAccountForm";
import MiscForm from "../../components/common/Forms/MiscForm";
import { Password } from "@mui/icons-material";
import PasswordStotageForm from "../../components/common/Forms/PasswordStotageForm";
import SignUp from "../../components/common/Forms/SignUp";
import LoadingSpinner from "../../components/common/LoadingSpinner";


const Image = styled.img`
  @media (max-width: 900px) {
    width: 20px;
  }
`;
const Button = styled.button`
  width: ${(props) => props.width ?? "154px"};
  height: ${(props) => props.height ?? "60px"};
  background: ${(props) => props.color};
  border-radius: ${(props) => props.borderRadius ?? "5px"};
  ${(props) => props.border && "border: 1px solid #000000;"}

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.textColor ?? "#ffffff"};
  border: 1px solid rgba(0, 0, 0, 0.05);

  font-family: "TT Commons";
  font-size: 18px;
  font-weight: 600;

  margin: ${(props) => props.margin ?? "8px"};

  cursor: pointer;

  @media (max-width: 1200px) {
    width: 150px;
    height: 50px;
    font-size: 17px;
  }
  @media (max-width: 900px) {
    width: 120px;
    height: 45px;
    font-size: 15px;
  }
  @media (max-width: 600px) {
    width: 80px;
    height: 40px;
    font-size: 12px;
    margin: 0 4px;
  }
  @media (max-width: 400px) {
    width: 70px;
    height: 37px;
    font-size: 11px;
  }
`;
export default function Login() {
  const [error, setError] = useState("");
  const [validateEmail, setValidateEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setToken, t, setProfile } = useContext(AuthContext)



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [remember, setRemember] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login({ email, password });
    if (!res.data.success) {
      setLoading(false)
      return setError(res.data.message)
    }
    if (res.data.success && res.data.is2fa) {
      setLoading(false)

      return navigate("/2fa", {
        state: {
          data: res.data
        }
      })
    }
    console.log(res.data.token);
    setToken(res.data.token)

    const response = await getProfile(res.data.token)
    if (!response.data.success) return navigate('/create-profile')
    if (response.data.success) {
      setProfile(response.data.data)
      setLoading(false)
      return navigate("/")
    }
  };


  useEffect(() => {
    if (t) {
      navigate("/")
    }
  }, [t])

  const handleForgotPassword = async () => {
    navigate("/send-email");
  };

  const HandleAppleLogin = async () => {
  }

  const HandleFacebookLogin = async () => {
  }


  const { width } = useWindowSize();


  if (loading) {
    return <LoadingSpinner />
  }


  return (
    <>
      
      <Page justifyContent="flex-start">
        <Container margin="100px auto" padding="70px" borderRadius="20px">
          <Title
            margin={width < 600 ? "100px 30px 30px 30px" : "30px 30px 0 30px"}
          >
            Log In
          </Title>
          <form
            onSubmit={onSubmit}
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
            <InputGroup
              label="Password"
              placeholder="Enter your password here"
              hintText="Forgot Password?"
              onHintClick={handleForgotPassword}
              imageSrc={passwordImg}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <CheckBox
              text="Remember me"
              checked={remember}
              onChange={() => setRemember((v) => !v)}
            />

            {error && (
              <div color="#FF5F5F">
                {error}
              </div>
            )}
            {validateEmail && (
              <div color="#FF5F5F">
                Please Enter a valid Email
              </div>
            )}

            <ButtonBar>
              <Button color="#00A652" type="submit" onSubmit={onSubmit}>
                Log in
              </Button>
            </ButtonBar>
          </form>


          <Divider>Or log in with</Divider>
          <ButtonBar>
            <Button
              // onClick={() => loginWithGoogle()}
              style={{
                backgroundColor: "white",
                color: "black",
                textColor: "#000",
              }}
            >
              <Image
                margin="8px -14px 0 -15px"
                width="80px"
                src={googleImg}
                alt="Google logo"
              />
              Google
            </Button>

            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              callback={HandleFacebookLogin}
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    textColor: "#000",
                  }}
                >
                  <Image width="26px" src={facebookImg} alt="Facebook logo" />{" "}
                  Facebook
                </Button>
              )}
            />
            <AppleSignin
              authOptions={{
                clientId: "com.crowdbotics.storeandsharevault.service",
                scope: "email name",
                redirectURI: `${window.location.origin}/login`,
                state: "state",
                nonce: "nonce",
                usePopup: true,
              }} // REQUIRED
              noDefaultStyle={false}
              onSuccess={HandleAppleLogin}
              onError={({ error }) =>
                error !== "popup_closed_by_user" &&
                alert(`Apple SignIn Error: \n ${error}`)
              }
              skipScript={false}
              render={(props) => (
                <Button {...props} color="#fff" width="154px" textColor="#000">
                  <Image
                    margin="4px -10px 0 -15px"
                    width="70px"
                    src={appleImg}
                    alt="Apple logo"
                  />{" "}
                  Apple
                </Button>
              )}
            />
          </ButtonBar>

          <div>
            Don't have an account?{" "}
            <CustomLink to="/signup">
              <Paragraph bold>Sign Up</Paragraph>
            </CustomLink>
          </div>
          <LogoContainer>
            <Logo />
          </LogoContainer>
        </Container>
      </Page>
    </>
  );
}