import React, { useEffect } from "react";
import { Back, Container, Page } from "../../components/common";
import useWindowSize from "./../../utils/hook/useWindowSize";

const TermsConditions = ({ handleTermsConditionsBack }) => {
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
          data-id="d1b51bf7-d569-4b85-ae7d-b13841a34e43"
          data-type="iframe"
        ></div>
        <Back onClick={handleTermsConditionsBack} />
      </Container>
    </Page>
  );
};

export default TermsConditions;
