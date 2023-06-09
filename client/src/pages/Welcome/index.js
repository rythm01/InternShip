import React from "react";
import { landingImg } from "../../assets/images";

import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import {
  Button,
  ButtonBar,
  Container,
  CustomLink,
  Image,
  LogoContainer,
  Page,
  Paragraph,
  Title,
} from "../../components/common";

export default function Welcome() {
  return (
    <Page>
      <Container margin="60px 0 0 0" padding="70px" borderRadius="20px">
        <Image src={landingImg} alt="Person looking through files" />
        <Title>Welcome to Store & Share Vault</Title>
        <Paragraph>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of{" "}
        </Paragraph>

        <ButtonBar>
          <CustomLink to="/signup">
            <Button color="#f7941d">Sign up</Button>
          </CustomLink>

          <CustomLink to="/login">
            <Button color="#00A652">Log in</Button>
          </CustomLink>
        </ButtonBar>
        <LogoContainer>
          <Logo />
        </LogoContainer>
      </Container>
    </Page>
  );
}
