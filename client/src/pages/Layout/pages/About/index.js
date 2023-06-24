import React, { useContext } from "react";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import {
  accountingImg,
  phonesImg,
  shareImg,
  signingImg,
} from "../../../../assets/images";
import {
  Back,
  // Column,
  Container,
  IconButton,
  // Image,
  Page,
  Paragraph,
  // Row,
  Title,
} from "../../../../components/common";
import people from "../../../../assets/images/people.png";
import SignOut from "../../../../assets/images/SignOut.png";
import Group86 from "../../../../assets/images/Group 86.png";
import NotePencil from "../../../../assets/images/NotePencil.png";
import OptionMenuSettings from "../../../../components/common/OptionMenuSettings";
import BackTransactions from "../../../TransactionsPaymentHistory/BackTransactions";
import styled from "styled-components";
import { Box } from "@mui/material";
import useWindowSize from "../../../../utils/hook/useWindowSize";
import { AuthContext } from "../../../../context/AuthContext";

const Image = styled.img`
  width: ${(props) => props.width ?? "-webkit-fill-available"};
  height: ${(props) => props.height};
  object-fit: ${(props) => props.objectFit ?? "contain"};
  margin: ${(props) => props.margin ?? "5px"};
  border-radius: ${(props) => props.borderRadius};
`;

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

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent};
  height: ${(props) => props.height ?? "100%"};
  overflow: ${(props) => props.overflow ?? "auto"};
  flex-basis: ${(props) => props.width};
  flex-grow: 0;
  flex-shrink: 0;
  padding: ${(props) => props.padding ?? "0"};
  margin: ${(props) => props.margin ?? "0"};
  box-sizing: border-box;
  ${(props) =>
    props.hideScrollBar ? "::-webkit-scrollbar {display: none;}" : ""};

  @media (max-width: 400px) {
  }
`;

export default function About() {
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();

  const { logout } = useContext(AuthContext)

  return location.pathname !== "/about" ? (
    <>
      <Row
        width="100%"
        height="73px"
        padding="24px 0"
        alignItems="center"
        justifyContent="space-between"
        className="pb-0"
      >
        <BackTransactions />
        <Title margin={width > 600 ? "8px 0px 0px 80px" : "8px 0px 0px 60px"}>
          About Us
        </Title>

        <Row>
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
                  logout()
                  // window.location.href = "https://sandsvault.io";
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
            <IoNotificationsOutline />
          </IconButton>
        </Row>
      </Row>
      <AboutContainer />
    </>
  ) : (
    <Page justifyContent="flex-start">
      <AboutContainer />
    </Page>
  );
}

const AboutContainer = () => {
  const { width } = useWindowSize();
  const location = useLocation();
  return (
    <Box>
      <Container
        margin={location.pathname == "/about" ? "69px " : "24px 0"}
        padding={location.pathname !== "/about" ? "20px" : "70px"}
        width={location.pathname == "/about" && "-webkit-fill-available"}
        color={location.pathname !== "/about" ? "#000" : ""}
      >
        {location.pathname == "/about" && (
          <Title fontWeight="700" margin="46px auto 0">
            About us
          </Title>
        )}
        <Paragraph
          textAlign={location.pathname === "/about" ? "left" : "left"}
          width={
            location.pathname !== "/about" ? "100%" : "-webkit-fill-available"
          }
          color="#000"
          margin="10px 0"
        >
          Store and Share Vault is an Amazon Web Services S3 encrypted
          application created as a safe space for individuals to store online
          account logins, documents, files, photos and videos of any size and
          share them with family member and loved ones should anything happen to
          them.
        </Paragraph>
        <Paragraph
          textAlign={location.pathname === "/about" ? "left" : "left"}
          width={
            location.pathname !== "/about" ? "100%" : "-webkit-fill-available"
          }
          color="#000"
          margin="10px 0"
        >
          Store and Share Vault helps to protect your family and loved ones from
          additional challenges by providing them access to your accounts,
          information and documents you choose to upload utilizing the S&S
          Vault. The automated forms we provide within the App will assist you
          in documenting, saving, and managing login information for bank
          account, merchant accounts, loans, credit cards, and more.
        </Paragraph>
        <Paragraph
          textAlign={location.pathname === "/about" ? "left" : "left"}
          width={
            location.pathname !== "/about" ? "100%" : "-webkit-fill-available"
          }
          color="#000"
          margin="10px 0"
        >
          S&S Vault users will also have access to important personal and family
          services such as Financial Literacy, Entrepreneurship, Estate
          Planning, Mental Health Services, Substance Abuse and other services
          needed to foster personal and family growth.
        </Paragraph>
        <Row
          margin="10px 0 0 0"
          width={
            location.pathname !== "/about" ? "100%" : "-webkit-fill-available"
          }
          className="flex_column"
        >
          <Column
            padding="10px"
            width="50%"
            style={{ gap: 20, overflow: "hidden" }}
          >
            <Row width="100%" justifyContent="space-between">
              <Image
                src={phonesImg}
                borderRadius="10px"
                margin="0"
                width="100%"
                height="100%"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </Row>
            <Row width="100%" justifyContent="space-between">
              <Column padding="0 10px 0 0" width="40%" className="p-0">
                <Image
                  src={signingImg}
                  borderRadius="10px"
                  margin="0"
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </Column>
              <Column padding="0 0 0 10px" width="60%">
                <Image
                  src={accountingImg}
                  borderRadius="10px"
                  margin="0"
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </Column>
            </Row>
          </Column>
          <Column padding="10px" width="50%" style={{ overflow: "hidden" }}>
            <Image
              src={shareImg}
              borderRadius="10px"
              margin="0"
              width="100%"
              height="100%"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </Column>
        </Row>
        <Paragraph
          textAlign={location.pathname === "/about" ? "left" : "left"}
          width={
            location.pathname !== "/about" ? "100%" : "-webkit-fill-available"
          }
          color="#000"
          margin="10px 0"
        >
          Store and Share Vault is a highly secured location created for
          personal use to provide a secure central location for storing and
          sharing confidential account login information and documents in case
          there is ever a need for access due to unavailability of the Prime
          Account holder.
        </Paragraph>
        <Paragraph
          textAlign={location.pathname === "/about" ? "left" : "left"}
          width={
            location.pathname !== "/about" ? "100%" : "-webkit-fill-available"
          }
          color="#000"
          margin="10px 0"
        >
          Store and Share Vault users will also have access to important
          personal and family services such as Financial Literacy,
          Entrepreneurship, Estate Planning, Mental Health Services, Substance
          Abuse and other services needed to foster personal and family growth.
          Users will have access to all of these services at no additional cost
          to them.
        </Paragraph>
        {location.pathname == "/about" && <Back />}
      </Container>
    </Box>
  );
};
