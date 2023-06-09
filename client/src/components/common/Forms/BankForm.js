import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { AuthContext } from "../../../context/AuthContext";
import {
  getBankAccountDetail,
  postBankAccountForm,
  updateBankAccountForm,
} from "../../../networks/passwordTypeForms";

const Container = styled.form`
  max-width: 500px;
  margin: 10px auto;
  padding: 10px 20px;
  background: #fff;
  border-radius: 8px;

  h1 {
    margin: 0 0 30px 0;
    text-align: center;
  }

  fieldset {
    margin-bottom: 30px;
    border: none;

    label {
      font-weight: 600;
      display: block;
      margin-bottom: 8px;
    }

    input[type="text"],
    input[type="password"],
    input[type="tel"],
    input[type="date"] {
      background: #fff;
      border: 1px solid rgba(41, 45, 50, 0.2);
      border-radius: 10px;
      font-size: 16px;
      height: auto;
      margin: 0;
      margin-right: 20px;
      outline: 0;
      padding: 15px;
      width: 100%;
      background-color: #fff;
      color: #000;
      box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
      margin-bottom: 30px;
    }
    .eye {
      position: relative;
    }

    .eye .eye-icon {
      position: absolute;
      top: 2vh;
      right: 1vw;
    }
    p {
      font-weight: 300;
    }
  }

  .subbutton {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      padding: 19px 39px 18px 39px;
      color: #fff;
      background-color: #00a652;
      font-size: 18px;
      font-style: normal;
      text-align: center;
      border-radius: 5px;
      width: 50%;
      border: 1px solid #00a652;
      border-width: 1px 1px 3px;
      border-radius: 10px;
      box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
      margin-bottom: 10px;
      font-weight: 600;
      cursor: pointer;
    }
  }
`;

const BankForm = ({ isEdit, id }) => {
  const { t } = useContext(AuthContext);
  const navigate = useNavigate();
  const [getAccountData, setAccountData] = useState();
  const [getAllowedData, setAllowedData] = useState();
  const [isData, setIsData] = useState(true);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (id && isEdit) {
      getBankAccountDetail(t, id)
        .then((res) => {
          setAccountData(res?.data?.data);
          setAllowedData(res.data?.allowedData);
          setIsData(true);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  useEffect(() => {
    if (id && isEdit && !getAccountData && !getAllowedData) {
      setIsData(false);
    }
  }, [getAccountData]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (id && isEdit) {
        setIsProfileEdit(!isProfileEdit);
        if (!isProfileEdit) return null;
        await updateBankAccountForm(t, id, values);
      } else {
        await postBankAccountForm(t, values);
      }
      navigate("/home/passwords/bankaccountpassword");
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Formik
        enableReinitialize
        initialValues={{
          bank_name:
            getAccountData?.bank_name || getAllowedData?.bank_name || "",
          website: getAccountData?.website || getAllowedData?.website || "",
          user_name:
            getAccountData?.user_name || getAllowedData?.user_name || "",
          password: getAccountData?.password || getAllowedData?.password || "",
          account_number:
            getAccountData?.account_number ||
            getAllowedData?.account_number ||
            "",
          routing: getAccountData?.routing || getAllowedData?.routing || "",
          account_nick_name:
            getAccountData?.account_nick_name ||
            getAllowedData?.account_nick_name ||
            "",
        }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form>
            <h1>Bank Account Password Storage Form</h1>

            {isData ? (
              <>
                <fieldset>
                  <label>Bank Name:</label>
                  <Field
                    type="text"
                    name="bank_name"
                    placeholder="Enter Name"
                    disabled={(isEdit && !isProfileEdit) || getAllowedData}
                  />

                  <label>Website/URL</label>
                  <Field
                    type="text"
                    name="website"
                    placeholder="Enter url/website"
                    disabled={(isEdit && !isProfileEdit) || getAllowedData}
                  />

                  <label>User Name:</label>
                  <Field
                    type="text"
                    name="user_name"
                    placeholder="Enter username"
                    disabled={(isEdit && !isProfileEdit) || getAllowedData}
                  />

                  <label>Password:</label>
                  <div className="eye">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      disabled={(isEdit && !isProfileEdit) || getAllowedData}
                    />
                    <div className="eye-icon">
                      {showPassword ? (
                        <IoEyeOffOutline
                          size={24}
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <IoEyeOutline
                          size={24}
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </div>
                  </div>
                  <label>Account:</label>
                  <Field
                    type="tel"
                    name="account_number"
                    placeholder="Enter Account"
                    disabled={(isEdit && !isProfileEdit) || getAllowedData}
                  />

                  <label>Routing:</label>
                  <Field
                    type="text"
                    name="routing"
                    placeholder="Enter Routing"
                    disabled={(isEdit && !isProfileEdit) || getAllowedData}
                  />

                  <label>Account Nick Name:</label>
                  <Field
                    type="text"
                    name="account_nick_name"
                    placeholder="Enter account nickname"
                    disabled={(isEdit && !isProfileEdit) || getAllowedData}
                  />

                  <label>Password Recovery:</label>
                  <p>
                    we do not recommend storing questions and answer to recover
                    your password. Please reset your password instead for added
                    security.
                  </p>
                </fieldset>
                <div class="subbutton">
                  <span
                    disabled={getAllowedData}
                    onClick={() => !getAllowedData && handleSubmit()}
                  >
                    {isEdit ? (isProfileEdit ? "Update" : "Edit") : "Submit"}
                  </span>
                </div>
              </>
            ) : (
              "No Data Found"
            )}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default BankForm;
