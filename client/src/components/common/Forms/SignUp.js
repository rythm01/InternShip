import React from 'react';

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
                <button type="submit">Sign up</button>
            </div>

        </form>
    )
}

export default SignUp