import React from "react";
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";
import styled from "styled-components";
import PlanFeature from "../Plan/PlanFeature";
import PlanFeatures from "../Plan/PlanFeatures";

const Container = styled.div`
  padding: 0 18px;
  background: #ffffff;
  border-radius: 10px;
  position: relative;
  margin: 14px 24px auto 0;
  border: 1px solid ${(props) => (props.selected ? "#00A652;" : "transparent;")}
  cursor: pointer;

  @media (max-width: 600px){
    min-width: 180px;
  }
`;

const Check = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
`;

const HeaderTitle = styled.div`
  padding: 0 17px;
  height: 38px;

  background: ${(props) => (props.selected ? "#00A652" : "#00A6520D")};
  color: ${(props) => (props.selected ? "#fff" : "#00A652")};
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "TT Commons";
  font-weight: 700;
  font-size: 18px;

  margin: 18px auto;
`;

const Price = styled.p`
  font-family: "TT Commons";
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  color: #000;
  margin-bottom: 15px;
`;

export default function SelectContainer({
  selected,
  onClick,
  title,
  price,
  features,
}) {
  return (
    <Container selected={selected} onClick={onClick}>
      {selected && (
        <Check>
          <IoCheckmarkCircleSharp
            size={20}
            color="#00A652"
            lightingColor="#fff"
            style={{
              background: "#fff",
              padding: "0",
              borderRadius: "50%",
            }}
          />
        </Check>
      )}
      <HeaderTitle selected={selected}>{title}</HeaderTitle>
      <Price>{price}</Price>
      <PlanFeatures width="100%" height="">
        {features?.map((feature, index) => (
          <PlanFeature key={index} active fontSize="12px">
            <IoCheckmarkCircleOutline
              size="11.67px"
              color="#00A652"
              style={{ marginRight: "5px" }}
            />
            {feature}
          </PlanFeature>
        ))}
      </PlanFeatures>
    </Container>
  );
}
