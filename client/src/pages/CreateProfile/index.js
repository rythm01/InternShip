import React, { useContext, useEffect, useMemo } from "react";
import { useState } from "react";
import {
  Back,
  Button,
  ButtonBar,
  CheckBox,
  Container,
  InputGroup,
  Label,
  Page,
  ProfileImage,
  Row,
  Title,
} from "../../components/common";
import Select from "react-select";
import { components } from "react-select";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Profile } from "../../components/Home";
import { AuthContext } from "../../context/AuthContext";

import countries from "../../countires";
import { createProfile, getProfile } from "../../networks/profile";
import toast, { Toaster } from 'react-hot-toast';
import { logout } from "../../store/slice/mainSlice";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <CheckBox
          text={props.label}
          onChange={() => null}
          checked={props.isSelected}
        />
      </components.Option>
    </div>
  );
};

export default function CreateProfile() {
  const navigate = useNavigate();
  const [userID, setuserID] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false);
  // const [category, setCategory] = useState("")
  // const [categoryoptions, setcategoryoptions] = useState([])
  const [verificationPeriod, setVerificationPeriod] = useState("");
  const [upcomingdata, setupcomingdata] = useState([]);
  const [country, setCountry] = useState("");

  const verificationperiodoptions = [
    { value: 7, label: "One Week", color: "#00B8D9", isFixed: true },
    { value: 14, label: "Two Week", color: "#0052CC", isFixed: true },
    { value: 28, label: "One Month", color: "#5243AA", isFixed: true },
  ];

  const { profile, setProfile, authData, t } = useContext(AuthContext)

  useEffect(() => {
    if (authData) {
      setEmail(authData.email)
      setuserID(authData.id)
    }
  }, [authData]);



  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderRadius: "10px",
      borderColor: "#292D3233",
      height: "80px",
      padding: "0px 6px",
      fontfamily: "TT Commons",
      fontSize: "16px",
      lineHeight: "26px",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: "#00A652",
      },
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
      "&:hover": {
        backgroundColor: "#00A652",
      },
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      fontFamily: "TT Commons",
      fontSize: "18px",
    }),
  };


  const handleImage = (e) => {
    const file = e.target.files[0];
    // console.log('file...', file)
    if (file.type.split("/")[0] !== "image")
      return toast.error("This file type is not supported");
    setImagePreview(URL.createObjectURL(file));
    setImageFile(file);
    //uploadImage(file);
  };



  const countriesOptions = useMemo(() => {
    return countries.map((country) => ({
      value: country?.name,
      label: country?.name,
    }));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const onSubmit = async (e) => {
    e.preventDefault();


    if (!firstName) return toast.error("Please enter your first name")
    if (!lastName) return toast.error("Please enter your last name")
    if (!country) return toast.error("Please select your country")
    if (!verificationPeriod) return toast.error("Please select verification period")
    if (!imageFile) return toast.error("Please select your profile image")
    setLoading(true);



    const data = new FormData();
    data.append("file", imageFile);
    data.append("fname", firstName);
    data.append("lname", lastName);
    data.append("email", email);
    data.append("location", country);
    data.append("verificationPeriod", verificationPeriod.value);
    data.append("userID", userID);

    const res = await createProfile(t, data);
    if (!res.data.success) {
      setLoading(false);
      return toast.error(res.data.message)
    }


    const response = await getProfile(t)
    if (!response.data.success) {
      setLoading(false);
      return toast.error(response.data.message)
    }

    if (response.data.data) {
      localStorage.setItem('profile', JSON.stringify(response.data.data))
      setLoading(false);
      setProfile(response.data.data)
      navigate("/home");
      return
    }
  };
  if (!countriesOptions) {
    return <LoadingSpinner />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Toaster />
      <Page>
        <Container
          width="727px"
          margin="100px"
          padding="70px"
          borderRadius="20px"
        >
          <Back onClick={handleLogout} />
          <Title>Create Profile</Title>

          <form onSubmit={onSubmit}>
            <ProfileImage
              imagePreview={imagePreview ? imagePreview : imageFile}
              handleImage={handleImage}
            />
            <InputGroup
              label="First Name"
              placeholder="Enter your first name"
              value={profile?.name}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputGroup
              label="Last Name"
              placeholder="Enter your last name"
              value={profile?.name}
              onChange={(e) => setLastName(e.target.value)}
            />
            <InputGroup
              disabled={true}
              label="Email"
              placeholder="Enter your email"
              value={email}
            />
            {countriesOptions && (
              <>
                <Row justifyContent="space-between">
                  <Label>Location</Label>
                </Row>
                <Select
                  height="50px"
                  menuPosition="left"
                  placeholder="Select the location"
                  value={countriesOptions.find(
                    (el) => el.value === country
                  )}
                  styles={customStyles}
                  onChange={(e) => {
                    setCountry(e.value);
                  }}
                  options={countriesOptions}
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{ Option }}
                />
              </>
            )}

            <div
              style={{
                display: "block",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Row justifyContent="space-between">
                <Label>Verification Period</Label>
              </Row>
              <Select
                height="50px"
                placeholder="Select the verification period"
                value={verificationPeriod}
                styles={customStyles}
                onChange={(e) => {
                  setVerificationPeriod(e);
                }}
                options={verificationperiodoptions}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option,
                }}
              />
            </div>
            <ButtonBar>
              <Button color="#00A652" type="submit">
                Save
              </Button>
            </ButtonBar>

          </form>
        </Container>
      </Page>
    </>
  );
}
