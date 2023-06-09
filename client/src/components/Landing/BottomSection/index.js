import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Brand, Paragraph, Row, Title } from "../../common";
// import Section from "./Section";
import { ReactComponent as Logo } from "../../../assets/images/Logo.svg";
import { appStoreImg, googlePlayImg } from "../../../assets/images";

const Rectangle1 = styled.div`
  position: absolute;
  width: 100%;
  height: 360px;
  left: 100vw;
  top: 0px;

  background: rgba(0, 166, 82, 0.05);
  opacity: 0.3;
  transform: matrix(-1, 0, 0, 1, 0, 0);
`;

const Rectangle2 = styled.div`
  position: absolute;
  width: 100%;
  height: 360px;
  left: 0px;
  top: 0px;

  background: rgba(0, 166, 82, 0.1);
  opacity: 0.3;
`;

const Image = styled.img`
  /* width: ${(props) => props.width ?? "138px"}; */
  height: ${(props) => props.height};
  object-fit: ${(props) => props.objectFit ?? "contain"};
  margin: ${(props) => props.margin ?? "5px"};
  border-radius: ${(props) => props.borderRadius};

  @media (max-width: 1200px) {
    width: 138px;
  }
  @media (max-width: 900px) {
    width: 118px;
  }
  @media (max-width: 600px) {
    width: 98px;
  }
  @media (max-width: 400px) {
    width: 78px;
  }
`;
const Section = styled.section`
  box-sizing: border-box;
  width: 100%;
  /* height: 360px; */
  padding: 14px 50px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  display: grid;
  justify-content: space-around;
  align-items: start;
  grid-template-columns: repeat(4, auto);

  & > div {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, auto);
    padding: 14px 50px;
  }

  @media (max-width: 600px) {
    display: block;
    padding: 14px 30px;
  }
`;

export default function BottomSection() {
  const navigate = useNavigate();

  return (
    <Section>
      {/* <Rectangle1 />
      <Rectangle2 /> */}
      <div>
        <Row link alignItems="center" margin="0 0 14px 0">
          <Logo />
          <Brand>S & S Vault</Brand>
        </Row>

        <Paragraph
          link
          color="#000"
          fontSize="24px"
          bold
          textAlign="start"
          margin="0 0 17px 0"
        >
          Our App is Coming Soon !
        </Paragraph>
        <Row margin="12px 0 12px 0">
          <Image
            src={appStoreImg}
            alt="App Store"
            width="138px"
            margin="0 8px 0 0"
          />
          <Image
            src={googlePlayImg}
            alt="Google Play"
            width="138px"
            margin="0"
          />
        </Row>
      </div>
      <div width="100%">
        <Title fontSize="22px" textAlign="start" margin="18px 0 12px 0">
          Want to know more?
        </Title>
        <Paragraph
          className="m-2"
          link
          textAlign="start"
          margin="4px 0"
          fontSize="18px"
          color="#494E4C"
          onClick={() => navigate("/faq")}
        >
          FAQs
        </Paragraph>
        <Paragraph
          className="m-2"
          link
          textAlign="start"
          margin="4px 0"
          fontSize="18px"
          color="#494E4C"
          onClick={() => navigate("/contact-us")}
        >
          Contact Us
        </Paragraph>
        <Paragraph
          className="m-2"
          link
          textAlign="start"
          margin="4px 0"
          fontSize="18px"
          color="#494E4C"
          onClick={() => navigate("/about")}
        >
          About Us
        </Paragraph>
        <Paragraph
          className="m-2"
          link
          textAlign="start"
          margin="4px 0"
          fontSize="18px"
          color="#494E4C"
        >
          Careers
        </Paragraph>
      </div>
      <div width="100%">
        <Title fontSize="22px" textAlign="start" margin="18px 0 12px 0">
          More About us
        </Title>
        <Paragraph
          className="m-2"
          link
          textAlign="start"
          margin="4px 0"
          fontSize="18px"
          color="#494E4C"
        >
          Terms of Sale
        </Paragraph>
        <Paragraph
          className="m-2"
          link
          textAlign="start"
          margin="4px 0"
          fontSize="18px"
          color="#494E4C"
        >
          Terms of Service
        </Paragraph>
        <Paragraph
          className="m-2"
          link
          textAlign="start"
          margin="4px 0"
          fontSize="18px"
          color="#494E4C"
          onClick={() => navigate("/privacy-policy")}
        >
          Privacy Policy
        </Paragraph>
        <Paragraph
          className="m-2"
          link
          textAlign="start"
          margin="4px 0"
          fontSize="18px"
          color="#494E4C"
          onClick={() => navigate("/terms-&-conditions")}
        >
          Terms and Conditions
        </Paragraph>
      </div>
      <div width="100%">
        <Title fontSize="22px" textAlign="start" margin="18px 0 12px 0">
          Social Links
        </Title>
        <Paragraph
          className="m-2"
          link
          textAlign="start"
          margin="4px 0"
          fontSize="18px"
          color="#494E4C"
        >
          Blog
        </Paragraph>
        <Paragraph
          className="m-2"
          link
          textAlign="start"
          margin="4px 0"
          fontSize="18px"
          color="#494E4C"
        >
          <a
            href="https://www.facebook.com/Store-and-Share-Vault-S-and-S-Vault-107816765260015"
            style={{ color: "#494E4C", textDecoration: "none" }}
            target="_blank"
          >
            {" "}
            Facebook
          </a>
        </Paragraph>
        <Paragraph
          className="m-2"
          link
          textAlign="start"
          margin="4px 0"
          fontSize="18px"
          color="#494E4C"
        >
          <a
            href="https://www.instagram.com/storeandsharevault/"
            style={{ color: "#494E4C", textDecoration: "none" }}
            target="_blank"
          >
            {" "}
            Instagram
          </a>
        </Paragraph>
        <Paragraph
          className="m-2"
          link
          textAlign="start"
          margin="4px 0"
          fontSize="18px"
          color="#494E4C"
        >
          LinkedIn
        </Paragraph>
        <Paragraph
          className="m-2"
          link
          textAlign="start"
          margin="4px 0"
          fontSize="18px"
          color="#494E4C"
        >
          Twitter
        </Paragraph>
        <Paragraph
          className="m-2"
          link
          textAlign="start"
          margin="4px 0"
          fontSize="18px"
          color="#494E4C"
        >
          <a
            href="https://www.youtube.com/@storeandsharevault"
            style={{ color: "#494E4C", textDecoration: "none" }}
            target="_blank"
          >
            YouTube
          </a>
        </Paragraph>
      </div>
    </Section>
  );
}
