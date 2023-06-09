import Paragraph from "../../common/Paragraph";
import Title from "../../common/Title";
import { IoDocumentTextOutline } from "react-icons/io5";
// import Container from "./Container";
import IconContainer from "./IconContainer";
import styled from "styled-components";
import useWindowSize from "../../../utils/hook/useWindowSize";

const Container = styled.div`
  width: -webkit-fill-available;
  height: 118px;

  background: ${(props) => props.color ?? "#DFF9EC"};
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: start;
  box-sizing: border-box;
  padding: 20px;
  margin: 12px 0 12px 0;

  box-sizing: border-box;

  position: relative;

  @media (max-width: 800px) {
    height: 90px;
    margin: 0;
  }
`;
export default function FileCount({ color, count, type }) {
  const { width } = useWindowSize();
  return (
    <Container color={color}>
      <IconContainer>
        <IoDocumentTextOutline />
      </IconContainer>
      <Title fontSize="36px">{count}</Title>
      <Paragraph color="#000" fontSize={width > 1100 ? "22px" : "16px"}>
        {type}
      </Paragraph>
    </Container>
  );
}
