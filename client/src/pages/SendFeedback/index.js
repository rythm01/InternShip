import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import {
  Row,
  Title,
  IconButton,
  InputGroup,
  Label,
  Button,
} from "../../components/common";
import { Profile } from "../../components/Home";
import OptionMenuSettings from "../../components/common/OptionMenuSettings";
import { logout } from "../../store/actions/auth";
import people from "../../assets/images/people.png";
import SignOut from "../../assets/images/SignOut.png";
import Group86 from "../../assets/images/Group 86.png";
import NotePencil from "../../assets/images/NotePencil.png";
import { MdKeyboardBackspace } from "react-icons/md";
import TextArea from "../../components/common/TextArea";
import useWindowSize from "../../utils/hook/useWindowSize";
import { Box } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from 'react-hot-toast';

const Index = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { profile, logout, authData } = useContext(AuthContext)

  const handleSubmit = () => {
    if (!title || !message) return toast("please enter title and message");
    else {

    }
  };

  const { width } = useWindowSize();

  return (
    <>
     <Toaster />
      <Box
        display="flex"
        height="73px"
        padding="24px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Row alignItems="center">
          <MdKeyboardBackspace
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
            size={25}
          />
          <Title
            fontWeight="650"
            margin={width < 600 ? "0px 0px 0px 20px" : "0px 0px 0px 40px"}
          >
            Send Feedback
          </Title>
        </Row>
        <div
          style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        >
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
                Icon: people,
                text: "Profile",
                onClick: () => {
                  navigate("/home/edit-profile");
                },
              },
              {
                Icon: SignOut,
                text: "Logout",
                onClick: () => {
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
          <Profile user={profile} />
        </div>
      </Box>
      <div style={{ padding: "0px 40px" }}>
        <Row
          alignItems="center"
          justifyContent="flex-start"
          margin="0px 0px 20px 0px"
        >
          <Title fontWeight="650" fontSize="20px">
            {authData?.email}
          </Title>
        </Row>
        <Row justifyContent="space-between">
          <InputGroup
            label="Title"
            placeholder=""
            value={title}
            width="100vw"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Row>
        <Row>
          <TextArea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "849px",
            marginTop: "10px",
          }}
        >
          <Button
            width="180px"
            onClick={() => handleSubmit()}
            color="#00A652"
            type="submit"
          >
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
export default Index;
