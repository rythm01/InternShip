import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import useWindowSize from "../../../utils/hook/useWindowSize";
import { Button, Column, Paragraph, Row, Title } from "../../common";
import Container from "./Container";
import SelectContainer from "./SelectContainer";

export default function AddOnsModal({ videos, storages, buy }) {
  const [selectedStorage, setSelectedStorage] = useState();
  const [selectedVideo, setSelectedVideo] = useState();

  const buyAddon = () => {
    buy({
      storage: selectedStorage
        ? {
            id: selectedStorage.id,
            currency: selectedStorage.currency,
            unit_amount: selectedStorage.unit_amount,
          }
        : null,
      video: selectedVideo
        ? {
            id: selectedVideo.id,
            currency: selectedVideo.currency,
            unit_amount: selectedVideo.unit_amount,
          }
        : null,
    });
  };
  const { width } = useWindowSize();
  return (
    <Column
      style={{
        overflowX: "hidden",
        overflowY: "hidden",
        width: width < 1000 && "100%",
      }}
      width="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Title fontWeight="700" margin="16px 0">
        Upgrade your experience with add-ons
      </Title>

      <Box style={{ overflowX: "scroll" }}>
        <Container>
          <Paragraph fontSize="22px" color="#000">
            Additional space
          </Paragraph>
          <Paragraph fontSize="14px" width="862px" textAlign="start">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of. It is a long established fact that a reader will be
            distracted by the readable .
          </Paragraph>

          <Row justifyContent="flex-start">
            {storages.map((storage) => (
              <SelectContainer
                key={storage.id}
                selected={selectedStorage?.id === storage.id}
                title={storage.nickname}
                price={`${storage.currency}${storage.unit_amount}`}
                onClick={() => setSelectedStorage(storage)}
              />
            ))}
          </Row>
        </Container>
      </Box>

      <Box style={{ overflowX: "scroll" }}>
        <Container>
          <Paragraph fontSize="22px" color="#000">
            Videos
          </Paragraph>
          <Paragraph fontSize="14px" width="862px" textAlign="start">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of. It is a long established fact that a reader will be
            distracted by the readable .
          </Paragraph>

          <Row justifyContent="flex-start">
            {videos.map((video) => (
              <SelectContainer
                minWidth="180px"
                key={video.id}
                selected={selectedVideo?.id === video.id}
                title={`${video.nickname} /Day`}
                price={`${video.currency}${video.unit_amount}`}
                features={[
                  "Lorem Ipsum",
                  "Lorem Ipsum dolor",
                  "Lorem Ipsum is dummy",
                ]}
                onClick={() => setSelectedVideo(video)}
              />
            ))}
          </Row>
        </Container>
      </Box>

      <Row justifyContent={width < 600 ? "center" : "flex-end"}>
        <Button width="151px" height="50px" color="#00A652" onClick={buyAddon}>
          Buy Now
        </Button>
      </Row>
    </Column>
  );
}
