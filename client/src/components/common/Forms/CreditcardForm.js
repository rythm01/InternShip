import React, { useRef } from 'react';
import { Formik, Form, Field } from "formik";
import { AuthContext } from "../../../context/AuthContext";
// import postCreditCardForm from "../../../networks/passwordTypeForms";
import styled from 'styled-components';

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

    Field[type="text"],
    Field[type="password"],
    Field[type="tel"],
    Field[type="date"] {
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
const CreditcardForm = () => {
  const formRef = useRef(null);
  const { t } = useContext(AuthContext);


  const handleSubmit  = (values, { setSubmitting }) => {
    // event.preventDefault(); // Prevent the default form submission behavior

    // const formData = new FormData(formRef.current);
    // console.log('Form submitted...!', formData);
    // //first display all form data & then
    // formRef.current.reset(); // Clear all Field fields
    
    // postCreditCardForm(t, values);
    setSubmitting(false);
  };

  const handleKeyPress = (event) => {
    console.log("Handle KEy Press..")
    const keyCode = event.which || event.keyCode;
    const keyValue = String.fromCharCode(keyCode);

    // Allow only numbers (0-9)
    if (!/^[0-9]+$/.test(keyValue)) {

      event.preventDefault();
    }
  };
  return (
    <Container>
      <Formik
        initialValues={{
          credit_card_name: "",
          webiste: "",
          user_name: "",
          password: "",
          credit_card: "",
          payment_date: "",
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
            <h1>Credit Card Account Password Storage Form</h1>

            <fieldset>
              <label for="name">Credit Card Name:</label>
              <Field type="text" id="name" name="credit_card_name" placeholder="Enter Name"  />

              <label for="url">Website/URL</label>
              <Field type="text" id="url" name="webiste" placeholder="Enter url/website"  />

              <label for="username">User Name:</label>
              <Field type="text" id="username" name="user_name" placeholder="Enter username"  />

              <label for="password">Password:</label>
              <Field type="password" id="password" name="user_password" placeholder="Enter passowrd"  />

              <label for="Creditcard">Credit Card:</label>
              <Field type="text" id="creditcard" name="credit_card" placeholder="Enter Creditcard"  onKeyPress={handleKeyPress} />

              <label for="date">Payment Date:</label>
              <Field type="date" id="date" name="payment_date" placeholder="enter paymentdate"  />

              <label for="nickname">Account Nick Name:</label>
              <Field type="text" id="nickname" name="account_nick_name" placeholder="Enter account nickname"  />

              <label for="password">Password Recovery:</label>
              <p>we do not recommend stroing questions and answer to recoer your password. Please reset your password instead for added security.</p>

            </fieldset>
            <div class="subbutton">
              <span onClick={handleSubmit}>Submit</span>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default CreditcardForm
