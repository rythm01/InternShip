import { Stack } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Column from "../Column";
import Label from "../Label";
import Row from "../Row";

const Container = styled.div`
  width: ${(props) => (props.width ? props.width : "512px")};
  height: ${(props) => (props.height ? props.height : "75px")};
  background: #fff;

  font-family: "TT Commons";
  font-size: 16px;
  line-height: 26px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid;
  border-radius: 10px;

  padding: 0 10px;

  ${(props) =>
    props.errorText ? "border-color:red" : "border-color:#292D3233"};
  ${(props) =>
    props.isActive ? "border-color:#00A652;" : "border-color:#292D3233"}

  transition: 0.25s;
`;

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1 0;
  align-items: center;
  min-width: 0;
`;

const SelectInput = styled.select`
  flex: 1 0;
  min-width: 50px;
  min-height: 25px;
  font-size: inherit;
  background-color: transparent;
  padding-left: 5px;
  border: 0;
  &:focus {
    outline: none;
  }
`;

function Select({
  label,
  placeholder,
  options,
  value,
  onChange,
  margin,
  width,
  height,
}) {
  return (
    <Stack margin={margin ?? "0"}>
      <Row justifyContent="space-between">
        <Label>{label}</Label>
      </Row>
      <Container width={width} height={height}>
        <InputContainer>
          <SelectInput value={value} onChange={onChange}>
            <option>{placeholder}</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </SelectInput>
        </InputContainer>
      </Container>
    </Stack>
  );
}

export default Select;
