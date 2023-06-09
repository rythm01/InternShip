import React, { useContext, useState } from "react";
import styled from "styled-components";

import { IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";


import logo from '../../assets/images/logowithout.png';

import people from "../../assets/images/people.png";
import SignOut from "../../assets/images/SignOut.png";
import Group86 from "../../assets/images/Group 86.png";
import NotePencil from "../../assets/images/NotePencil.png";
import Avatar from "../../assets/images/avatar.png";

import OptionMenuSettings from "../../components/common/OptionMenuSettings";
import BackTransactions from "../TransactionsPaymentHistory/BackTransactions";
import folder from "../../assets/images/folder.png";
import {
  Button,
  IconButton,
  Paragraph,
  OptionsMenu,
  // Row,
  Title,
} from "../../components/common";
import { Table, TableHeadRow, TableBodyRow } from "../../components/MyBuddies";
import useWindowSize from "../../utils/hook/useWindowSize";
import { AuthContext } from "../../context/AuthContext";
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
const Text = styled.span`
  font-family: "TT Commons";
  font-style: "normal";
  font-size: 16px;
  font-weight: ${(props) => props.fontWeight || 500};
  color: black;
  line-height: 30px;
  margin-bottom: 0;
`;
const Heading = styled.span`
  font-family: "TT Commons";
  font-style: "normal";
  font-size: 20px;
  color: black;
  margin: auto 0;
  font-weight: 600;
  line-height: 30px;
`;

export default function Shared() {
  const navigate = useNavigate();
  const [showShared, setShowShared] = useState(false);
  const [border, setBorder] = useState();
  const { width } = useWindowSize();

  const { logout } = useContext(AuthContext)


  return (
    <>
      <Row
        width="100%"
        height="73px"
        padding="24px 0"
        alignItems="center"
        justifyContent="space-between"
      >
        <BackTransactions />
        <Title margin={width < 600 ? "0px 0px 0px 60px" : "0px 0px 0px 80px"}>
          Shared From Buddies
        </Title>

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
                  logout()
                  window.location.href = "https://sandsvault.io";
                },
              },
            ]}
          />
          <IconButton
            onClick={() => {
              navigate("/notifications");
            }}
          >
            <IoNotificationsOutline />
          </IconButton>
        </Row>
      </Row>
      <div
        className="flex_column"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "80vh",
          }}
        >
          <img src={logo} height={"240px"} />
          <Paragraph margin={"10px 0px"}>We are currently in beta testing this feature will be avilable soon.</Paragraph>
        </div>

        {Boolean(showShared) && (
          <Row className="mt-5">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                minWidth: "250px",
                marginLeft: "auto",
              }}
            >
              <Box
                width="100%"
                height="70vh"
                sx={{
                  boxShadow: "0.5px 0.5px 0.5px #f5f5f5",
                  borderRadius: "15px",
                  paddingX: "20px",
                  paddingY: "10px",
                  border: "1px solid #f5f5f5",
                  backgroundColor: "white",
                  overflowY: "auto",
                }}
              >
                <Heading>Details</Heading>
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid rgba(0, 0, 0, 0.05)",
                  }}
                />
                <Text fontWeight="600">Uploaded on: 12/03/2022</Text>
                <Box sx={{ marginTop: "10px" }}>
                  <Text fontWeight="600">Shared with</Text>
                </Box>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                  className="country-option"
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      src={Avatar}
                      alt="Profile picture"
                    />
                  </div>
                  <Text>ksdflsjd</Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                  className="country-option"
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      src={Avatar}
                      alt="Profile picture"
                    />
                  </div>
                  <Text>ksdflsjd</Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                  className="country-option"
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      src={Avatar}
                      alt="Profile picture"
                    />
                  </div>
                  <Text>ksdflsjd</Text>
                </div>

                <Button
                  width="150px"
                  height="46px"
                  color="#00A652"
                  margin="20px 0 0 0"
                >
                  Download
                </Button>
              </Box>
            </div>
          </Row>
        )}
      </div>
    </>
  );
}
