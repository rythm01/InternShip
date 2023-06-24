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
    // Row,
    Title,
} from "../../../../components/common";

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
import BackTransactions from "../../../TransactionsPaymentHistory/BackTransactions/PasswordBack";
import folder from "../../../../assets/images/folder.png";
import File from "../../../../assets/images/file.svg";
import { Box } from "@mui/material";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import FolderContainer from "../Home/FolderContainer";
import Modal from "@mui/material/Modal";
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
import { getFile, getfiles } from "../../../../networks/files";
import { createFolder, deleteFolderApi, getFolders } from "../../../../networks/folders";
import { getBuddiesApi } from "../../../../networks/buddies";
import Files from "./FilesStaticData";
import fileimage from "../../../../assets/images/file1.png"
import { Toaster, toast } from "react-hot-toast";




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

const CryptoPassword = () => {

    const navigate = useNavigate();
    const { t , logout} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false);
    const [renameModalOpen, setRenameModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [newFileName, setNewFileName] = useState('');
    const [files, setFiles] = useState(Files);


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
    const { width } = useWindowSize();

    const renameFile = () => {
        console.log("Rename");
      
        const updatedFiles = files.map((file) => {
          if (file.id === selectedFile.id) {
            return {
              ...file,
              title: newFileName,
            };
          }
          return file;
        });
        setFiles(updatedFiles);
      
        setRenameModalOpen(false); // Close the modal
      };
      

    const handleDeleteFile = (folderId) => {
        console.log("Handle Delete Folder");
        // Implement the logic to delete the folder based on the folderId
        // You can modify the Passwords array or update the state, depending on your implementation
        // For example, if using state:
        const updatedFolders = files.filter(folder => folder.id !== folderId);
        setFiles(updatedFolders);
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
                padding="24px 0"
                alignItems="center"
                justifyContent="space-between"
            >
                <BackTransactions />
                <Title margin={width > 600 ? "8px 0px 0px 80px" : "8px 0px 0px 60px"}>

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
                            >

                            </div>
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
                            {
                                files.map((element) => {
                                    return <>
                                        <div style={{ position: "relative", marginTop: "20px" }} key={element.id}>
                                            <div

                                            >
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
                                                                backgroundColor: "#00A6521A",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            <img width="20px" height="20px" src={fileimage} />
                                                        </div>
                                                    </div>
                                                    <Title
                                                        fontSize="22px"
                                                        margin={
                                                            width > 600
                                                                ? "20px 0px 0px 3px"
                                                                : "8px 0px 0px 3px"
                                                        }
                                                        lineHeight="38px"
                                                        fontWeight="600"
                                                        fontFamily="TT Commons"
                                                    >
                                                        {element.title}
                                                    </Title>
                                                    <Paragraph fontSize="14px">
                                                        Edited On <strong> {element.editedon} </strong>
                                                    </Paragraph>
                                                    <Paragraph fontSize="14px" margin="0px 0px 0px 3px">
                                                        Created On <strong> {element.createdon} </strong>

                                                    </Paragraph>

                                                </FolderContainer>
                                            </div>
                                            <OptionsMenu
                                                color="rgba(0, 0, 0, 0.4)"
                                                orientation="horizontal"
                                                options={[
                                                    {
                                                        text: "Open",
                                                        onClick: () => {
                                                            //   navigate(`/documents/folder/${item.id}`);
                                                        },
                                                    },
                                                    {
                                                        text: "Rename",
                                                        onClick: () => {
                                                            console.log(element);
                                                            setNewFileName(element.title);
                                                            setSelectedFile(element);
                                                            setRenameModalOpen(true);

                                                        },

                                                    },
                                                    {
                                                        text: "Delete",
                                                        onClick: () => {
                                                            console.log(element.id);
                                                            handleDeleteFile(element.id);
                                                        }

                                                    },
                                                ]}
                                                position="absolute"
                                            />
                                        </div>

                                    </>
                                })
                            }

                            {/* Folder Box */}





                        </Box>



                    </Box>
                </div>
            </Box>
            {renameModalOpen && (

                <div className="modal">
                    <input
                        type="text"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                    />
                    <button onClick={renameFile}>Rename</button>
                    <button onClick={() => setRenameModalOpen(false)}>Cancel</button>
                </div>

            )}


        </>
    )
}

export default CryptoPassword