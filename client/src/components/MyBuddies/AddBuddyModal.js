import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { postAddBuddy } from "../../api";
import getBuddy from "../../api/getBudddy";
import { useModal } from "../../context/modal-context";
import useWindowSize from "../../utils/hook/useWindowSize";
import {
  Button,
  Column,
  InputGroup,
  Paragraph,
  Row,
  Select,
  Title,
} from "../common";
import AlertModal from "../common/AlertModal";

const Container = styled.div`
  width: 621px;
  background: #f5f5f5;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 0;
  padding: 20px;
`;

export default function AddBuddyModal({ addBuddies, error, onSubmit }) {
  const { unSetModal } = useModal();
  const [email, setEmail] = useState("");
  const [Errors, setErrors] = useState("");
  const [relation, setRelation] = useState("");


  const handleSubmit = async () => {
    if (!email || !relation ) {
      setErrors("Please fill all the fields");
      return;
    }
    onSubmit(email, relation);
  }


  const { width } = useWindowSize();

  return (
    <Box width="100%" alignItems="center" height="">
      <Title fontWeight="700" margin="16px 0">
        Add New Buddy
      </Title>
      <Box>
        <InputGroup
          label="Email of the buddy"
          placeholder="Enter your buddies Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Select
          style={{ fontSize: "12px" }}
          fontSize="18px"
          height="50px"
          width="100%"
          label="Select relationship"
          placeholder="Select the relationship"
          options={["Spouse", "Partner", "Friend", "other"]}
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
          margin="0 0 8px"
        />

      </Box>
      {error && (
        <Paragraph width="" color="#FF5F5F">
          {error}
        </Paragraph>
      )}


      <Row justifyContent="flex-end">

        <Button
          width="151px"
          height="50px"
          color="#00A652"
          onClick={handleSubmit}
        >
          Add Buddy
        </Button>
      </Row>
    </Box>
  );
}
