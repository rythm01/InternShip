import React from 'react';

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
    )
}

export default CreditcardForm
