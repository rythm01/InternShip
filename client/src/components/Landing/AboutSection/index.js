import React, { forwardRef } from "react";
import { Paragraph, Title } from "../../common";
import Ellipse1 from "../Ellipse1";
import Ellipse2 from "../Ellipse2";
import Home from "./Home";
import Packages from "./Packages";
import Section from "./Section";

const AboutSection = forwardRef((props, ref) => {
  return (
    <Section ref={ref}>
      {/* <Ellipse1 /> */}
      {/* <Ellipse2 /> */}

      <div className="left_area">
        <Title
          display="block"
          width="181px"
          textAlign="start"
          fontSize="48px"
          margin="0 0 8px 0"
        >
          About Us
        </Title>
        <Paragraph
          color="#000"
          width="-webkit-fill-available"
          textAlign="start"
          display="block"
        >
          Store and Share Vault is an Amazon Web Services S3 encrypted
          application created as a safe space for individuals to store online
          account logins, documents, files, photos and videos of any size and
          share them with family member and loved ones should anything happen to
          them.
          <br /> <br /> Store and Share Vault is designed for a Prime Account
          Holder who will be able to add any personal account requiring login
          and documents they choose and share them with up to (4) individuals
          who will be designated as Buddies. The Prime Account Holder will
          determine what information each individual Buddy will have access to.
          The Buddy Account Holders with granted access by the Prime Account
          Holder will have timed access or immediate access to this information.
          <br /> <br /> Store and Share Vault helps to protect your family and
          loved ones from additional challenges by providing them access to all
          your personal confidential accounts, information and documents you
          choose to upload utilizing the Store and Share Vault. The automated
          forms we provide within the App will assist you in documenting,
          saving, and managing login information for bank account, merchant
          accounts, loans, credit cards, and more. <br /> <br />
          Store and Share Vault is a highly secured location created for
          personal use to provide a secure central location for storing and
          sharing confidential account login information and documents in case
          there is ever a need for access due to unavailability of the Prime
          Account holder.
          <br /> <br /> Store and Share Vault users will also have access to
          important personal and family services such as Financial Literacy,
          Entrepreneurship, Estate Planning, Mental Health Services, Substance
          Abuse and other services needed to foster personal and family growth.
          Users will have access to all of these services at no additional cost
          to them.
        </Paragraph>
      </div>
      <div className="right_area" style={{ position: "relative" }}>
        <Home />
        <Packages />
      </div>
    </Section>
  );
});

export default AboutSection;
