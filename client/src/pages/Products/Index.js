import { Box } from "@mui/material";
import React from "react";
import {
  Back,
  Container,
  Page,
  Title,
  Paragraph,
} from "../../components/common";
import useWindowSize from "../../utils/hook/useWindowSize";

const Index = () => {
  const { width } = useWindowSize();
  return (
    <Page style={{ overflowX: "hidden" }} justifyContent="flex-start">
      <Container
        width="100%"
        margin={width > 1200 && "69px"}
        justifyContent="flex-start"
      >
        <Title fontWeight="700" margin="56px auto 0">
          Products (Plans and Support Services)
        </Title>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "2rem",
            padding: "2rem",
            flexDirection: width < 900 && "column",
          }}
          className="flex_column"
        >
          <Box
            textAlign="start"
            color="#000"
            width="100%"
            display="block"
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              margin: "0 1rem",
              height: "100%",
              padding: width > 900 ? "80px 24px" : "40px 24px",
              marginBottom: width < 900 && "30px",
            }}
          >
            <ul>
              <Paragraph textAlign="start" color="#00a652" fontSize="30px">
                Plan A
              </Paragraph>
              <li style={{ marginTop: "30px" }} className="mt-15">
                5Gb Space
              </li>
              <li>4 Buddies</li>
              <li> $6.99/month</li>
              OR
              <br />
              <li>$71.00/annually (15% discount for annual subscription)</li>
            </ul>
          </Box>
          <Box
            textAlign="start"
            color="#000"
            width="100%"
            display="block"
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              margin: "0 1rem",
              height: "100%",
              padding: width > 900 ? "80px 24px" : "40px 24px",
              marginBottom: width < 900 && "30px",
            }}
          >
            <ul>
              <Paragraph textAlign="start" color="#00a652" fontSize="30px">
                Plan B
              </Paragraph>
              <li style={{ marginTop: "30px" }} className="mt-15">
                {" "}
                10Gb Space
              </li>
              <li> 7 Buddies</li>
              <li> $9.99/month</li>
              OR
              <br />
              <li> $99.00/annually (17% discount for annual subscription)</li>
            </ul>
          </Box>
          <Box
            textAlign="start"
            color="#000"
            width="100%"
            display="block"
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              margin: "0 1rem",
              height: "100%",
              padding: width > 900 ? "80px 24px" : "40px 24px",
              marginBottom: width < 900 && "30px",
            }}
          >
            <ul>
              <Paragraph color="#00a652" fontSize="30px">
                Plan C
              </Paragraph>
              <li style={{ marginTop: "30px" }} className="mt-15">
                {" "}
                15Gb Space
              </li>
              <li> $14.99/month</li>
              <li> 10 Buddies</li>
              OR
              <br />
              <li>$135/annually (25% discount for annual subscription)</li>
            </ul>
          </Box>
        </div>
        <Back />
      </Container>
    </Page>
  );
};

export default Index;
