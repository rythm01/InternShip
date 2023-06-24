import React, { useMemo, useContext } from "react";
import { useState } from "react";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styled from "styled-components";
import { getProfile } from "../../networks/profile";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import { register } from "../../networks/auth";
import {
  // Button,
  ButtonBar,
  CheckBox,
  Container,
  CustomLink,
  // Image,
  InputGroup,
  LogoContainer,
  Page,
  Paragraph,
  Title,
  Row,
  Label,
} from "../../components/common";

import {
  appleImg,
  emailImg,
  facebookImg,
  googleImg,
  passwordImg,
} from "../../assets/images";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";
import TermsConditions from "../Terms&Conditions";
import PrivacyPolicy from "../PrivacyPolicy";
import useWindowSize from "./../../utils/hook/useWindowSize";
import { Box } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { Toaster , toast } from "react-hot-toast";

const Text = styled.span`
  font-family: "TT Commons";
  font-size: 16px;
  color: black;
  margin: auto 0;
  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

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

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [readTerms, setReadTerms] = useState(false);
  const [remember, setRemember] = useState(false);
  const [phonenumber, setPhoneNumber] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isTermAndCondition, setIsTermAndCondition] = useState(false);
  const [isPrivacyPolicy, setIsPrivacyPolicy] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { setToken, t, setProfile } = useContext(AuthContext)
  
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const re =
      /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[0-9])(?=.*[a-z])/;

    if (!re.test(password)) {
      setConfirmPasswordError(true);
      return;
    }
    setError("");
    setConfirmPasswordError(false);

    var data = {
      name: name,
      email: email,
      password: password,
      phoneNumber: phone,
    };
    const res = await register(data);
    console.log(res);
    if (!res.data.success) return setError(res.data.message);
    
    if (res.data.success && res.data.is2fa) {
      setLoading(false)

      return navigate("/2fa", {
        state: {
          data: res.data
        }
      })
    }
    console.log(res.data);

    setToken(res.data.token);
    const response = await getProfile(res.data.token)
    if (!response.data.success) return navigate('/home/create-profile')
    if (response.data.success) {
      setProfile(response.data.data)
      setLoading(false)
      return navigate("/home")
    }
  };

  const HandleSuccess = () => { };
  const HandleFailure = () => { };

  const HandleFacebookLogin = () => { };

  const HandleAppleLogin = ({ authorization: { code, id_token } }) => { };

  useEffect(() => {
    if (t) {
      navigate("/home");
    }
  }, [t]);

  const handleTermsConditionsBack = () => setIsTermAndCondition(false);

  const handlePrivacyPolicyBack = () => setIsPrivacyPolicy(false);
  const { width } = useWindowSize();

  if (isTermAndCondition)
    return (
      <TermsConditions handleTermsConditionsBack={handleTermsConditionsBack} />
    );

  if (isPrivacyPolicy)
    return <PrivacyPolicy handlePrivacyPolicyBack={handlePrivacyPolicyBack} />;

  return (
    <Page justifyContent="flex-start">
     <Toaster />
      <Container margin="100px" padding="70px" borderRadius="20px">
        <Box paddingTop={width < 600 && "50px"}>
          <Title
            margin={width < 600 ? "10px 30px 10px 30px" : "30px 30px 0 30px"}
          >
            Sign Up
          </Title>
        </Box>

        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <InputGroup
            label="Username"
            placeholder="Enter your username here"
            imageSrc={emailImg}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <InputGroup
            label="Email"
            placeholder="Enter your email here"
            type="email"
            imageSrc={emailImg}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <InputGroup
            label="Password"
            placeholder="Enter your password here"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            imageSrc={passwordImg}
          />
          <Row width="-webkit-fill-available" className="w-200">
            <Label>Phone Number</Label>
          </Row>
          <PhoneInput
            label="Phone Number"
            country={"us"}
            value={phone}
            onChange={(event) => {
              setPhone(`+${event}`);
            }}
            dropdownStyle={{
              transform: "translateY(-15px) translateX(15px)",
            }}
            fullWidth="true"
            enableSearch="true"
            disableSearchIcon="true"
            placeholder="Enter your phone number here"
            onFocus={() => setPhoneNumber(true)}
            onBlur={() => setPhoneNumber(false)}
            buttonClass="button"
            inputClass="input"
            inputStyle={{
              border: phone ? "1px solid #00A652" : "1px solid #292D3233",
              maxHeight: "50px",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Text>
              I have read the{" "}
              <span
                onClick={() => {
                  setIsTermAndCondition(true);
                }}
                style={{ color: "#0000f1", cursor: "pointer" }}
              >
                Terms and Conditions
              </span>{" "}
              and{" "}
              <span
                onClick={() => {
                  setIsPrivacyPolicy(true);
                }}
                style={{ color: "#0000f1", cursor: "pointer" }}
              >
                Privacy Policy
              </span>
            </Text>
            <CheckBox
              checked={readTerms}
              onChange={() => setReadTerms((v) => !v)}
            />
          </div>
          {/* <CheckBox
            text="Remember me"
            checked={remember}
            onChange={() => setRemember((v) => !v)}
          /> */}

          {error && <Paragraph color="#FF5F5F">{error}</Paragraph>}

          {readTerms === false && (
            <Paragraph color="#FF5F5F">
              Kindly accept terms and conditions and privacy policy for sign up
            </Paragraph>
          )}
          {confirmPasswordError && (
            <Paragraph color="#FF5F5F">
              Password should have at least one special character one number and
              one capital letter i.e 0,1,A,%,$,%,Z
            </Paragraph>
          )}

          <ButtonBar>
            <Button color="#00A652">Sign Up</Button>
          </ButtonBar>
        </form>
        {/* <Paragraph>Or Sign up with</Paragraph>
        <ButtonBar>
          <Button
            // onClick={() => signupWithGoogle()}
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
          {/* <AppleSignin
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
              toast.error(`Apple SignIn Error: \n ${error}`)
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
        </ButtonBar> */}
        <Paragraph>
          Already have an account?{" "}
          <CustomLink to="/login">
            <Paragraph bold>Log In</Paragraph>
          </CustomLink>
        </Paragraph>
        <LogoContainer top={width > 600 ? "-60px" : width > 400 ? "30px" : "0"}>
          <Logo />
        </LogoContainer>
      </Container>
    </Page>
  );
}
