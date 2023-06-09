import styled from "styled-components";

const NavBar = styled.nav`
  box-sizing: border-box;
  position: sticky;
  top: 0;
  max-width: 100%;
  min-width: 100%;
  margin: 0;
  padding: 24px 76px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1100px) {
    padding: 20px 50px;
  }

  @media (max-width: 500px) {
    padding: 20px;
  }
`;

export default NavBar;
