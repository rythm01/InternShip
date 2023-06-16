import React from 'react';
import styled from 'styled-components'


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
  }
  
  h1 {
    margin: 0 0 30px 0;
    text-align: center;
  }
  
  input[type="text"],
  input[type="password"],
  input[type="date"],
  input[type="datetime"],
  input[type="email"],
  input[type="number"],
  input[type="search"],
  input[type="tel"],
  input[type="time"],
  input[type="url"],
  textarea,
  select {
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
  
  input[type="radio"],
  input[type="checkbox"] {
    margin: 0 4px 8px 0;
  }
  
  /* select {
    padding: 6px;
    height: 32px;
    border-radius: 2px;
  } */
  
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
  
  fieldset {
    margin-bottom: 30px;
    border: none;
  }
  
  legend {
    font-size: 1.4em;
    margin-bottom: 10px;
  }
  
  label {
    font-weight:600;
    display: block;
    margin-bottom: 8px;
  }
  
  label.light {
    font-weight: 300;
    display: inline;
  }
  
  .subbutton{
    display:flex;
    justify-content:center;
    align-items:center;
  }

  .ing{
    /* width: 30%!important; */
    height: 55px;
  }
  
  .ingamount{
    width: 20%!important;
  }


  @media screen and (min-width: 480px) {
  
    form {
      max-width: 480px;
    }
  
  }
`

export default function Recipe(){
    return (
        <Container>
        <form action="" method="post">

            <h1>Recipe</h1>

            <fieldset>
                <label for="name">Recipe Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter Recipe Name" required />

                <div class="ingredient">
                    <div>
                        <label for="url">Ingredient 1</label>
                        <input type="text" id="ingredient1" name="ingredient1" placeholder="Enter Ingredient 1" />
                    </div>
                    <label for="url">Amount</label>
                    <div class="flex">
                        <input type="text" id="amount1" name="amount1" class="ingamount" placeholder="" />
                        <select id="job" name="select1" class="form-select ing">

                            <option value="tea spoon">tea spoon</option>
                            <option value="table spoon">table spoon</option>
                            <option value="ounce">ounce</option>
                            <option value="cup">cup</option>
                            <option value="liter">liter</option>
                            <option value="pound(s)">pound(s)</option>

                        </select>
                    </div>
                </div>

                <div class="ingredient">
                    <div>
                        <label for="url">Ingredient 2</label>
                        <input type="text" id="ingredient2" name="ingredient2" placeholder="Enter Ingredient 2" />
                    </div>
                    <label for="url">Amount</label>
                    <div class="flex">
                        <input type="text" id="amount2" name="amount2" class="ingamount" placeholder="" />
                        <select id="job" name="select2" class="form-select ing">

                            <option value="tea spoon">tea spoon</option>
                            <option value="table spoon">table spoon</option>
                            <option value="ounce">ounce</option>
                            <option value="cup">cup</option>
                            <option value="liter">liter</option>
                            <option value="pound(s)">pound(s)</option>

                        </select>
                    </div>
                </div>

                <div class="ingredient">
                    <div>
                        <label for="url">Ingredient 3</label>
                        <input type="text" id="ingredient3" name="ingredient3" placeholder="Enter Ingredient 3" />
                    </div>
                    <label for="url">Amount</label>
                    <div class="flex">
                        <input type="text" id="amount3" name="amount3" class="ingamount" placeholder="" />
                        <select id="job" name="select3" class="form-select ing">

                            <option value="tea spoon">tea spoon</option>
                            <option value="table spoon">table spoon</option>
                            <option value="ounce">ounce</option>
                            <option value="cup">cup</option>
                            <option value="liter">liter</option>
                            <option value="pound(s)">pound(s)</option>

                        </select>
                    </div>
                </div>

                <div class="ingredient">
                    <div>
                        <label for="url">Ingredient 4</label>
                        <input type="text" id="ingredient4" name="ingredient4" placeholder="Enter Ingredient 4" />
                    </div>
                    <label for="url">Amount</label>
                    <div class="flex">
                        <input type="text" id="amount4" name="amount4" class="ingamount" placeholder="" />
                        <select id="job" name="select4" class="form-select ing">

                            <option value="tea spoon">tea spoon</option>
                            <option value="table spoon">table spoon</option>
                            <option value="ounce">ounce</option>
                            <option value="cup">cup</option>
                            <option value="liter">liter</option>
                            <option value="pound(s)">pound(s)</option>

                        </select>
                    </div>
                </div>

                <div class="ingredient">
                    <div>
                        <label for="url">Ingredient 5</label>
                        <input type="text" id="ingredient5" name="ingredient5" placeholder="Enter Ingredient 5" />
                    </div>
                    <label for="url">Amount</label>
                    <div class="flex">
                        <input type="text" id="amount5" name="amount5" class="ingamount" placeholder="" />
                        <select id="job" name="select5" class="form-select ing">

                            <option value="tea spoon">tea spoon</option>
                            <option value="table spoon">table spoon</option>
                            <option value="ounce">ounce</option>
                            <option value="cup">cup</option>
                            <option value="liter">liter</option>
                            <option value="pound(s)">pound(s)</option>

                        </select>
                    </div>
                </div>

                <div class="ingredient">
                    <div>
                        <label for="url">Ingredient 6</label>
                        <input type="text" id="ingredient6" name="ingredient6" placeholder="Enter Ingredient 6" />
                    </div>
                    <label for="url">Amount</label>
                    <div class="flex">
                        <input type="text" id="amount6" name="amount6" class="ingamount" placeholder="" />
                        <select id="job" name="select6" class="form-select ing">

                            <option value="tea spoon">tea spoon</option>
                            <option value="table spoon">table spoon</option>
                            <option value="ounce">ounce</option>
                            <option value="cup">cup</option>
                            <option value="liter">liter</option>
                            <option value="pound(s)">pound(s)</option>

                        </select>
                    </div>
                </div>

                <div class="ingredient">
                    <div>
                        <label for="url">Ingredient 7</label>
                        <input type="text" id="ingredient7" name="ingredient7" placeholder="Enter Ingredient 7" />
                    </div>
                    <label for="url">Amount</label>
                    <div class="flex">
                        <input type="text" id="amount7" name="amount7" class="ingamount" placeholder="" />
                        <select id="job" name="select7" class="form-select ing">

                            <option value="tea spoon">tea spoon</option>
                            <option value="table spoon">table spoon</option>
                            <option value="ounce">ounce</option>
                            <option value="cup">cup</option>
                            <option value="liter">liter</option>
                            <option value="pound(s)">pound(s)</option>

                        </select>
                    </div>
                </div>

                <label for="">Cooking Direction:</label>
                <textarea name="cd" id="" cols="30" rows="5"></textarea>

            </fieldset>
            <div class="subbutton">
                <button type="submit">Submit</button>
            </div>

        </form>
        </Container>
    )
}