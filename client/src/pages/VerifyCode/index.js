import React, { useContext, useEffect } from "react";
import {
  Back,
  Button,
  ButtonBar,
  Container,
  Image,
  Page,
  Paragraph,
  Title,
} from "../../components/common";
import ReactCodeInput from "react-code-input";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import { AuthContext } from "../../context/AuthContext";
import { verifyCode, resendCode } from "../../networks/auth";
import { getProfile } from "../../networks/profile";

import LoadingSpinner from "../../components/common/LoadingSpinner";


export default function VerifyCode({ twofactor, imageSrc, title }) {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const [loading, setIsLoading] = useState(false)


  const { data: { id } } = useLocation().state;

  const { setToken } = useContext(AuthContext)



  const handleResend = async () => {
    setIsLoading(true)
    const res = await resendCode({ id });
    if (!res.data.success) {
      setIsLoading(false)
      return setError(res.data.message)
    }
    setError("Code sent successfully")
    setIsLoading(false)
  };





  useEffect(() => {

  }, []);



  const handleVerifyOtp = async () => {
    setIsLoading(true)
    if (code.length !== 6) {
      return setError("Please enter a valid code");
    }

    const res = await verifyCode({ id, otp: code });
    if (!res.data.success) {
      setIsLoading(false)
      return setError(res.data.message)
    }


    setToken(res.data.token)

    setIsLoading(false)
    const response = await getProfile(res.data.token)
    if (!response.data.success) {
      setIsLoading(false)
      return navigate('/home/create-profile')
    }
    if (response.data.success) {
      setIsLoading(false)
      return navigate("/home")
    }
  };



  if (loading) return <LoadingSpinner />



  return (
    <Page>
      <Container
        width="927px"
        margin="100px"
        padding="70px"
        borderRadius="20px"
      >
        <Back back="back" />

        <Title margin="46px 0 0">{title}</Title>
        <Image src={imageSrc} />
        <Paragraph>
          We've sent a 6 digit PIN to your phone number. Please put the PIN
          below to continue
        </Paragraph>

        <ReactCodeInput
          type="text"
          className="number_input"
          fields={6}
          inputStyle={{
            border: "1px solid rgba(41, 45, 50, 0.2)",
            fontFamily: "TT Commons",
            textAlign: "center",
          }}
          onChange={(code) => setCode(code)}
        />
        {error && <Paragraph color="#FF5F5F">{error}</Paragraph>}
        <ButtonBar>
          <Button color="#00A652" onClick={handleVerifyOtp}>
            Submit
          </Button>
        </ButtonBar>
        <Paragraph bold link color="#292D32" onClick={handleResend}>
          Resend Code?
        </Paragraph>
      </Container>
    </Page>
  );
}
