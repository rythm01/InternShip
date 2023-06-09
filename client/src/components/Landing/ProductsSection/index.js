import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Paragraph, Title } from "../../common";
import Ellipse1 from "../Ellipse1";
import Ellipse2 from "../Ellipse2";
import Images from "./Images";
import Section from "./Section";

export default function ProductsSection() {
  const navigate = useNavigate();

  return (
    <Section>
      <Ellipse1 />
      <Ellipse2 />

      <Title fontSize="48px" margin="0 0 16px 0">
        Create your own space and <br /> manage files easily!
      </Title>
      <Paragraph width="858px" display="block" margin="0 0 16px 0">
        Store and Share Vault is a highly secured location created for personal
        use to provide a secure central location for storing and sharing
        confidential account login information and documents in case there is
        ever a need for access due to unavailability of the Prime Account
        holder.
      </Paragraph>
      <Paragraph width="858px" display="block" margin="0 0 16px 0">
        Store and Share Vault users will also have access to important personal
        and family services such as Financial Literacy, Entrepreneurship, Estate
        Planning, Mental Health Services, Substance Abuse and other services
        needed to foster personal and family growth. Users will have access to
        all of these services at no additional cost.
      </Paragraph>
      <Button
        border
        color="transparent"
        textColor="#000"
        borderRadius="10px"
        width="271px"
        height="56px"
        margin="0 0 54px 0"
        onClick={() => navigate("/signup")}
      >
        Create Store and Share Vault
      </Button>
      <Images />
    </Section>
  );
}
