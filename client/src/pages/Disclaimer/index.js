import React, { useEffect } from 'react'
import { Back, Container, Page } from "../../components/common"

const EndUserLicense = () => {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.termly.io/embed-policy.min.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <Page>
      <Container width="1227px" margin="69px auto" justifyContent="flex-start">
        <div style={{ width: '900px', marginTop: '30px', marginBottom: '60px' }} name="termly-embed" data-id="2954853b-dc61-42e6-b324-b2552af3cece" data-type="iframe"></div>
        <Back />
      </Container>
    </Page>
  )
}

export default EndUserLicense