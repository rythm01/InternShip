import React, { useRef, useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";
import { components } from "react-select";
import { Formik, Form, Field } from "formik";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getRecipeFormDetails,
  postRecipeForm,
  updateRecipeForm,
} from "../../../networks/passwordTypeForms";
// import postRecipeForm from "../../../networks/passwordTypeForms";

export default function Recipe({ id, isEdit }) {
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
    max-width: 640px;
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
      input[type="textarea"],
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
  const [ingredient, setIngredient] = useState("Select Type");
  const { t } = useContext(AuthContext);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const navigate = useNavigate();
  const [getMerchantAccount, setMerchantAccount] = useState();
  const [isData, setIsData] = useState(true);

  useEffect(() => {
    if (id && isEdit) {
      getRecipeFormDetails(t, id)
        .then((res) => {
          setMerchantAccount(res?.data?.data);
          setIsData(true);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  useEffect(() => {
    if (id && isEdit && !getMerchantAccount) {
      setIsData(false);
    }
  }, [getMerchantAccount]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsProfileEdit(!isProfileEdit);
    if (!isProfileEdit) return null;
    try {
      if (id && isEdit) {
        await updateRecipeForm(t, id, values);
      } else {
        await postRecipeForm(t, values);
      }
      navigate("/home/passwords/recipes");
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Formik
        initialValues={{
          recipe_name: getMerchantAccount?.recipe_name || "",
          ingredient_one: getMerchantAccount?.ingredient1 || "",
          ingredient_one_amount:
            getMerchantAccount?.ingredient_one_amount || "",
          ingredient_one_amount_type:
            getMerchantAccount?.ingredient_one_amount_type || "",
          ingredient_two: getMerchantAccount?.ingredient_two || "",
          ingredient_two_amount:
            getMerchantAccount?.ingredient_two_amount || "",
          ingredient_two_amount_type:
            getMerchantAccount?.ingredient_two_amount_type || "",
          ingredient_three: getMerchantAccount?.ingredient_three || "",
          ingredient_three_amount:
            getMerchantAccount?.ingredient_three_amount || "",
          ingredient_three_amount_type:
            getMerchantAccount?.ingredient_three_amount_type || "",
          ingredient_four: getMerchantAccount?.ingredient_four || "",
          ingredient_four_amount:
            getMerchantAccount?.ingredient_four_amount || "",
          ingredient_four_amount_type:
            getMerchantAccount?.ingredient_four_amount_type || "",
          ingredient_five: getMerchantAccount?.ingredient_five || "",
          ingredient_five_amount:
            getMerchantAccount?.ingredient_five_amount || "",
          ingredient_five_amount_type:
            getMerchantAccount?.ingredient_five_amount_type || "",
          ingredient_six: getMerchantAccount?.ingredient_six || "",
          ingredient_six_amount:
            getMerchantAccount?.ingredient_six_amount || "",
          ingredient_six_amount_type:
            getMerchantAccount?.ingredient_six_amount_type || "",
          ingredient_seven: getMerchantAccount?.ingredient_seven || "",
          ingredient_seven_amount:
            getMerchantAccount?.ingredient_seven_amount || "",
          ingredient_seven_amount_type:
            getMerchantAccount?.ingredient_seven_amount_type || "",
          cooking_description: getMerchantAccount?.cooking_description || "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Form>
            <h1>Recipe</h1>

            <fieldset>
              <label htmlFor="name">Recipe Name:</label>
              <Field
                type="text"
                name="recipe_name"
                disabled={!isProfileEdit}
                placeholder="Enter Recipe Name"
              />

              <div class="ingredient">
                <div>
                  <label htmlFor="ingredient1">Ingredient 1</label>
                  <Field
                    type="text"
                    id="ingredient1"
                    disabled={!isProfileEdit}
                    name="ingredient1"
                    placeholder="Enter Ingredient 1"
                  />
                </div>
                <label htmlFor="ingredient_one_amount">Amount</label>
                <div class="flex">
                  <Field
                    type="text"
                    id="ingredient_one_amount"
                    disabled={!isProfileEdit}
                    name="ingredient_one_amount"
                    class="ingamount"
                    placeholder=""
                  />
                  <Select
                    styles={customStyles}
                    placeholder={
                      values.ingredient_one_amount_type
                        ? values.ingredient_one_amount_type
                        : "Select-Type"
                    }
                    options={PasswordSelectNames}
                    closeMenuOnSelect={false}
                    value={values.ingredient_one_amount_type}
                    onChange={(selectedOption) => {
                      const selectedValue = selectedOption
                        ? selectedOption.name
                        : "";
                      setFieldValue(
                        "ingredient_one_amount_type",
                        selectedValue
                      );
                    }}
                    name="ingredient_one_amount_type"
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                  />
                </div>
              </div>

              <div class="ingredient">
                <div>
                  <label htmlFor="ingredient_two">Ingredient 2</label>
                  <Field
                    type="text"
                    id="ingredient_two"
                    disabled={!isProfileEdit}
                    name="ingredient_two"
                    placeholder="Enter Ingredient 2"
                  />
                </div>
                <label htmlFor="ingredient_two_amount">Amount</label>
                <div class="flex">
                  <Field
                    type="text"
                    id="ingredient_two_amount"
                    disabled={!isProfileEdit}
                    name="ingredient_two_amount"
                    class="ingamount"
                    placeholder=""
                  />
                  <Select
                    styles={customStyles}
                    placeholder={
                      values.ingredient_two_amount_type
                        ? values.ingredient_two_amount_type
                        : "Select-Type"
                    }
                    options={PasswordSelectNames}
                    closeMenuOnSelect={false}
                    value={values.ingredient_two_amount_type}
                    onChange={(selectedOption) => {
                      const selectedValue = selectedOption
                        ? selectedOption.name
                        : "";
                      setFieldValue(
                        "ingredient_two_amount_type",
                        selectedValue
                      );
                    }}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                  />
                </div>
              </div>

              <div class="ingredient">
                <div>
                  <label htmlFor="url">Ingredient 3</label>
                  <Field
                    type="text"
                    id="ingredient_three"
                    disabled={!isProfileEdit}
                    name="ingredient_three"
                    placeholder="Enter Ingredient 3"
                  />
                </div>
                <label htmlFor="ingredient_three_amount">Amount</label>
                <div class="flex">
                  <Field
                    type="text"
                    id="ingredient_three_amount"
                    disabled={!isProfileEdit}
                    name="ingredient_three_amount"
                    class="ingamount"
                    placeholder=""
                  />
                  <Select
                    styles={customStyles}
                    placeholder={
                      values.ingredient_three_amount_type
                        ? values.ingredient_three_amount_type
                        : "Select-Type"
                    }
                    options={PasswordSelectNames}
                    closeMenuOnSelect={false}
                    value={values.ingredient_three_amount_type}
                    onChange={(selectedOption) => {
                      const selectedValue = selectedOption
                        ? selectedOption.name
                        : "";
                      setFieldValue(
                        "ingredient_three_amount_type",
                        selectedValue
                      );
                    }}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                  />
                </div>
              </div>

              <div class="ingredient">
                <div>
                  <label htmlFor="ingredient_four">Ingredient 4</label>
                  <Field
                    type="text"
                    id="ingredient_four"
                    disabled={!isProfileEdit}
                    name="ingredient_four"
                    placeholder="Enter Ingredient 4"
                    cursor="disabled"
                  />
                </div>
                <label htmlFor="ingredient_four_amount">Amount</label>
                <div class="flex">
                  <Field
                    type="text"
                    id="ingredient_four_amount"
                    disabled={!isProfileEdit}
                    name="ingredient_four_amount"
                    class="ingamount"
                    placeholder=""
                  />
                  <Select
                    styles={customStyles}
                    placeholder={
                      values.ingredient_four_amount_type
                        ? values.ingredient_four_amount_type
                        : "Select-Type"
                    }
                    options={PasswordSelectNames}
                    closeMenuOnSelect={false}
                    value={values.ingredient_four_amount_type}
                    onChange={(selectedOption) => {
                      const selectedValue = selectedOption
                        ? selectedOption.name
                        : "";
                      setFieldValue(
                        "ingredient_four_amount_type",
                        selectedValue
                      );
                    }}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                  />
                </div>
              </div>

              <div class="ingredient">
                <div>
                  <label htmlFor="ingredient_five">Ingredient 5</label>
                  <Field
                    type="text"
                    id="ingredient_five"
                    disabled={!isProfileEdit}
                    name="ingredient_five"
                    placeholder="Enter Ingredient 5"
                  />
                </div>
                <label htmlFor="ingredient_five_amount">Amount</label>
                <div class="flex">
                  <Field
                    type="text"
                    id="ingredient_five_amount"
                    disabled={!isProfileEdit}
                    name="ingredient_five_amount"
                    class="ingamount"
                    placeholder=""
                  />
                  <Select
                    styles={customStyles}
                    placeholder={
                      values.ingredient_five_amount_type
                        ? values.ingredient_five_amount_type
                        : "Select-Type"
                    }
                    options={PasswordSelectNames}
                    closeMenuOnSelect={false}
                    value={values.ingredient_five_amount_type}
                    onChange={(selectedOption) => {
                      const selectedValue = selectedOption
                        ? selectedOption.name
                        : "";
                      setFieldValue(
                        "ingredient_five_amount_type",
                        selectedValue
                      );
                    }}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                  />
                </div>
              </div>

              <div class="ingredient">
                <div>
                  <label htmlFor="ingredient_six">Ingredient 6</label>
                  <Field
                    type="text"
                    id="ingredient_six"
                    disabled={!isProfileEdit}
                    name="ingredient_six"
                    placeholder="Enter Ingredient 6"
                  />
                </div>
                <label htmlFor="ingredient_six_amount">Amount</label>
                <div class="flex">
                  <Field
                    type="text"
                    id="ingredient_six_amount"
                    disabled={!isProfileEdit}
                    name="ingredient_six_amount"
                    class="ingamount"
                    placeholder=""
                  />
                  <Select
                    styles={customStyles}
                    placeholder={
                      values.ingredient_six_amount_type
                        ? values.ingredient_six_amount_type
                        : "Select-Type"
                    }
                    options={PasswordSelectNames}
                    closeMenuOnSelect={false}
                    value={values.ingredient_six_amount_type}
                    onChange={(selectedOption) => {
                      const selectedValue = selectedOption
                        ? selectedOption.name
                        : "";
                      setFieldValue(
                        "ingredient_six_amount_type",
                        selectedValue
                      );
                    }}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                  />
                </div>
              </div>

              <div class="ingredient">
                <div>
                  <label htmlFor="ingredient_seven">Ingredient 7</label>
                  <Field
                    type="text"
                    id="ingredient_seven"
                    disabled={!isProfileEdit}
                    name="ingredient_seven"
                    placeholder="Enter Ingredient 7"
                  />
                </div>
                <label htmlFor="ingredient_seven_amount">Amount</label>
                <div class="flex">
                  <Field
                    type="text"
                    id="ingredient_seven_amount"
                    disabled={!isProfileEdit}
                    name="ingredient_seven_amount"
                    class="ingamount"
                    placeholder=""
                  />
                  <Select
                    styles={customStyles}
                    placeholder={
                      values.ingredient_seven_amount_type
                        ? values.ingredient_seven_amount_type
                        : "Select-Type"
                    }
                    options={PasswordSelectNames}
                    closeMenuOnSelect={false}
                    value={values.ingredient_seven_amount_type}
                    onChange={(selectedOption) => {
                      const selectedValue = selectedOption
                        ? selectedOption.name
                        : "";
                      setFieldValue(
                        "ingredient_seven_amount_type",
                        selectedValue
                      );
                    }}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                  />
                </div>
              </div>

              <label htmlFor="cooking_description">Cooking Direction:</label>
              <Field
                as="textarea"
                id="cooking_description"
                disabled={!isProfileEdit}
                name="cooking_description"
                cols="70"
                rows="5"
              ></Field>
            </fieldset>
            <div class="subbutton">
              <span onClick={handleSubmit}>
                {isEdit ? (isProfileEdit ? "Update" : "Edit") : "Submit"}
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
