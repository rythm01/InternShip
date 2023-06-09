import React from "react"
import styled from "styled-components"
import { useModal } from "../../context/modal-context"
import {
    Button,
    Column,
    Row,
    Title
} from "../common"

const Container = styled.div`
  width: 621px;
  background: #f5f5f5;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 0;
  padding: 20px;
`

export default function AlertModal({ message="", buttonText='OK', onSubmit }) {
    const { unSetModal } = useModal()

    const handleSubmit = () => {
        unSetModal();
        if (onSubmit) {
            onSubmit();
        }
    }

    return (
        <Column
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            height=""
        >
            <Container>
                <Title fontWeight="700" margin="16px 0">
                    {message}
                </Title>
                <Row justifyContent="center">
                    <Button
                        width="151px"
                        height="50px"
                        color="#00A652"
                        onClick={() => handleSubmit()}
                    >
                        {buttonText}
                    </Button>
                </Row>
            </Container>
        </Column>
    )
}
