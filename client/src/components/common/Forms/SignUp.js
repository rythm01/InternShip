import React from 'react';
import styled  from 'styled-components';


const Container = styled.div`
body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
form {
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
            font-weight:600;
            display: block;
            margin-bottom: 8px;
          }
         input
            {
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
                box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
                margin-bottom: 30px;
            }
        }
    }
    .subbutton{
            display:flex;
            justify-content:center;
            align-items:center;        
        button {
            padding: 19px 39px 18px 39px;
            color: #FFF;
            background-color: #00A652;
            font-size: 18px;
            font-style: normal;
            text-align: center;
            border-radius: 5px;
            width: 50%;
            border: 1px solid #00A652;
            border-width: 1px 1px 3px;
            border-radius: 10px;
            box-shadow: 0 -1px 0 rgba(255,255,255,0.1) inset;
            margin-bottom: 10px;
            font-weight:600;
            cursor: pointer;
          }        
    }

`
const SignUp = () => {

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


            <h1>Sign Up</h1>

            <fieldset>
                <label for="name">Full Name</label>
                <input type="text" id="name" name="user_name" placeholder="Enter Name" required />

                <label for="email">Email</label>
                <input type="email" id="email" name="user_email" placeholder="Enter Email" required />

                <label for="phone">Phone number</label>
                <input type="tel" id="phone" name="contact" placeholder="Enter Phone number" onKeyPress={handleKeyPress} required />

                <label for="password">Password</label>
                <input type="password" id="password" name="user_password" placeholder="Enter PAssword" required />

                <label for="region">Supported Region</label>
                <input type="text" id="region" name="region" placeholder="Enter supported region" required />

                <label for="monthlynum">Estimated Monthly Number</label>
                <input type="tel" id="monthlynum" name="monthlynum" placeholder="Enter estimate monthly number" onKeyPress={handleKeyPress} required />

            </fieldset>
            <div class="subbutton">
                <button type="submit" >Sign up</button>
            </div>

        </form>
        </Container>
    )
}

export default SignUp
