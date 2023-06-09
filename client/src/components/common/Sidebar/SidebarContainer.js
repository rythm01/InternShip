import styled from "styled-components";

const SidebarContainer = styled.nav`
  align-self: flex-start;
  width: 15%;
  height: 95%;
  padding: 24px;
  margin: 0;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
  /* overflow: hidden; */
  @media (max-width: 1300px) {
    width: 16%;
  }
  @media (max-width: 1100px) {
    width: 18%;
  }
  @media (max-width: 900px) {
    width: 20%;
  }
  @media (max-width: 800px) {
    width: 8%;
  }
  @media (max-width: 700px) {
    width: 10%;
  }
  @media (max-width: 600px) {
    width: 100% !important;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 1000;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    max-height: 10%;
    padding: 10px 0;
    padding-bottom: 0;
  }
`;

export default SidebarContainer;
