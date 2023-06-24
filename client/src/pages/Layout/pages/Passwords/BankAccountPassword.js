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
import {
  createFolder,
  deleteFolderApi,
  getFolders,
} from "../../../../networks/folders";
import { getBuddiesApi } from "../../../../networks/buddies";
import Files from "./FilesStaticData";
import fileimage from "../../../../assets/images/file1.png";
import moment from "moment";
import {
  deleteBankAccountForm,
  getBankAccountForm,
} from "../../../../networks/passwordTypeForms";
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

const BankAccountPassword = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isRenameModalOpen, toggleRenameModal] = useState(false);
  const [folderToRename, setFolderToRename] = useState({});
  const [allFolders, setAllFolders] = useState([]);
  const [allBankForms, setAllBankForms] = useState([]);
  const [field, setField] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [iFrameOpen, setIFrameOpen] = useState(false);
  const [iFrameFileID, setIFrameFileID] = useState(null);

  const { t, logout } = useContext(AuthContext);

  useEffect(() => {
    getAllFolders();
    getBankAccountForm(t)
      .then((res) => setAllBankForms(res?.data?.data))
      .catch((e) => toast.error("Something Went wrong"));
  }, [t]);

  const getAllFolders = async () => {
    setIsLoading(true);
    const allFolders = await getFolders(t);
    const allFoldersWithoutRoot = allFolders.data.data.filter(
      (folder) => folder.name !== "root"
    );
    setAllFolders(allFoldersWithoutRoot);
    setIsLoading(false);
  };

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

  const renameFolder = (folder) => {
    setFolderToRename(folder);
    toggleRenameModal(true);
  };

  const HandleCreateFolder = async () => {
    // console.log(field)

    const res = await createFolder(t, { name: field });
    if (!res.data.success) {
      return alert(res.data.message);
    }

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

    // const renameFile = () => {
    //   console.log("Rename");

    //   const updatedFiles = files.map((file) => {
    //     if (file.id === selectedFile.id) {
    //       return {
    //         ...file,
    //         title: newFileName,
    //       };
    //     }
    //     return file;
    //   });
    //   setFiles(updatedFiles);

    //   setRenameModalOpen(false); // Close the modal
    // };

    // const handleDeleteFile = (folderId) => {
    //   console.log("Handle Delete Folder");
    //   // Implement the logic to delete the folder based on the folderId
    //   // You can modify the Passwords array or update the state, depending on your implementation
    //   // For example, if using state:
    //   const updatedFolders = files.filter((folder) => folder.id !== folderId);
    //   setFiles(updatedFolders);
    // };
    if (isLoading) {
      return <LoadingSpinner />;
    }
    setField("");
    setOpen(false);
    getAllFolders();
  };

  const deleteFolder = async (id) => {
    const res = await deleteFolderApi(t, id);
    if (!res.data.success) {
      return alert(res.data.message);
    }
    getAllFolders();
  };

  const deleteAccount = async (id) => {
    try {
      setIsLoading(true);
      await deleteBankAccountForm(t, id);
      getBankAccountForm(t)
        .then((res) => setAllBankForms(res?.data?.data))
        .catch((e) => toast.error("Something Went wrong"));
      setIsLoading(false);
      toast.success("Successfull");
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong");
    }
  };

  const { width } = useWindowSize();

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
        <Title
          margin={width > 600 ? "8px 0px 0px 80px" : "8px 0px 0px 60px"}
        ></Title>

        <Row>
          <OptionMenuSettings
            options={[
              {
                Icon: people,
                text: "My Buddies",
                onClick: () => {
                  navigate("/my-buddies");
                },
              },

              {
                Icon: people,
                text: "Profile",
                onClick: () => {
                  navigate("/edit-profile");
                },
              },
              {
                Icon: SignOut,
                text: "Logout",
                onClick: () => {
                  window.location.href = "https://sandsvault.io";
                },
              },
            ]}
          />
          <IconButton
            onClick={() => {
              navigate("/notifications");
            }}
          >
            <IoNotificationsOutline />
          </IconButton>
        </Row>
      </Row>

      {!Boolean(allBankForms?.length) ? (
        <>
          <Row height="100vh">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                marginTop: width <= 600 && "-40px",
              }}
            >
              <div style={{ width: "160px", height: "160px" }}>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src={File}
                />
              </div>
              <div className="text-center">
                <h1
                  style={{
                    fontFamily: "TT Commons",
                    fontWeight: 400,
                    fontSize: "24px",
                    marginTop: "30px",
                  }}
                >
                  Uploaded file will be displayed here
                </h1>
              </div>
            </div>
          </Row>
        </>
      ) : (
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
                {allBankForms?.map((element) => {
                  return (
                    <>
                      <div
                        style={{ position: "relative", marginTop: "20px" }}
                        key={element.id}
                      >
                        <div
                        // onClick={() =>
                        //     navigate(`${element.navigate}`)
                        // }
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
                                <img
                                  width="20px"
                                  height="20px"
                                  src={fileimage}
                                />
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
                              textTransform="capitalize"
                            >
                              {element?.account_nick_name}
                            </Title>
                            <Paragraph fontSize="14px">
                              Edited On{" "}
                              <strong>
                                {" "}
                                {moment(element?.updatedAt).format(
                                  "DD MMM YYYY"
                                )}{" "}
                              </strong>
                            </Paragraph>
                            <Paragraph fontSize="14px" margin="0px 0px 0px 3px">
                              Created On{" "}
                              <strong>
                                {" "}
                                {moment(element?.createdAt).format(
                                  "DD MMM YYYY"
                                )}{" "}
                              </strong>
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
                                navigate(
                                  `/password-type-form?form=6&id=${element.id}`
                                );
                              },
                            },
                            {
                              text: "Delete",
                              onClick: () => deleteAccount(element?.id),
                            },
                          ]}
                          position="absolute"
                        />
                      </div>
                    </>
                  );
                })}

                {/* Folder Box */}
              </Box>
            </Box>
          </div>
        </Box>
      )}
    </>
  );
};

export default BankAccountPassword;
