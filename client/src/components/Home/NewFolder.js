import React from "react";
import styled from "styled-components";
import { Paragraph } from "../common";
import { IoAddCircleOutline } from "react-icons/io5";

const NewFolderContainer = styled.div`
  /* position: absolute;
  left: 358px;
  top: 210px; */
  width: 100%;
  height: 95px;
  background: rgba(0, 166, 82, 0.05);
  border: 1px solid rgba(0, 166, 82, 0.1);
  box-sizing: border-box;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  @media (max-width: 600px) {
    height: 120px;
  }
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 166, 82, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Upload = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default function NewFolder({ setopen, onClick, onChange }) {
  return (
    <NewFolderContainer onClick={() => setopen(true)}>
      <Upload>
        {/* <input type="file" onChange={onChange} /> */}
        <IconContainer>
          <IoAddCircleOutline color="#00A652" size={25} />
        </IconContainer>
        <Paragraph color="#000" size="14px">
          Create New Folder
        </Paragraph>
      </Upload>
    </NewFolderContainer>
  );
}
