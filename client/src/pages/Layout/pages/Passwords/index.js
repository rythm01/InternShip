import React, { useState, useEffect, useContext } from "react";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  InputGroup,
  OptionsMenu,
  Column,
  Paragraph,
  Title,
} from "../../../../components/common";
import { Box, Modal } from "@mui/material";

import {
  IoDocumentTextOutline,
  IoMusicalNoteOutline,
  IoImageOutline,
  IoDocumentOutline,
} from "react-icons/io5";
import people from "../../../../assets/images/people.png";
import SignOut from "../../../../assets/images/SignOut.png";
import Group86 from "../../../../assets/images/Group 86.png";
import NotePencil from "../../../../assets/images/NotePencil.png";
import OptionMenuSettings from "../../../../components/common/OptionMenuSettings";
import BackTransactions from "../../../TransactionsPaymentHistory/BackTransactions";
import folder from "../../../../assets/images/folder.png";
import File from "../../../../assets/images/file.svg";

import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import FolderContainer from "../Home/FolderContainer";

import FolderOpen from "../../../../assets/images/FolderOpen.svg";
import Pencil from "../../../../assets/images/Pencil.svg";
import Trash from "../../../../assets/images/Trash.svg";
import Copy from "../../../../assets/images/Copy.svg";
import { ReactComponent as CrossOutline } from "../../../../assets/images/CrossOutline.svg";
import FolderRenameModal from "../../../../components/FolderRenameModal";
import ShareWith from "../../../../components/common/ShareWith";
import { truncateString } from "../../../../utils/functions";
import styled from "styled-components";
import useWindowSize from "../../../../utils/hook/useWindowSize";
import { AuthContext } from "../../../../context/AuthContext";
import PasswordsData from "./PasswordStaticData";
import CloseIcon from '@mui/icons-material/Close';
import { Toaster, toast } from "react-hot-toast";
import Permission from "../../../Permissions/Permission";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  ${(props) => props.link && "cursor:pointer;"}
`;

export default function Passwords() {
  const navigate = useNavigate();
  const [field, setField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t, logout } = useContext(AuthContext);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [passwords, setPasswords] = useState(PasswordsData);
  const { width } = useWindowSize();

  //   useEffect(() => {
  //     getAllFolders();
  //   }, [t]);

  // const getAllFolders = async () => {
  //     setIsLoading(true)
  //     const allFolders = await getFolders(t)
  //     const allFoldersWithoutRoot = allFolders.data.data.filter((folder) => folder.name !== "root")
  //     setAllFolders(allFoldersWithoutRoot)
  //     setIsLoading(false)
  // }

  const style = {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    height: "369px",
    width: "669px",
    left: "50%",
    top: "50%",
    borderRadius: "20px",
    backgroundColor: "white",
    outline: "none",
    boxShadow: 30,
    p: "45px 15px 25px 15px",
  };

  // const HandleCreateFolder = async () => {
  //     // console.log(field)

  //     const res = await createFolder(t, { name: field })
  //     if (!res.data.success) {
  //         return toast.error(res.data.message)
  //     }
  //     setField("")
  //     setOpen(false)
  //     getAllFolders()

  // };

  // const deleteFolder = async (id) => {
  //     const res = await deleteFolderApi(t, id)
  //     if (!res.data.success) {
  //         return toast.error(res.data.message)
  //     }
  //     getAllFolders()
  // }

  const renameFolder = () => {
    // Implement the logic to update the folder name based on the selectedFolder.id and newFolderName
    // You can modify the Passwords array or update the state, depending on your implementation
    // For example, if using state:
    const updatedFolders = passwords.map((folder) => {
      if (folder.id === selectedFolder.id) {
        return {
          ...folder,
          title: newFolderName,
        };
      }

      return folder;
    });
    setPasswords(updatedFolders);

    setRenameModalOpen(false); // Close the modal
  };

  const handleDeleteFolder = (folderId) => {
    console.log("Handle Delete Folder");
    // Implement the logic to delete the folder based on the folderId
    // You can modify the Passwords array or update the state, depending on your implementation
    // For example, if using state:
    const updatedFolders = passwords.filter((folder) => folder.id !== folderId);
    setPasswords(updatedFolders);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Toaster />
      <Row
        width="100%"
        height="73px"
        r
        padding="24px 0"
        alignItems="center"
        justifyContent="space-between"
      >
        <BackTransactions />
        <Title margin={width > 600 ? "8px 0px 0px 80px" : "8px 0px 0px 60px"}>
          Password Type
        </Title>

        <Row>
          <OptionMenuSettings
            options={[
              {
                Icon: people,
                text: "My Buddies",
                onClick: () => {
                  navigate("/home/my-buddies");
                },
              },

              {
                Icon: people,
                text: "Profile",
                onClick: () => {
                  navigate("/home/edit-profile");
                },
              },
              {
                Icon: SignOut,
                text: "Logout",
                onClick: () => {
                  // window.location.href = "https://sandsvault.io";
                  logout();
                  navigate("/");
                },
              },
            ]}
          />
          <IconButton
            onClick={() => {
              navigate("/home/notifications");
            }}
          >
            <IoNotificationsOutline />
          </IconButton>
        </Row>
      </Row>

      <Box>
        <div>
          <Box width="100%" height="auto">
            <Row justifyContent="flex-end">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "auto",
                }}
              ></div>
            </Row>

            <Box
              style={{
                display: "grid",
                gridTemplateColumns:
                  width > 1200
                    ? "repeat(4,1fr)"
                    : width > 950
                      ? "repeat(3,1fr)"
                      : width > 600
                        ? "repeat(2,1fr)"
                        : "repeat(2,1fr)",
                gridGap: "1rem",
              }}
            >
              {passwords.map((element) => {
                return (
                  <div
                    style={{ position: "relative", marginTop: "20px" }}
                    key={element.id}
                  >
                    <div onClick={() => navigate(`${element.navigate}`)}>
                      <FolderContainer
                        width="100%"
                        height="173px"
                        flexDirection="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        padding="10px"
                        borderRadius="7px"
                      >
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              backgroundColor: `${element.bg}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              width="14px"
                              height="14px"
                              src={element.icon}
                            />
                          </div>
                        </div>
                        <Title
                          fontSize="22px"
                          margin={
                            width > 600 ? "20px 0px 0px 3px" : "8px 0px 0px 3px"
                          }
                          lineHeight="38px"
                          fontWeight="600"
                          fontFamily="TT Commons"
                        >
                          {element.title}
                        </Title>
                      </FolderContainer>
                    </div>
                    <OptionsMenu
                      color="rgba(0, 0, 0, 0.4)"
                      orientation="horizontal"
                      options={[
                        {
                          text: "Open",
                          onClick: () => {
                            navigate(`${element.navigate}`);
                          },
                        },
                        {
                          text: "Rename",
                          onClick: () => {
                            setNewFolderName(element.title);
                            setSelectedFolder(element);
                            setRenameModalOpen(true);
                            document.body.style.overflow = true ? "hidden" : "auto";
                            // console.log(element);
                          },
                        },
                        {
                          text: "Delete",
                          onClick: () => {
                            handleDeleteFolder(element.id);
                          },
                        },
                        {
                          text: "Permission",
                          onClick:()=>{
                            navigate('permission');
                          }
                        },
                      ]}
                      position="absolute"
                    />
                  </div>
                );
              })}
            </Box>
          </Box>
        </div>
      </Box>

      {renameModalOpen && (
        <Container>
          <div className="container">
            <div className="modalOfRename">
              <h2 className="heading" style={{ "textAlign": "center", "marginTop": "10px" }}>Rename Folder</h2>
              <div onClick={() => setRenameModalOpen(false)} className="closeButton">
                <CloseIcon />
              </div>
              <div className="renameForm">
                <h4 className="title">Title</h4>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                />
                <button onClick={renameFolder}>Rename</button>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}


const Container = styled.div`
  .container{
    width:70vw;
    height:62vh;
    font-family: 'Poppins', sans-serif;
    position:relative;
    bottom:400px;
    z-index:1;
    display:flex;
    align-items:center;
    justify-content:center;
    .modalOfRename{
      width:500px;
      height:230px;
      background:white;
      border-radius:20px;
      position:relative;
      box-shadow: 1px 1px 5px black;
      .closeButton{
        box-shadow: 1px 1px 5px black;
        width:30px;
        height:30px;
        display:flex;
        align-items:center;
        justify-content:center;
        border-radius:50px;
        position:absolute;
        top:10px;
        right:10px;
      }
      .renameForm{
        display:flex;
        flex-direction:column;
        margin:30px;
        input{
          margin-top:10px;
          height:40px;
          border-radius:10px;
          color:grey;
        }
        button {
          padding: 12px 39px;
          color: #FFF;
          background-color: #00A652;
          font-size: 18px;
          font-style: normal;
          text-align: center;
          border-radius: 5px;
          width: 250px;
          margin:auto;
          margin-top:20px;
          border: 1px solid #00A652;
          border-width: 1px 1px 3px;
          border-radius: 10px;
          box-shadow: 0 -1px 0 rgba(255,255,255,0.1) inset;
          margin-bottom: 10px;
          font-weight:600;
          cursor: pointer;
          bottom:25px;
        }      
      }
    }
  }
`