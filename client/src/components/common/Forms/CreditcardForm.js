import React from 'react';
import styled from 'styled-components';

const Container = styled.form `
 form{
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

    input {
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
      margin: 0;
      margin-top: 10px;
      font-size: 14px;
    }
  }

  .subbutton {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      padding: 19px 39px 18px 39px;
      color: #fff;
      background-color: #00a652;
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      border-radius: 5px;
      width: 50%;
      border: 1px solid #00a652;
      border-width: 1px 1px 3px;
      box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
}
`
const CreditcardForm = () => {

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
            <form action="" method="post">


                <h1>Credit Card Account Password Storage Form</h1>

                <fieldset>
                    <label for="name">Credit Card Name:</label>
                    <input type="text" id="name" name="name" placeholder="Enter Name" required />

                    <label for="url">Website/URL</label>
                    <input type="text" id="url" name="url" placeholder="Enter url/website" required />

                    <label for="username">User Name:</label>
                    <input type="text" id="username" name="username" placeholder="Enter username" required />

                    <label for="password">Password:</label>
                    <input type="password" id="password" name="user_password" placeholder="Enter passowrd" required />

                    <label for="Creditcard">Credit Card:</label>
                    <input type="text" id="creditcard" name="creditcard" placeholder="Enter Creditcard" required onKeyPress={handleKeyPress} />

                    <label for="date">Payment Date:</label>
                    <input type="date" id="date" name="date" placeholder="enter paymentdate" required />

                    <label for="nickname">Account Nick Name:</label>
                    <input type="text" id="nickname" name="nickname" placeholder="Enter account nickname" required />

                    <label for="password">Password Recovery:</label>
                    <p>we do not recommend stroing questions and answer to recoer your password. Please reset your password instead for added security.</p>

                </fieldset>
                <div class="subbutton">
                    <button type="submit">Sign up</button>
                </div>

            </form>
        </Container>
    )
}

export default CreditcardForm
