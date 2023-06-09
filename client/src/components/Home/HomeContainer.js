import React from "react";
import styled from "styled-components";
import Paragraph from "../common/Paragraph";
import Title from "../common/Title";

const Container = styled.div`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  background: #ffffff;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent ?? "flex-start"};
  align-items: ${(props) => props.alignItems ?? "center"};
  padding: ${(props) => props.padding ?? "0"};
  box-sizing: border-box;
  margin: 12px 0 12px 0;
  @media (max-width: 800px) {
    width: 100% !important;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
`;

export default function HomeContainer({
  width,
  height,
  title,
  onViewAll,
  children,
  justifyContent,
  alignItems,
  padding,
  style = {},
  isViewAll = true,
}) {
  return (
    <Container
      width={width}
      height={height}
      justifyContent={justifyContent}
      alignItems={alignItems}
      padding={padding}
      style={style}
    >
      {title && (
        <Header>
          <Title fontSize="22px">{title}</Title>
          {
            isViewAll && (
              <Paragraph color="#000" link onClick={onViewAll}>
                View All &gt;
              </Paragraph>)
          }
        </Header>
      )}
      {children}
    </Container>
  );
}
