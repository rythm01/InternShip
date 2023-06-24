import React, { useRef, useContext, useState, useEffect } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Formik, Form, Field } from "formik";
import { AuthContext } from "../../../context/AuthContext";
// import postPasswordStotageForm from "../../../networks/passwordTypeForms";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  getPasswordStorageDetails,
  postPasswordStorage,
  updatePasswordStorage,
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
const PasswordStorageForm = ({ id, isEdit }) => {
  const { t } = useContext(AuthContext);
  const navigate = useNavigate();
  const [getMerchantAccount, setMerchantAccount] = useState();
  const [isData, setIsData] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (id && isEdit) {
      getPasswordStorageDetails(t, id)
        .then((res) => {
          setMerchantAccount(res?.data?.data);
          setIsData(true);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  useEffect(() => {
    if (id && isEdit && !getMerchantAccount) {
      setIsData(false);
    }
  }, [getMerchantAccount]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (id && isEdit) {
        await updatePasswordStorage(t, id, values);
      } else {
        await postPasswordStorage(t, values);
      }
      navigate("/home/passwords/nonbankerpassword");
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
          website: getMerchantAccount?.website || "",
          user_name: getMerchantAccount?.user_name || "",
          password: getMerchantAccount?.password || "",
          account_nick_name: getMerchantAccount?.account_nick_name || "",
        }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form>
            <h1>Password Storage Form</h1>

            {isData ? (
              <>
                <fieldset>
                  <label htmlFor="url">Website/URL</label>
                  <Field
                    type="text"
                    name="website"
                    placeholder="Enter url/website"
                  />

                  <label htmlFor="username">User Name:</label>
                  <Field
                    type="text"
                    name="user_name"
                    placeholder="Enter username"
                  />

                  <label htmlFor="password">Password:</label>
                  <div className="eye">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
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

                  <label htmlFor="nickname">Account Nick Name:</label>
                  <Field
                    type="text"
                    name="account_nick_name"
                    placeholder="Enter account nickname"
                  />

                  <label htmlFor="password">Password Recovery:</label>
                  <p>
                    we do not recommend stroing questions and answer to recoer
                    your password. Please reset your password instead htmlFor
                    added security.
                  </p>
                </fieldset>
                <div className="subbutton">
                  <span onClick={handleSubmit}>
                    {isEdit ? "Update" : "Submit"}
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

export default PasswordStorageForm;
