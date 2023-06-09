import React, { useEffect } from "react";
import {
  Back,
  Container,
  Page,
  Row,
  Title,
  Paragraph,
} from "../../components/common";

import useWindowSize from "./../../utils/hook/useWindowSize";

const PrivacyPolicy = ({ handlePrivacyPolicyBack }) => {
  const { width } = useWindowSize();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.termly.io/embed-policy.min.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <Page justifyContent="flex-start">
      <Container
        width="1227px"
        margin="69px"
        justifyContent="flex-start"
        // padding="0 !important"
      >
        <div
          style={{
            width: "-webkit-fill-available",
            marginTop: width > 1200 ? "60px" : "30px",
            marginBottom: "60px",
            // padding: "0",
          }}
          name="termly-embed"
          data-id="a001c354-de23-4c55-9c11-c76488033862"
          data-type="iframe"
        ></div>
        <Back onClick={handlePrivacyPolicyBack} />
      </Container>
    </Page>
  );
};

export default PrivacyPolicy;
