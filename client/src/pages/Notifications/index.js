import React, { useContext, useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { Title, IconButton, Paragraph } from "../../components/common";
import { NotificationContainer } from "../../components/common/Notifications";
import { Profile } from "../../components/Home";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { Grid } from "@mui/material";
import OptionMenuSettings from "../../components/common/OptionMenuSettings";
import people from "../../assets/images/people.png";
import SignOut from "../../assets/images/SignOut.png";
import Group86 from "../../assets/images/Group 86.png";
import NotePencil from "../../assets/images/NotePencil.png";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import { getNotificationApi } from "../../networks/notifications";
import { createBuddyApi } from "../../networks/buddies";
import toast, { Toaster } from "react-hot-toast";

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

const Notifications = () => {
  const navigate = useNavigate();

  const { profile, logout, t } = useContext(AuthContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      const res = await getNotificationApi(t);
      if (!res.data.success) return toast.error(res.data.message);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const accept = async (data) => {
    try {
      const res = await createBuddyApi(t, data.inviterId);
      if (!res.data.success) return toast.error(res.data.message);
      getNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  const renderOneNotification = (item) => {
    return (
      <React.Fragment key={item.id}>
        <Grid
          container
          flexDirection="row"
          alignItems="center"
          height="100%"
          padding="10px"
        >
          <Grid item lg={0.7} paddingLeft="10px">
            <Logo width="41px" height="44px" />
          </Grid>
          <Grid item lg={2.3}>
            <Paragraph textAlign="justify" color="black" fontSize="20px">
              {JSON.parse(item.data).inviterEmail}
            </Paragraph>
          </Grid>
          <Grid item lg={8.5}>
            <Paragraph
              textAlign="justify"
              color="black"
              width="100%"
              fontSize="20px"
            >
              {item.message}
              {item.type == "buddy" ? (
                <span
                  onClick={() => accept(JSON.parse(item.data))}
                  style={{
                    cursor: "pointer",
                    marginLeft: 25,
                    textDecoration: "none",
                    color: "green",
                  }}
                >
                  Accept Invitation
                </span>
              ) : null}
            </Paragraph>
          </Grid>
          <Grid item lg={0.5}>
            <Paragraph
              whiteSpace="nowrap"
              width="100%"
              textAlign="justify"
              fontSize="12px"
              margin="0 30px 0 0"
            >
              {item.createdAt.split("T")[0]}
            </Paragraph>
          </Grid>
        </Grid>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.03)",
            width: "100%",
            height: "2px",
          }}
        />
      </React.Fragment>
    );
  };

  return (
    <>
      <Toaster />
      <Row
        width="100%"
        height="73px"
        padding="24px 0"
        alignItems="center"
        justifyContent="space-between"
        className="flex_column"
      >
        <div>
          <Title>Notifications</Title>
        </div>

        <Row>
          <OptionMenuSettings
            options={[
              {
                Icon: people,
                text: "My Buddies",
                onClick: () => {
                  navigate("/my-buddies");
                },
              },

              {
                Icon: people,
                text: "Profile",
                onClick: () => {
                  navigate("/edit-profile");
                },
              },
              {
                Icon: SignOut,
                text: "Logout",
                onClick: () => {
                  logout();
                  window.location.href = "https://sandsvault.io";
                },
              },
            ]}
          />

          <IconButton backgroundColor="#00A652">
            <IoNotificationsOutline color="white" size={20} />
          </IconButton>
          <Profile user={profile} />
        </Row>
      </Row>
      <Row justifyContent="space-between" width="100%">
        <NotificationContainer width="100%" height="auto">
          {data.map((item) => renderOneNotification(item))}
        </NotificationContainer>
      </Row>
    </>
  );
};

export default Notifications;
