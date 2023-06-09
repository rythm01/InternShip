import styled from "styled-components";

const Page = styled.div`
  background: #fafafa;
  /* min-width: 1440px; */
  height: ${(props) => props.height ?? "100vh"};
  display: flex;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  align-items: center;
  justify-content: ${(props) =>
    props.justifyContent ? `${props.justifyContent} !important` : "center"};
  padding: ${(props) => props.padding ?? "0"};
  margin: 0;
  overflow: ${(props) => props.overflow ?? "auto"};
  position: relative;
  width: 100%;
  overflow-y: auto;

  @media (max-width: 600px) {
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export default Page;
