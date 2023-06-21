import React, { useRef } from 'react';
import styled from "styled-components";
import Select from "react-select";
import { components } from "react-select";
import { Formik, Form, Field } from "formik";
import { AuthContext } from "../../../context/AuthContext";
// import postRecipeForm from "../../../networks/passwordTypeForms";

export default function Recipe() {
  // const [selectedOption, setSelectedOption] = useState(null);
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  const PasswordSelectNames = [
    { id: 1, name: "tea spoon" },
    { id: 2, name: "table spoon" },
    { id: 3, name: "ounce" },
    { id: 4, name: "cup" },
    { id: 5, name: "liter" },
    { id: 6, name: "pound(s)" },
  ];


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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderRadius: "10px",
      cursor: "pointer",
      margin: "0px 20px 30px 0px",
      width: "100%",
      border: "1px solid",
      // borderColor: "rgba(0, 0, 0, 0.5)",
      border: "1px solid rgba(41, 45, 50, 0.2)",

      height: "50px",
      lineHeight: "26px",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: "rgba(0, 0, 0, 0.5)",
      },
      "@media (max-width: 600px)": {
        fontSize: "12px",
      },
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      textAlign: "center",
      color: "rgba(0, 0, 0, 0.5)",
      "&:hover": {
        backgroundColor: "#00A652",
      },
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      // fontFamily: "TT Commons",
      fontFamily: "'Poppins', sans-serif",
      // fontSize: "25px",
      fontSize: "16px",
      fontWeight: "550",
      color: "#000000",
      textAlign: "center",
    }),
  };

  const Option = (props) => (
    <div>
      <components.Option {...props}>{props.data.name}</components.Option>
    </div>
  );
  const formRef = useRef(null);
  const { t } = useContext(AuthContext);

  const handleFormSubmit = (values, { setSubmitting }) => {
    // event.preventDefault(); // Prevent the default form submission behavior
    // const formData = new FormData(formRef.current);
    // console.log('Form submitted...!', formData);
    // //first display all form data & then
    // formRef.current.reset(); // Clear all Field fields

    // postRecipeForm(t, values);
    setSubmitting(false);

  };

  // const handleOptionSelect = (option) => {
  //     setSelectedOption(option);
  //     // navigate(`/password-type-form?form=${option.id}`);
  //     setDropdownOpen(false);
  //   };

  return (
    <Container>
      <Formik
        initialValues={{
          name: "",
          ingredient1: "",
          amount1: "",
          ingredient2: "",
          amount2: "",
          ingredient3: "",
          amount3: "",
          ingredient4: "",
          amount4: "",
          ingredient5: "",
          amount5: "",
          ingredient6: "",
          amount6: "",
          ingredient7: "",
          amount7: "",
          cd: "",
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
            <h1>Recipe</h1>

            <fieldset>
              <label for="name">Recipe Name:</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter Recipe Name"
                
              />

              <div class="ingredient">
                <div>
                  <label for="url">Ingredient 1</label>
                  <Field
                    type="text"
                    id="ingredient1"
                    name="ingredient1"
                    placeholder="Enter Ingredient 1"
                  />
                </div>
                <label for="url">Amount</label>
                <div class="flex">
                  <Field
                    type="text"
                    id="amount1"
                    name="amount1"
                    class="ingamount"
                    placeholder=""
                  />
                  <Select
                    styles={customStyles}
                    placeholder="Select type"
                    options={PasswordSelectNames}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                  />
                </div>
              </div>

              <div class="ingredient">
                <div>
                  <label for="url">Ingredient 2</label>
                  <Field
                    type="text"
                    id="ingredient2"
                    name="ingredient2"
                    placeholder="Enter Ingredient 2"
                  />
                </div>
                <label for="url">Amount</label>
                <div class="flex">
                  <Field
                    type="text"
                    id="amount2"
                    name="amount2"
                    class="ingamount"
                    placeholder=""
                  />
                  <Select
                    styles={customStyles}
                    placeholder="Select type"
                    options={PasswordSelectNames}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                  />
                </div>
              </div>

              <div class="ingredient">
                <div>
                  <label for="url">Ingredient 3</label>
                  <Field
                    type="text"
                    id="ingredient3"
                    name="ingredient3"
                    placeholder="Enter Ingredient 3"
                  />
                </div>
                <label for="url">Amount</label>
                <div class="flex">
                  <Field
                    type="text"
                    id="amount3"
                    name="amount3"
                    class="ingamount"
                    placeholder=""
                  />
                  <Select
                    styles={customStyles}
                    placeholder="Select type"
                    options={PasswordSelectNames}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                  />
                </div>
              </div>

              <div class="ingredient">
                <div>
                  <label for="url">Ingredient 4</label>
                  <Field
                    type="text"
                    id="ingredient4"
                    name="ingredient4"
                    placeholder="Enter Ingredient 4"
                  />
                </div>
                <label for="url">Amount</label>
                <div class="flex">
                  <Field
                    type="text"
                    id="amount4"
                    name="amount4"
                    class="ingamount"
                    placeholder=""
                  />
                  <Select
                    styles={customStyles}
                    placeholder="Select type"
                    options={PasswordSelectNames}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                  />
                </div>
              </div>

              <div class="ingredient">
                <div>
                  <label for="url">Ingredient 5</label>
                  <Field
                    type="text"
                    id="ingredient5"
                    name="ingredient5"
                    placeholder="Enter Ingredient 5"
                  />
                </div>
                <label for="url">Amount</label>
                <div class="flex">
                  <Field
                    type="text"
                    id="amount5"
                    name="amount5"
                    class="ingamount"
                    placeholder=""
                  />
                  <Select
                    styles={customStyles}
                    placeholder="Select type"
                    options={PasswordSelectNames}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                  />
                </div>
              </div>

              <div class="ingredient">
                <div>
                  <label for="url">Ingredient 6</label>
                  <Field
                    type="text"
                    id="ingredient6"
                    name="ingredient6"
                    placeholder="Enter Ingredient 6"
                  />
                </div>
                <label for="url">Amount</label>
                <div class="flex">
                  <Field
                    type="text"
                    id="amount6"
                    name="amount6"
                    class="ingamount"
                    placeholder=""
                  />
                  <Select
                    styles={customStyles}
                    placeholder="Select type"
                    options={PasswordSelectNames}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                  />
                </div>
              </div>

              <div class="ingredient">
                <div>
                  <label for="url">Ingredient 7</label>
                  <Field
                    type="text"
                    id="ingredient7"
                    name="ingredient7"
                    placeholder="Enter Ingredient 7"
                  />
                </div>
                <label for="url">Amount</label>
                <div class="flex">
                  <Field
                    type="text"
                    id="amount7"
                    name="amount7"
                    class="ingamount"
                    placeholder=""
                  />
                  <Select
                    styles={customStyles}
                    placeholder="Select type"
                    options={PasswordSelectNames}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                  />
                </div>
              </div>

              <label htmlFor="cd">Cooking Direction:</label>
              <Field as="textarea" id="cd" name="cd" cols="30" rows="5"></Field>
            </fieldset>
            <div class="subbutton">
              <span onClick={handleSubmit}>Submit</span>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
}