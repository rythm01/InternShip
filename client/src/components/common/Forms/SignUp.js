import React, { useRef,useContext } from 'react';
import { Formik, Form, Field } from "formik";
import { AuthContext } from "../../../context/AuthContext";
// import postSignUpForm from "../../../networks/passwordTypeForms";
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
const SignUp = () => {
  const formRef = useRef(null);
  const { t } = useContext(AuthContext);


  const handleSubmit = (values, { setSubmitting }) => {
    // event.preventDefault(); // Prevent the default form submission behavior
    // const formData = new FormData(formRef.current);
    // console.log('Form submitted...!', formData);
    // //first display all form data & then
    // formRef.current.reset(); // Clear all Field fields

    // postSignUpForm(t, values);
    setSubmitting(false);
    console.log(values);

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
          user_name: "",
          user_email: "",
          contact: "",
          password: "",
          region: "",
          monthlynum: "",
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
            <h1>Sign Up</h1>

            <fieldset>
              <label for="name">Full Name</label>
              <Field type="text" name="user_name" placeholder="Enter Name"/>

              <label for="email">Email</label>
              <Field type="email" name="user_email" placeholder="Enter Email"  />

              <label for="phone">Phone number</label>
              <Field type="tel" name="contact" placeholder="Enter Phone number" onKeyPress={handleKeyPress}  />

              <label for="password">Password</label>
              <Field type="password" name="password" placeholder="Enter PAssword"  />

              <label for="region">Supported Region</label>
              <Field type="text" name="region" placeholder="Enter supported region"  />

              <label for="monthlynum">Estimated Monthly Number</label>
              <Field type="tel" name="monthlynum" placeholder="Enter estimate monthly number" onKeyPress={handleKeyPress}  />

            </fieldset>
            <div class="subbutton">
              <span onClick={handleSubmit}>Sign up</span>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default SignUp
