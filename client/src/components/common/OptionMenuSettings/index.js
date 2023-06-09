import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { IoEllipsisVerticalOutline, IoSettingsOutline } from "react-icons/io5";
import IconButton from "../IconButton";
import Paragraph from "../Paragraph";
import Container from "./Container";
import MenuContainer from "./MenuContainer";
import MenuItem from "./MenuItem";
import styled from "styled-components";

const OptionConatiner = styled.div`
  align-self: start;
  width: 100%;
  height: 40px;
  margin: 0;
  font-family: "TT Commons";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
`;

export default function OptionMenuSettings({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  return (
    <Container ref={containerRef} onBlur={() => setIsOpen(false)}>
      <IconButton
        backgroundColor={isOpen ? "#00A652" : ""}
        onClick={() => {
          setIsOpen((v) => !v);
        }}
      >
        <IoSettingsOutline color={isOpen ? "white" : ""} size={20} />
      </IconButton>
      {isOpen && (
        <MenuContainer>
          {options.map((option, index) => (
            <MenuItem
              width="162px"
              key={index}
              onClick={() => {
                option.onClick();
                containerRef.current.blur();
              }}
            >
              <OptionConatiner>
                <img
                  src={option.Icon}
                  width="20px"
                  height="20px"
                  style={{ marginRight: "5px" }}
                />
                {option.text}
              </OptionConatiner>
            </MenuItem>
          ))}
        </MenuContainer>
      )}
    </Container>
  );
}
