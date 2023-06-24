import React, { useRef, useEffect, useState } from "react";
import {
  Brand,
  Button,
  CustomLink,
  Page,
  Container,
  Paragraph,
  Row,
  Title,
} from "../../components/common";
import {
  AboutSection,
  BottomSection,
  Footer,
  Hero,
  NavBar,
  ProductsSection,
} from "../../components/Landing";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { useNavigate } from "react-router-dom";
import SupportAndService from "../../components/common/SupportAndService/Index";
import { ImMenu } from "react-icons/im";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Landing() {
  const navigate = useNavigate();

  const aboutUsRef = useRef(null);


  useEffect(() => {
  }, []);


  const handleAboutUsClick = () => {
    navigate("/about");
  };

  const handleHowItWorksClick = () => {
    navigate("/how-it-works");
  };

  const handleProductsClick = () => {
    navigate("/products");
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  return (
    <Page height="">

      <NavBar>
        <Row link alignItems="center">
          <Logo />
          <Brand>S & S Vault</Brand>
        </Row>
        <Row margin="" className="none">
          <Paragraph
            cursor={"pointer"}
            color="#022714"
            fontSize="18px"
            margin="auto 20px"
          >
            Home
          </Paragraph>
          <Paragraph
            onClick={handleAboutUsClick}
            cursor={"pointer"}
            color="#02271480"
            fontSize="18px"
            margin="auto 20px"
          >
            About us
          </Paragraph>
          <Paragraph
            onClick={handleProductsClick}
            cursor={"pointer"}
            color="#02271480"
            fontSize="18px"
            margin="auto 20px"
          >
            Products
          </Paragraph>
          <Paragraph
            onClick={handleHowItWorksClick}
            cursor={"pointer"}
            color="#02271480"
            fontSize="18px"
            margin="auto 20px"
          >
            How it works
          </Paragraph>
          <CustomLink
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            to="/login"
          >
            <Paragraph color="#022714" fontSize="18px" margin="auto 20px">
              Login
            </Paragraph>
          </CustomLink>
          <CustomLink
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            to="/signup"
          >
            <Button
              color="#00A652"
              width="104px"
              height="48px"
              borderRadius="8px"
            >
              Sign Up
            </Button>
          </CustomLink>
        </Row>
        <Row className="block width-0">
          <ImMenu onClick={handleShow} />
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <Row link alignItems="center">
                  <Logo />
                  <Brand>S & S Vault</Brand>
                </Row>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Row
                margin=""
                flexDirection="column"
                alignItems="start"
                gap="10px"
              >
                <Paragraph
                  cursor={"pointer"}
                  color="#022714"
                  fontSize="18px"
                  margin="auto 20px"
                >
                  Home
                </Paragraph>
                <Paragraph
                  onClick={handleAboutUsClick}
                  cursor={"pointer"}
                  color="#02271480"
                  fontSize="18px"
                  margin="auto 20px"
                >
                  About us
                </Paragraph>
                <Paragraph
                  onClick={handleProductsClick}
                  cursor={"pointer"}
                  color="#02271480"
                  fontSize="18px"
                  margin="auto 20px"
                >
                  Products
                </Paragraph>
                <Paragraph
                  onClick={handleHowItWorksClick}
                  cursor={"pointer"}
                  color="#02271480"
                  fontSize="18px"
                  margin="auto 20px"
                >
                  How it works
                </Paragraph>
                <CustomLink
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  to="/login"
                >
                  <Paragraph color="#022714" fontSize="18px" margin="auto 20px">
                    Login
                  </Paragraph>
                </CustomLink>
                <CustomLink
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  to="/signup"
                >
                  <Button
                    color="#00A652"
                    width="104px"
                    height="48px"
                    borderRadius="8px"
                  >
                    Sign Up
                  </Button>
                </CustomLink>
              </Row>
            </Offcanvas.Body>
          </Offcanvas>
        </Row>
      </NavBar>
      <Container
        background="transparent"
        margin="50px 100px"
        className="marginx-20"
      >
        <Title fontWeight="700" fontSize="65px">
          Protecting Your Peace of Mind
        </Title>
        <Paragraph
          width=""
          color="#02271480"
          fontSize="20px"
          margin="0 0 21px 0"
        >
          Store and Share Vault is an encrypted cloud based software created as
          a safe space for individuals to store all personal and sensitive
          information and have the ability to share them with a loved one in the
          event that something happens to them.
        </Paragraph>
        <Button
          border
          color="transparent"
          textColor="#000"
          borderRadius="10px"
          width="171px"
          height="56px"
          // margin="0 0 54px 0"
          onClick={() => navigate("/welcome")}
        >
          Explore Now
        </Button>
      </Container>
      <Hero />

      <AboutSection ref={aboutUsRef} />

      <SupportAndService />
      <ProductsSection />
      <BottomSection />

      <Footer>©{new Date().getFullYear()} All Rights Reserved by S & S Vault</Footer>
    </Page>
  );
}
