import React, { useRef, useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getLoanAccountDetails,
  postLoanAccount,
  updateLoanAccount,
} from "../../../networks/passwordTypeForms";
import moment from "moment";
// import postLoanAccountForm from "../../../networks/passwordTypeForms";

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

const LoanAccountForm = ({ isEdit, id }) => {
  const { t } = useContext(AuthContext);
  const navigate = useNavigate();
  const [getLoanAccount, setLoanAccount] = useState();
  const [isData, setIsData] = useState(true);

  useEffect(() => {
    if (id && isEdit) {
      getLoanAccountDetails(t, id)
        .then((res) => {
          setLoanAccount(res?.data?.data);
          setIsData(true);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  useEffect(() => {
    if (id && isEdit && !getLoanAccount) {
      setIsData(false);
    }
  }, [getLoanAccount]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (id && isEdit) {
        await updateLoanAccount(t, id, values);
      } else {
        await postLoanAccount(t, values);
      }
      navigate("/passwords/loanaccountpassword");
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
          creditor_name: getLoanAccount?.creditor_name || "",
          website: getLoanAccount?.website || "",
          user_name: getLoanAccount?.user_name || "",
          password: getLoanAccount?.password || "",
          loan_amount: getLoanAccount?.loan_amount || "",
          payment_date:
            moment(getLoanAccount?.payment_date).format("YYYY-MM-DD") || "",
          account_nick_name: getLoanAccount?.account_nick_name || "",
        }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form>
            <h1>Loan Account Password Storage Form</h1>

            {isData ? (
              <>
                {" "}
                <fieldset>
                  <label htmlFor="name">Creditors Name:</label>
                  <Field
                    type="text"
                    id="name"
                    name="creditor_name"
                    placeholder="Enter Name"
                  />

                  <label htmlFor="url">Website/URL</label>
                  <Field
                    type="text"
                    id="url"
                    name="website"
                    placeholder="Enter url/website"
                  />

                  <label htmlFor="username">User Name:</label>
                  <Field
                    type="text"
                    id="username"
                    name="user_name"
                    placeholder="Enter username"
                  />

                  <label htmlFor="password">Password:</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                  />

                  <label htmlFor="loan">Loan:</label>
                  <Field
                    type="text"
                    id="loan"
                    name="loan_amount"
                    placeholder="Enter loan"
                  />

                  <label htmlFor="date">Payment Date:</label>
                  <Field
                    type="date"
                    id="date"
                    name="payment_date"
                    placeholder="Enter payment date"
                  />

                  <label htmlFor="nickname">Account Nick Name:</label>
                  <Field
                    type="text"
                    id="nickname"
                    name="account_nick_name"
                    placeholder="Enter account nickname"
                  />

                  <label htmlFor="password">Password Recovery:</label>
                  <p>
                    We do not recommend storing questions and answers to recover
                    your password. Please reset your password instead for added
                    security.
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

export default LoanAccountForm;
