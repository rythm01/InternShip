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
import BackTransactions from "../../../TransactionsPaymentHistory/BackTransactions";
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

export default function Documents() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isRenameModalOpen, toggleRenameModal] = useState(false);
  const [folderToRename, setFolderToRename] = useState({});
  const [allFolders, setAllFolders] = useState([]);

  const [field, setField] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [iFrameOpen, setIFrameOpen] = useState(false);
  const [iFrameFileID, setIFrameFileID] = useState(null);

  const { t, logout } = useContext(AuthContext);

  useEffect(() => {
    getAllFolders();
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
      return toast.error(res.data.message);
    }
    setField("");
    setOpen(false);
    getAllFolders();
  };

  const deleteFolder = async (id) => {
    const res = await deleteFolderApi(t, id);
    if (!res.data.success) {
      return toast.error(res.data.message);
    }
    getAllFolders();
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
        <Title margin={width > 600 ? "8px 0px 0px 80px" : "8px 0px 0px 60px"}>
          Uploaded Documents
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
      {!Boolean(allFolders?.length) && (
        <Row justifyContent="flex-end">
          <Button
            width="143px"
            height="46px"
            color="#00A652"
            onClick={() => setOpen(true)}
          >
            + Create New Folder
          </Button>
        </Row>
      )}
      {!Boolean(allFolders?.length) ? (
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
                >
                  <Button
                    width="150px"
                    height="46px"
                    color="#00A652"
                    margin="0"
                    onClick={() => setOpen(true)}
                  >
                    + New Folder
                  </Button>

                  {/* <Row>
                    <ShareWith />
                  </Row> */}
                </div>
              </Row>

              <h2
                style={{
                  margin: "0.5em 0em",
                }}
              >
                Folders
              </h2>
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
                {allFolders?.map((item, index) => {
                  return (
                    <div
                      style={{ position: "relative", marginTop: "20px" }}
                      key={item.id}
                    >
                      <div
                        onClick={() => navigate(`/documents/folder/${item.id}`)}
                      >
                        <FolderContainer
                          key={index}
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
                                backgroundColor: "#ffeeea",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <img width="14px" height="14px" src={folder} />
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
                            {item.name.split("|")[0]}
                          </Title>
                          <Paragraph fontSize="16px" margin="10px 0px 0px 3px">
                            {item?.files?.length} file
                          </Paragraph>{" "}
                        </FolderContainer>
                      </div>
                      <OptionsMenu
                        color="rgba(0, 0, 0, 0.4)"
                        orientation="horizontal"
                        options={[
                          {
                            text: "Open",
                            onClick: () => {
                              navigate(`/documents/folder/${item.id}`);
                            },
                          },
                          {
                            text: "Rename",
                            onClick: () => {
                              renameFolder(item);
                            },
                          },
                          {
                            text: "Delete",
                            onClick: () => {
                              deleteFolder(item.id);
                            },
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
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        keepMounted
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box style={style} className="modal">
          <Title fontWeight="700" margin="16px auto 0 25px">
            Create New Folder
          </Title>
          <CrossOutline
            style={{
              width: width < 600 && "30px",
              height: width < 600 && "30px",
              position: "absolute",
              right: 20,
              top: 10,
              cursor: "pointer",
            }}
            onClick={() => setOpen(false)}
          />

          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              p: 3,
              m: 3,
              borderRadius: "20px",
            }}
          >
            <InputGroup
              width="545px"
              label="Title"
              placeholder="Type here"
              value={field}
              onChange={(e) => setField(e.target.value)}
            />

            <Row justifyContent="flex-end">
              <Button
                width="151px"
                height="50px"
                color="#00A652"
                onClick={HandleCreateFolder}
              >
                Create
              </Button>
            </Row>
          </Box>
        </Box>
      </Modal>
      {/* <IframeModal
        url={iFrameFileID}
        open={iFrameOpen}
        close={() => {
          setIFrameOpen(false);
        }}
      /> */}
      <FolderRenameModal
        open={isRenameModalOpen}
        close={() => {
          setIsLoading(false);
          getAllFolders();
          toggleRenameModal(false);
          setFolderToRename({});
        }}
        folder={folderToRename}
      />
    </>
  );
}
