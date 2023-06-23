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
    Label,
   
} from "../common";
import Description from "../common/Description";
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

export default function AddBuddyModal() {

  

    return (
       
        <Box width="100%" alignItems="center" height="">
            <Title fontWeight="700" margin="16px 0">
                Out of Space
            </Title>
          
            
            <Description width="80%" margin='40px'>Upgrade your experience with add-ons for more space..</Description>

         


            <Row justifyContent="center">

                <Button
                    width="151px"
                    height="50px"
                    color="#00A652"
                   
                >
                    View Add-ons
                </Button>
            </Row>
        </Box> 
       
        
    );
}
