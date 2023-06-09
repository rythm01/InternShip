import React from "react";
import {
  Back,
  Container,
  Page,
  Row,
  Title,
  Paragraph,
} from "../../components/common";

const ContactUs = () => {
  return (
    <Page>
      <Container width="1227px" margin="69px auto" justifyContent="flex-start">
        <Title fontWeight="700" margin="46px auto 0">
          Contact Us
        </Title>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
            marginBottom: "40px",
          }}
        >
          <p style={{ marginBottom: "0px" }}>
            <span style={{ fontWeight: "bold", marginBottom: "0px" }}>
              Address:
            </span>{" "}
            730 Peachtree St. NE #570
          </p>
          <p style={{ marginBottom: "0px" }}>
            <span style={{ fontWeight: "bold", marginBottom: "0px" }}></span>{" "}
            Atlanta, GA 30308
          </p>
          <p style={{ marginBottom: "0px" }}>
            <span style={{ fontWeight: "bold", marginBottom: "0px" }}>
              Phone:{" "}
            </span>{" "}
            470-385-1829
          </p>
          <p style={{ marginBottom: "0px" }}>
            <span style={{ fontWeight: "bold", marginBottom: "0px" }}>
              Email:{" "}
            </span>{" "}
            info@storeandsharevault.io
          </p>
        </div>
        <Back />
      </Container>
    </Page>
  );
};

export default ContactUs;
