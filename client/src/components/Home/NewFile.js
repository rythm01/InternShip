import styled from "styled-components";

const NewFile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: ${(props) => props.position || "absolute"};
  width: ${(props) => props.width || "-webkit-fill-available"};
  height: 46px;
  bottom: 16px;
  margin: 0 15px;
  background: #00a652;
  border-radius: 5px;

  font-family: "TT Commons";
  font-size: 16px;
  color: #fff;

  cursor: pointer;
`;

export default NewFile;
