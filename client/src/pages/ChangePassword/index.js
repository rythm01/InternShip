import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postChangePassword } from "../../api";
import {
  Back,
  Button,
  ButtonBar,
  Container,
  InputGroup,
  Page,
  Paragraph,
  Title,
} from "../../components/common";
import { changePassword, login } from "../../store/actions/auth";
import { useSetNewPasswordMutation } from "../../store/slice/api";
import {
  passwordChanged,
  requestChangePassword,
  setChangePasswordError,
} from "../../store/slice/mainSlice";

export default function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isSpecialLetter, setIsSpecialLetter] = useState(false);
  const [isCapitalLetter, setIsCapitalLetter] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState(false);
  const [addNewPassword] = useSetNewPasswordMutation();

  const changePasswordSuccess = useSelector(
    (state) => state.reducer.changePassword.success
  );
  const email = useSelector((state) => state.reducer.resetPassword.email);
  const authToken = useSelector((state) => state.reducer.auth.token);

  useEffect(() => {
    if (changePasswordSuccess) {
      navigate("/");
    }
  }, [changePasswordSuccess, navigate]);

  // const handleSubmit = async e => {
  //   e.preventDefault()
  //   const token = `Token ${authToken}`

  //   dispatch(requestChangePassword())
  //   try {
  //     await postChangePassword(password, confirmedPassword, token)
  //     dispatch(passwordChanged())
  //     navigate("/login")
  //   } catch (error) {
  //     dispatch(setChangePasswordError(error.message))
  //   }
  // }

  const handleChangePassword = () => {
    const re =
      /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[0-9])(?=.*[a-z])/;
    if (newPassword !== confirmNewPassword) {
      setConfirmPasswordError(true);
      setIsSpecialLetter(false);
      return;
    }
    if (!re.test(confirmNewPassword)) {
      setIsSpecialLetter(true);
      setConfirmPasswordError(false);
      return;
    }

    addNewPassword({ confirmNewPassword, email })
      .unwrap()
      .then((data) => {
        console.log("data", data);
        if (data.message) {
          setConfirmPasswordError(false);
          setIsSpecialLetter(false);
          navigate("/login");
        } else {
          navigate("/verify-forgot-password");
        }
      })
      .catch((error) => {
        dispatch(setResetPasswordError(error.message));
        console.log("err", error);
      });
  };
  const handleNewPassword = (value) => {
    setNewPassword(value);
  };

  const handleConfimPassword = (value) => {
    setConfirmNewPassword(value);
  };

  return (
    <Page>
      <Container
        width="727px"
        margin="100px"
        padding="70px"
        borderRadius="20px"
      >
        <Title margin="30px">Set New Password</Title>

        {confirmPasswordError && (
          <Paragraph color="#FF5F5F">Password does not matched</Paragraph>
        )}
        {isSpecialLetter && (
          <Paragraph color="#FF5F5F">
            Password should have at least one special character one number and
            one capital letter i.e 0,1,A,%,$,%,Z
          </Paragraph>
        )}

        <InputGroup
          label="Set new password"
          placeholder="Enter your password here"
          type="password"
          value={newPassword}
          onChange={(e) => handleNewPassword(e.target.value)}
        />
        <InputGroup
          label="Confirm password"
          placeholder="Re-type your password here"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => handleConfimPassword(e.target.value)}
        />

        <ButtonBar>
          <Button color="#00A652" onClick={handleChangePassword}>
            Submit
          </Button>
        </ButtonBar>

        <Back />
      </Container>
    </Page>
  );
}
