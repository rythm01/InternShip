import React from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { cameraImg, userImg } from "../../assets/images"
import UploadButton from "./UploadButton"

const Container = styled.div`
  width: ${props => props.width ?? "184px"};
  height: ${props => props.height ?? "184px"};
  object-fit: scale-down;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 40px auto;
  background: #fafafa;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  object-fit: ${props => (props.imagePreview ? "cover" : "scale-down")};
  width: 184px;
  height: 184px;
  border-radius: 50%;
`

export default function ProfileImage({ imagePreview, handleImage }) {
  useEffect(() => {}, [imagePreview])

  return (
    <Container>
      <Image
        src={imagePreview ?? userImg}
        alt="Profile preview"
        imagePreview={imagePreview}
      />
      <UploadButton>
        <img src={cameraImg} alt="Camera" />
        <input type="file" accept="image/*" onChange={handleImage} />
      </UploadButton>
    </Container>
  )
}
