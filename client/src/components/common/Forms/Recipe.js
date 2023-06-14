import React from 'react';

const Recipe = () => {
    return (
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
    )
}

export default Recipe