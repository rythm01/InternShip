import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { components } from "react-select";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import {
  Button,
  ButtonBar,
  Container,
  IconButton,
  InputGroup,
  LogoContainer,
  Paragraph,
  Title,
  Label,
  CheckBox,
  Image,
} from "../../components/common";
import OptionMenuSettings from "../../components/common/OptionMenuSettings";
import people from "../../assets/images/people.png";
import SignOut from "../../assets/images/SignOut.png";
import Group86 from "../../assets/images/Group 86.png";
import NotePencil from "../../assets/images/NotePencil.png";
import { Profile } from "../../components/Home";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import styled from "styled-components";
import useWindowSize from "../../utils/hook/useWindowSize";
import { Box } from "@mui/material";
import { Modal, Stack } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import countries from "../../countires";
import { getProfile, updateProfile } from "../../networks/profile";
import { Toaster, toast } from "react-hot-toast";


const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  ${(props) => props.link && "cursor:pointer;"}
`;

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

export default function EditProfile() {
  const { profile, setProfile, t } = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userID, setuserID] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [fullName, setFullName] = useState(profile?.firstName + " " + profile?.lastName);
  const [userName, setUserName] = useState(profile?.userAuth.name);
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  // const [category, setCategory] = useState("")
  const [phoneNumber, setphoneNumber] = useState("");
  // const [categoryoptions, setcategoryoptions] = useState([])
  const [verificationPeriod, setVerificationPeriod] = useState(profile?.verficationPeriod);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [upcomingdata, setupcomingdata] = useState([]);
  const [country, setCountry] = useState(profile?.location);
  const profilePicRef = useRef(null);
  const verificationperiodoptions = [
    { value: 7, label: "One Week", color: "#00B8D9", isFixed: true },
    { value: 14, label: "Two Week", color: "#0052CC", isFixed: true },
    { value: 28, label: "One Month", color: "#5243AA", isFixed: true },
  ];



  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderRadius: "10px",
      borderColor: "#292D3233",
      height: "50px",
      padding: "0px 6px",
      fontfamily: "TT Commons",
      fontSize: "16px",
      lineHeight: "26px",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: "#00A652",
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

  const countriesOptions = useMemo(() => {
    return countries.map((country) => ({
      value: country.name,
      label: country.name,
    }));
  }, []);


  const handleImage = (e) => {
    const file = e.target.files[0];
    // console.log('file...', file)
    if (file.type.split("/")[0] !== "image")
      return toast("This file type is not supported");

    //set profile pic to server
    setProfilePic(file);
    setProfilePicUrl(URL.createObjectURL(file));

  };


  const onSubmit = async (e) => {
    e.preventDefault();
    setIsProfileEdit(!isProfileEdit)
    if (!isProfileEdit) return null
    setLoading(true);

    const formData = new FormData();
    formData.append("file", profilePic);
    formData.append("fullName", fullName);
    formData.append("userName", userName);
    formData.append("location", country);
    formData.append("verficationPeriod", verificationPeriod);

    const res = await updateProfile(t, formData);

    setLoading(false);
    if (!res.data.success) return toast.error(res.data.message)
    const update = await getProfile(t);
    setLoading(false);
    if (!update.data.success) return toast.error(update.data.message)

    setProfile(update.data.data)


  };

  const { width } = useWindowSize();
  const { logout } = useContext(AuthContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
    <Toaster />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        width="100%"
        height="73px"
        padding="24px 0"
        className="mb-5"
      >
        <div>
          <Paragraph margin="0 8px 0 0" color="#000">
            Welcome, 👋
          </Paragraph>
          <Title style={{ textAlign: "left" }}>
            {profile?.userAuth.name ? profile?.userAuth.name : "Antor P."}
          </Title>
        </div>

        <div style={{ display: "flex" }}>
          <OptionMenuSettings
            options={[
              {
                Icon: people,
                text: "My Buddies",
                onClick: () => {
                  navigate("/home/my-buddies");
                },
              },

              {
                Icon: SignOut,
                text: "Logout",
                onClick: () => {
                  //logout function
                  // window.location.href = "https://sandsvault.io";
                  logout();
                  navigate("/");
                },
              },
            ]}
          />
          <IconButton
            onClick={() => {
              navigate("/home/notifications");
            }}
          >
            <IoNotificationsOutline size={20} />
          </IconButton>
        </div>
      </div>
      <Container
        margin="30px 70px 70px 70px"
        padding="70px"
        borderRadius="20px"
      >
        <form style={{ width: width < 600 && "100%" }} onSubmit={onSubmit}>
          <input
            ref={profilePicRef}
            type="file"
            disabled={!isProfileEdit}
            multiple={false}
            accept="image/*"
            hidden={true}
            onChange={handleImage}
          />
          <InputGroup
            label="Full Name"
            placeholder="Enter your full name"
            disabled={true}
            value={fullName}

            onChange={(e) => setFullName(e.target.value)}
          />
          <InputGroup
            label="Username"
            value={userName}
            disabled={!isProfileEdit}
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputGroup
            disabled={true}
            label="Email"
            placeholder="Enter your email"
            value={profile?.userAuth.email ? profile?.userAuth.email : "Antor P."}

          />

          {countriesOptions && (
            <>
              <Row justifyContent="space-between">
                <Label>Location</Label>
              </Row>
              <Select
                isDisabled={!isProfileEdit}
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
              isDisabled={!isProfileEdit}
              placeholder="Select the verification period"
              value={verificationperiodoptions.find(
                (el) => el.value == verificationPeriod
              )}
              styles={customStyles}
              onChange={(e) => {
                console.log(e);
                setVerificationPeriod(e.value);
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
            <Button color="#00A652" type="submit" >
              {isProfileEdit ? "Save" : "Edit"}
            </Button>
          </ButtonBar>
        </form>
        <LogoContainer
          style={{ marginTop: width <= 600 && "-3rem" }}
          backgroundColor="#ebebeb6b"
          onClick={() => profilePicRef.current.click()}
        >
          {profilePicUrl || profile?.profilePicture ? (
            <Image
              width="50px"
              height="44px"
              borderRadius="5px"
              margin="0 0 0 0"
              objectFit="cover"
              src={profilePicUrl || profile?.profilePicture}
              alt="Profile"
            />
          ) : (
            <Logo />
          )}
        </LogoContainer>
      </Container>
    </>
  );
}
