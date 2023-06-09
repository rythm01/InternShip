import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  background: #ffffff;
  border-radius: 10px;

  display: flex;
  flex-direction: ${(props) => props.flexDirection ?? "column"};
  justify-content: ${(props) => props.justifyContent ?? "flex-start"};
  align-items: ${(props) => props.alignItems ?? "center"};
  padding: ${(props) => props.padding ?? "0"};
  box-sizing: border-box;
  margin: 60px 0 40px 0;
`;

export default function NotificationContainer({
  width,
  height,
  children,
  justifyContent,
  alignItems,
  padding,
}) {
  return (
    <Container
      width={width}
      height={height}
      justifyContent={justifyContent}
      alignItems={alignItems}
      padding={padding}
    >
      {children}
    </Container>
  );
}
