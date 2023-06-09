import React from "react";
import styled from "styled-components";
import { addBuddyImg, myBuddiesImg, packagesImg } from "../../../assets/images";

const Container = styled.div`
  width: 100%;
  height: 700px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;

  @media (max-width: 800px) {
    height: 263px;
  }
  @media (max-width: 400px) {
    height: 163px;
  }
`;

const Packages1 = styled.div`
  position: absolute;
  width: 593px;
  height: 421px;
  left: -243px;
  top: -183px;

  background: url(${packagesImg});
  background-position: center center;
  background-size: contain;
  border: 3px solid #292d32;
  border-radius: 10px;

  @media (max-width: 800px) {
    border: 2px solid #292d32;
    width: 250px;
    height: 208px;
    left: -58px;
    top: -65px;
  }
  @media (max-width: 400px) {
    width: 150px;
    height: 108px;
    left: -75px;
    top: -45px;
  }
  @media (max-width: 370px) {
    left: -95px;
  }
`;

const Packages2 = styled.div`
  position: absolute;
  width: 593px;
  height: 421px;
  left: 378px;
  top: -67px;

  background: url(${packagesImg});
  background-position: center center;
  background-size: contain;
  border: 3px solid #292d32;
  border-radius: 10px;
  @media (max-width: 800px) {
    border: 2px solid #292d32;
    width: 250px;
    height: 208px;
    left: 200px;
    top: -50px;
  }
  @media (max-width: 400px) {
    width: 150px;
    height: 108px;
    left: 80px;
    top: -30px;
  }
  @media (max-width: 370px) {
    left: 60px;
  }
`;

const Packages3 = styled.div`
  position: absolute;
  width: 593px;
  height: 421px;
  left: 999px;
  top: 426px;

  background: url(${packagesImg});
  background-position: center center;
  background-size: contain;
  border: 3px solid #292d32;
  border-radius: 10px;
  @media (max-width: 800px) {
    border: 2px solid #292d32;
    width: 250px;
    height: 208px;
    left: 458px;
    top: -30px;
  }
  @media (max-width: 400px) {
    width: 150px;
    height: 108px;
    left: 235px;
    top: -10px;
  }
  @media (max-width: 370px) {
    left: 215px;
  }
`;

const AddBuddy1 = styled.div`
  position: absolute;
  width: 593px;
  height: 421px;
  left: -243px;
  top: 261px;

  background: url(${addBuddyImg});
  background-position: center center;
  background-size: contain;
  border: 3px solid #292d32;
  border-radius: 10px;
  @media (max-width: 800px) {
    border: 2px solid #292d32;
    width: 250px;
    height: 208px;
    left: -58px;
    top: 150px;
  }
  @media (max-width: 400px) {
    width: 150px;
    height: 108px;
    left: -75px;
    top: 68px;
  }
  @media (max-width: 370px) {
    left: -95px;
  }
`;

const AddBuddy2 = styled.div`
  position: absolute;
  width: 593px;
  height: 421px;
  left: 378px;
  top: 376px;

  background: url(${addBuddyImg});
  background-position: center center;
  background-size: contain;
  border: 3px solid #292d32;
  border-radius: 10px;
  @media (max-width: 800px) {
    border: 2px solid #292d32;
    width: 250px;
    height: 208px;
    left: 200px;
    top: 165px;
  }
  @media (max-width: 400px) {
    width: 150px;
    height: 108px;
    left: 80px;
    top: 83px;
  }
  @media (max-width: 370px) {
    left: 60px;
  }
`;

const MyBuddies = styled.div`
  position: absolute;
  width: 593px;
  height: 421px;
  left: 999px;
  top: -17px;

  background: url(${myBuddiesImg});
  background-position: center center;
  background-size: contain;
  border: 3px solid #292d32;
  border-radius: 10px;
  @media (max-width: 800px) {
    border: 2px solid #292d32;
    width: 250px;
    height: 208px;
    left: 458px;
    top: 185px;
  }
  @media (max-width: 400px) {
    width: 150px;
    height: 108px;
    left: 235px;
    top: 103px;
  }
  @media (max-width: 370px) {
    left: 215px;
  }
`;

export default function Images() {
  return (
    <Container>
      <Packages1 />
      <Packages2 />
      <Packages3 />
      <MyBuddies />
      <AddBuddy1 />
      <AddBuddy2 />
    </Container>
  );
}
