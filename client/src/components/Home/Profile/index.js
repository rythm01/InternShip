import React from "react";
import { IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Image, Paragraph } from "../../common";
import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  padding: 10px;
  width: 180px;
  height: 60px;
  margin: auto 0 auto 10px;

  background: #ffffff;
  border-radius: 5px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  cursor: pointer;
  @media (max-width: 800px) {
    height: 56px;
  }
  @media (max-width: 600px) {
    height: 45px;
  }
  @media (max-width: 500px) {
    width: 120px;
  }
`;

export default function Profile({ user }) {
  const navigate = useNavigate();
  const profilePic = user && (user.profilePicture || user.profile_picture);
  return (
    <Container
      onClick={() => {
        navigate("/home/edit-profile");
      }}
    >
      {user && (user.profilePicture || user.profile_picture) ? (
        <Image
          width="45px"
          height="44px"
          borderRadius="5px"
          margin="0 10px 0 0"
          objectFit="cover"
          src={user.profilePicture || user.profile_picture}
          alt="Profile"
        />
      ) : (
        ""
      )}
      <Paragraph
        whiteSpace="nowrap"
        bold
        width=""
        fontSize="20px"
        color="#000"
        margin="0 20px 0 0"
      >
        {user ? user?.userAuth?.name : "Antor P."}
      </Paragraph>

      <IoChevronForward />
    </Container>
  );
}
