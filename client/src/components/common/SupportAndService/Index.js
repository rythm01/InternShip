import React from "react";
import Paragraph from "../Paragraph";
import Title from "../Title";
import Section from "./Section";

const Index = () => {
  return (
    <Section>
      <Title fontSize="48px" margin="0 0 16px 0">
        Support Services
      </Title>
      <Paragraph width="900px" textAlign="center" color="#000">
        At S&S Vault serving and supporting our community is in our DNA. We were
        birthed from sorrow, pain and healing, none of which could be avoided.
        We want to help individuals and families in our community learn, grow,
        prosper and thrive.
      </Paragraph>
      <br />
      <Paragraph width="900px" textAlign="center" color="#000">
        We feel this can be achieved by providing them with access to any and
        all of the support services they may need.
      </Paragraph>
      <Paragraph width="900px" textAlign="center" color="#000">
        We have partnered with service providers in the below fields who will be
        able to provide you and your family with resources you may need to
        learn, grow, prosper and thrive.
      </Paragraph>
      <br />
      <div className="home_ul_li">
        <ul>
          <li>Financial Literacy</li>
          <li>Estate Planning</li>
          <li>Physical Abuse</li>
          <li>Credit Worthiness </li>
          <li>Tutoring</li>
          <li>Home Buying</li>
          <li>Franchise Opportunities</li>
        </ul>
        <ul>
          <li>Physical Health</li>
          <li>Food</li>
          <li>Legal Services</li>
          <li>Home Repairs</li>
          <li>lifestyle Coaching</li>
          <li>Rehabilitation Services</li>
          <li>Transportation</li>
        </ul>
        <ul>
          <li>Affordable Housing</li>
          <li>Entrepreneurship</li>
          <li>Substance Abuse </li>
          <li>Trade Schools</li>
          <li>Access to Capital</li>
          <li>Caregiving</li>
          <li>Vehicle Repairs</li>
        </ul>
      </div>
    </Section>
  );
};

export default Index;
