import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { AuthContext } from "../../../context/AuthContext";
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import postBankAccountForm from "../../../networks/passwordTypeForms";

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
    
    .eye .eye-icon{
      position : absolute;
      top : 2vh;
      right : 1vw;
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

const BankForm = () => {
  const { t } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const formRef = useRef(null);
  const handleSubmit = (values, { setSubmitting }) => {
    postBankAccountForm(t, values);
    setSubmitting(false);
    console.log(values);
  };

  return (
    <Container>
      <Formik
        initialValues={{
          bank_name: "",
          website: "",
          user_name: "",
          password: "",
          account_number: "",
          routing: "",
          account_nick_name: "",
        }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form ref={formRef}>
            <h1>Bank Account Password Storage Form</h1>

            <fieldset>
              <label>Bank Name:</label>
              <Field type="text" name="bank_name" placeholder="Enter Name" />

              <label>Website/URL</label>
              <Field
                type="text"
                name="website"
                placeholder="Enter url/website"
              />

              <label>User Name:</label>
              <Field
                type="text"
                name="user_name"
                placeholder="Enter username"
              />

              <label htmlFor="password">Password:</label>
              <div className='eye'>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                />
                <div className='eye-icon'>
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
              />

              <label>Routing:</label>
              <Field type="text" name="routing" placeholder="Enter Routing" />

              <label>Account Nick Name:</label>
              <Field
                type="text"
                name="account_nick_name"
                placeholder="Enter account nickname"
              />

              <label>Password Recovery:</label>
              <p>
                we do not recommend storing questions and answer to recover your
                password. Please reset your password instead for added security.
              </p>
            </fieldset>
            <div class="subbutton">
              <span onClick={handleSubmit}>Submit</span>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default BankForm;
