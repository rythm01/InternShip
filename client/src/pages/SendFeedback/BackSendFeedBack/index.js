import React from "react"
import styled from "styled-components"
import { MdKeyboardBackspace } from "react-icons/md"
import { useNavigate } from "react-router-dom"

const BackContainer = styled.div`
  width: 64px;
  height: 55px;
  font-family: "TT Commons";
  font-style: normal;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: ${props => props.position ?? "absolute"};
  ${props => props.position && `
  top: 50px;
  left: 250px;
  `}
  border-radius: 10px;
  cursor: pointer;
  font-weight: ${props => props.fontWeight ?? "600"};
`

export default function BackSendFeedBack() {
    const navigate = useNavigate()

    return (
        <BackContainer onClick={() => navigate(-1)}>
            <MdKeyboardBackspace style={{marginTop: 15}} size={25} />
        </BackContainer>
    )
}