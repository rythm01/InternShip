import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  CustomLink,
  IconButton,
  InputGroup,
  OptionsMenu,
  Paragraph,
  Title,
} from "../../../../components/common";
import {
  IoEllipsisHorizontalOutline,
  IoNotificationsOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import {
  AddOns,
  FileCount,
  HomeContainer,
  NewFile,
  NewFolder,
  Profile,
} from "../../../../components/Home";
import FolderContainer from "./FolderContainer";
import Modal from "@mui/material/Modal";
import { filesbg, spaceImg } from "../../../../assets/images";
import folder from "../../../../assets/images/folder.png";
import people from "../../../../assets/images/people.png";
import SignOut from "../../../../assets/images/SignOut.png";
import Group86 from "../../../../assets/images/Group 86.png";
import NotePencil from "../../../../assets/images/NotePencil.png";
import { Box } from "@mui/material";
import moment from "moment";
import { useModal } from "../../../../context/modal-context";
import { useNavigate } from "react-router-dom";
import OptionMenuSettings from "../../../../components/common/OptionMenuSettings";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";

import { truncateString } from "../../../../utils/functions";
import { ReactComponent as CrossOutline } from "../../../../assets/images/CrossOutline.svg";
import { PieChart } from "react-minimal-pie-chart";
import FolderRenameModal from "../../../../components/FolderRenameModal";
import styled from "styled-components";
import useWindowSize from "../../../../utils/hook/useWindowSize";
import { AuthContext } from "../../../../context/AuthContext";
import {
  getFolders,
  createFolder,
  deleteFolderApi,
} from "../../../../networks/folders";
import AlertModal from "../../../../components/common/AlertModal";
import {
  getfiles,
  createFile,
  deleteFileData,
} from "../../../../networks/files";
import { getNotificationApi } from "../../../../networks/notifications";
import toast, { Toaster } from "react-hot-toast";
import { getPermission } from "../../../../networks/filePermission";

const style2 = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
  height: "550px",
  width: "669px",
  left: "50%",
  top: "50%",
  borderRadius: "20px",
  backgroundColor: "white",
  outline: "none",
  boxShadow: 30,
  // p: "45px 15px 45px 15px",
};

const PasswordSelectNames = [
  { id: 1, name: "Loan Account Passwords" },
  { id: 2, name: "Passwords (Non Bank Accounts)" },
  { id: 3, name: "Credit Card Account Passwords" },
  { id: 4, name: "Recipe Form" },
  { id: 5, name: "Misc Accounts Passwords" },
  { id: 6, name: "Bank Account Passwords" },
  { id: 7, name: "Merchant Account Passwords" },
];

const Cont = styled.div`
  .dropdown-container {
    position: relative;
    margin: 8px;
    width: 550px;
  }

  .dropdown-header {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    cursor: pointer;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "TT Commons", sans-serif;
    font-size: 20px;
    font-weight: 500;
    line-height: 26px;
    padding: 0px 6px;
    color: black;
    transition: border-color 0.3s ease;
    position: relative;
  }

  .dropdown-header:hover {
    border-color: rgba(0, 0, 0, 0.5);
  }

  .dropdown-options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 6px;
    list-style: none;
    max-height: 200px;
    overflow-y: auto;
    z-index: 999;
  }

  .dropdown-option {
    cursor: pointer;
    text-align: center;
    padding: 6px;
    color: rgba(0, 0, 0, 0.5);
    transition: background-color 0.3s ease;
  }

  .dropdown-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #000000;
  }

  .dropdown-option:hover {
    background-color: #00a652;
  }

  .dropdown-option:last-child {
    margin-bottom: 0;
  }

  .dropdown-option:active {
    background-color: #00a652;
  }

  .dropdown-option:focus {
    outline: none;
  }

  .dropdown-option[selected="true"] {
    background-color: #00a652;
    color: #fff;
  }

  .dropdown-option[selected="true"]:hover {
    background-color: #00a652;
  }

  .dropdown-option[selected="true"]:active {
    background-color: #00a652;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent};
  height: ${(props) => props.height ?? "100%"};
  /* overflow: ${(props) => props.overflow ?? "auto"}; */
  /* flex-basis: ${(props) => props.width}; */
  width: ${(props) => props.width ?? "0"};
  flex-grow: 0;
  flex-shrink: 0;
  padding: ${(props) => props.padding ?? "0"};
  margin: ${(props) => props.margin ?? "0"};
  box-sizing: border-box;
  ${(props) =>
    props.hideScrollBar ? "::-webkit-scrollbar {display: none;}" : ""};
`;

const Image = styled.img`
  width: ${(props) => props.width ?? "-webkit-fill-available"};
  height: ${(props) => props.height};
  object-fit: ${(props) => props.objectFit ?? "contain"};
  margin: ${(props) => props.margin ?? "5px"};
  border-radius: ${(props) => props.borderRadius};

  @media (max-width: 1200px) {
    width: -webkit-fill-available;
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  border-raduis: ${(props) => props.borderRaduis};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  gap: ${(props) => props.gap};
  ${(props) => props.link && "cursor:pointer;"}/* @media (max-width:400px) {
    width: 245px !important;
  } */
`;

export default function Home() {
  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const { setModal } = useModal();
  const [loading, setLoading] = useState(false);
  const [field, setfield] = useState("");
  const [isRenameModalOpen, toggleRenameModal] = useState(false);
  const [folderToRename, setFolderToRename] = useState({});
  const [pdfcount, setpdfcount] = useState(0);
  const [pngcount, setpngcount] = useState(0);
  const [jpegCount, setJpegCount] = useState(0);
  const [otherFilesCount, setOtherFilesCount] = useState(0);
  const [filesData, setFilesData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notification, setNotifications] = useState([]);
  const [isUplaod, setIsUpload] = useState(false);

  const [folders, setFolders] = useState([]);

  const { profile, t, setRefresh, refresh } = useContext(AuthContext);

  const HandleCreateFolder = async () => {
    // console.log(field)
    if (!field) return toast.error("Please enter folder name");
    const data = {
      name: field,
    };
    setLoading(true);
    const res = await createFolder(t, data);
    setLoading(false);
    if (!res.data.success) return toast.error(res.data.message);
    setfield("");
    setopen(false);
    getFolderData();
  };

  const handleOptionSelect = (option) => {
    navigate(`/home/password-type-form?form=${option.id}`);
    setDropdownOpen(false);
  };

  const getFolderData = async () => {
    setLoading(true);
    const res = await getFolders(t);
    if (!res.data.success) return toast.error(res.data.message);

    const allFoldersWithoutRoot = res.data.data.filter(
      (folder) => folder.name !== "root"
    );

    setFolders(allFoldersWithoutRoot);
    setLoading(false);
  };

  const getfileData = async () => {
    setLoading(true);
    const res = await getfiles(t);
    setLoading(false);
    if (!res.data.success) return toast.error(res.data.message);
    const fileData = [...res.data?.data, ...res?.data?.allowedFile];
    setFilesData(fileData);
    const pdf = fileData?.filter(
      (file) => file.ext === "pdf" || file.ext === "PDF"
    );
    const png = fileData?.filter(
      (file) => file.ext === "png" || file.ext === "PNG"
    );
    const jpeg = fileData?.filter(
      (file) =>
        file.ext === "jpeg" ||
        file.ext === "jpg" ||
        file.ext === "JPEG" ||
        file.ext === "JPG"
    );
    const otherFiles = fileData?.filter(
      (file) =>
        file.ext !== "pdf" &&
        file.ext !== "png" &&
        file.ext !== "jpeg" &&
        file.ext !== "jpg" &&
        file.ext !== "PDF" &&
        file.ext !== "PNG" &&
        file.ext !== "JPEG" &&
        file.ext !== "JPG"
    );
    setpdfcount(pdf?.length);
    setpngcount(png?.length);
    setJpegCount(jpeg?.length);
    setOtherFilesCount(otherFiles?.length);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getNotification = async () => {
    setLoading(true);
    const res = await getNotificationApi(t);
    if (!res.data.success) return toast.error(res.data.message);
    setLoading(false);
    return setNotifications(res.data.data);
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
  const Folders = folders?.slice(0, 5);
  const ThreeFilesRecords = filesData?.slice(0, 3);
  const fileCountData = [
    { color: "#DFF9EC", count: pdfcount ? pdfcount : 0, type: "PDF Files" },
    { color: "#FDF1CD", count: pngcount ? pngcount : 0, type: "PNG Files" },
    { color: "#FEEBE1", count: jpegCount ? jpegCount : 0, type: "JPEG Files" },
    {
      color: "#E3EEFF",
      count: otherFilesCount ? otherFilesCount : 0,
      type: "Other Files",
    },
  ];
  const postFile = async (fileToUpload) => {
    if (profile.storageLeft < fileToUpload.size / 1024) {
      return setModal(
        <AlertModal
          message={"You have reached your storage limit."}
          buttonText={"Sounds good"}
          onSubmit={() => {
            navigate("/home");
          }}
        />
      );
    }

    const formData = new FormData();
    formData.append("file", fileToUpload);
    setLoading(true);
    const res = await createFile(t, formData);
    if (!res.data.success) return toast.error(res.data.message);
    getfileData();
    getFolderData();
    setRefresh(!refresh);
    setLoading(false);
  };

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("profile"))?.verficationPeriod)
      return navigate("/home/create-profile");
    getFolderData();
    getfileData();
    getNotification();
  }, [profile]);

  const deleteFolder = async (folder) => {
    const res = await deleteFolderApi(t, folder);
    if (!res.data.success) {
      return toast.error(res.data.message);
    }
    getFolderData();
  };

  const renameFolder = (id) => {
    setFolderToRename(id);
    toggleRenameModal(true);
  };

  const { width } = useWindowSize();

  const { logout } = useContext(AuthContext);

  if (loading) {
    return <LoadingSpinner />;
  }
  //delete file function
  const deleteFile = async (fileId) => {
    setLoading(true);

    const res = await deleteFileData(t, fileId);
    if (!res.data.success) return toast.error(res.data.message);
    getfileData();
    getFolderData();
    setRefresh(!refresh);
    setLoading(false);
  };

  return (
    <>
      <Toaster />
      <Row
        width="100%"
        height="100%"
        padding="24px 0"
        alignItems="center"
        justifyContent="space-between"
        className="flex_column"
      >
        <div
          onClick={() => {
            navigate("/home/edit-profile");
          }}
          className="welcome_flex"
        >
          <Paragraph color="#000">Welcome, 👋</Paragraph>
          <Title className="title">
            {profile?.userAuth?.name ? profile?.userAuth.name : "Antor P."}
          </Title>
        </div>

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
                  //logout functionality should be here
                  logout();
                  // window.location.href = "https://sandsvault.io";
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
            <IoNotificationsOutline size={20} />
          </IconButton>

          <Profile user={profile} />
        </Row>
      </Row>

      <Row
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        gap="20px"
        className="column_1"
      >
        <Column width="70%" className="width-100 h-unset">
          <Row
            className="grid_file"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            gap="10px"
          >
            {fileCountData.map((value, index) => (
              <FileCount
                key={index}
                color={value.color}
                count={value.count}
                type={value.type}
              />
            ))}
          </Row>

          <Row
            justifyContent="space-between"
            width="100%"
            gap={width > 768 ? "20px" : "0px"}
            className="column_2"
          >
            <HomeContainer
              title="Uploaded Folders"
              width="60%"
              height="349px"
              className="width-100-2"
              onViewAll={() => navigate("/home/documents")}
            >
              <Box
                width="100%"
                height="auto"
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    width < 600 ? "repeat(2,1fr)" : "repeat(2,1fr)",
                  gridGap: "1rem",
                  padding: "10px",
                }}
              >
                {Folders.map((item, index) => {
                  if (index < 3) {
                    return (
                      <div
                        key={`folder-${index}`}
                        style={{ position: "relative" }}
                      >
                        <div
                          onClick={() =>
                            navigate(`documents/folder/${item.id}`)
                          }
                        >
                          <FolderContainer
                            key={index}
                            width="100%"
                            height="95px"
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
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "50%",
                                  backgroundColor: "#ffeeea",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img width="10px" height="10px" src={folder} />
                              </div>
                            </div>
                            <Title fontSize="14px" margin="10px 0px 0px 3px">
                              {item.name.split("|")[0]}
                            </Title>
                            <Paragraph fontSize="12px" margin="3px 0px 0px 3px">
                              {item.files?.length} file
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
                                navigate(`documents/folder/${item.id}`);
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
                  }
                })}
                <NewFolder onChange="" setopen={setopen} />
              </Box>
            </HomeContainer>

            <HomeContainer
              isViewAll={false}
              title="Uploaded Files"
              className="width-100-2"
              width="40%"
              height="349px"
            >
              <Box width="100%">
                {ThreeFilesRecords?.map((item, i) => {
                  return (
                    <div style={{ width: "100%" }} key={i}>
                      <Box
                        flexDirection="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        padding="10px"
                        borderRadius="0px"
                        style={{ margin: "5px 0" }}
                      >
                        <div
                          style={{
                            width: "inherit",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div width="100%" style={{ display: "flex" }}>
                            <div
                              style={{
                                width: "55px",
                                height: "40px",
                                borderRadius: "9px",
                                backgroundColor: "rgba(0, 166, 82, 0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <IoDocumentTextOutline
                                style={{}}
                                color="#00A652"
                              />
                            </div>
                            <div
                              style={{
                                width: "100%",
                                height: "40px",
                                margin: "0px 0px 0px 10px",
                                display: "flex",
                                alignItems: "flex-start",
                                flexDirection: "column",
                              }}
                            >
                              <Title fontSize="14px">
                                {truncateString(item.name.split("|")[1], 20)}
                              </Title>
                              <Paragraph fontSize="12px">
                                Uploaded on :{" "}
                                {moment(item.createdAt).format("L")}{" "}
                              </Paragraph>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              margin: "0px 10px 0px 0px",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                                paddingRight: "10px",
                              }}
                            >
                              <OptionsMenu
                                color="rgba(0, 0, 0, 0.4)"
                                orientation="horizontal"
                                options={[
                                  {
                                    text: "Open",
                                    onClick: () => {
                                      navigate(`documents/folder/${item.id}`);
                                    },
                                  },

                                  {
                                    text: "Delete",
                                    onClick: () => {
                                      deleteFile(item.id);
                                    },
                                  },
                                ]}
                              />
                            </div>
                          </div>
                        </div>
                      </Box>
                      <div
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.03)",
                          width: "100%",
                          height: "1px",
                        }}
                      />
                    </div>
                  );
                })}
              </Box>
              <div className="modal-forgot">
                <Modal
                  open={isUplaod}
                  onClose={() => setIsUpload(false)}
                  keepMounted
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <Box style={style2}>
                    <Title
                      fontSize="1.7rem"
                      fontWeight="700"
                      margin="20px auto 0 25px"
                    >
                      Select Information Type
                    </Title>
                    <CrossOutline
                      style={{
                        position: "absolute",
                        right: 20,
                        top: 10,
                        cursor: "pointer",
                      }}
                      onClick={() => setIsUpload(false)}
                    />
                    <Box
                      sx={{
                        width: "92%",
                        p: 3,
                        m: 3,
                        borderRadius: "20px",
                      }}
                    >
                      <Row
                        alignItems="center"
                        border="1px solid black"
                        borderRadius="10px"
                      >
                        <Button
                          width="100%"
                          height="60px"
                          color="white"
                          textColor="black"
                        >
                          <label
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "1px solid rgba(0,0,0,0.5)",
                              borderRadius: "10px",
                            }}
                          >
                            <input
                              accept=".pdf,.doc,.docx,.xls,.xlsx"
                              type="file"
                              onClick={(e) => {
                                e.target.value = null;
                              }}
                              onChange={(e) => {
                                setIsUpload(false);
                                postFile(e.target.files[0]);
                              }}
                            />
                            Document
                          </label>
                        </Button>
                      </Row>
                      <Row alignItems="center">
                        <Button
                          width="100%"
                          height="60px"
                          color="white"
                          borderRadius="10px"
                          textColor="black"
                          border="1px solid rgba(0, 0, 0, 0.5);"
                        >
                          <label
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "1px solid rgba(0,0,0,0.5)",
                              borderRadius: "10px",
                            }}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              onClick={(e) => {
                                e.target.value = null;
                              }}
                              onChange={(e) => {
                                setIsUpload(false);
                                postFile(e.target.files[0]);
                              }}
                            />
                            Photo
                          </label>
                        </Button>
                      </Row>
                      <Row alignItems="center">
                        <Cont>
                          <div className="dropdown-container">
                            <div
                              className="dropdown-header"
                              onClick={toggleDropdown}
                            >
                              {selectedOption
                                ? selectedOption.name
                                : "Select Password Type"}
                              {/* <FontAwesomeIcon
                                icon={faChevronDown}
                                className="dropdown-icon"
                              /> */}
                            </div>
                            {dropdownOpen && (
                              <ul className="dropdown-options">
                                {PasswordSelectNames.map((option) => (
                                  <li
                                    key={option.id}
                                    className="dropdown-option"
                                    onClick={() => handleOptionSelect(option)}
                                    onChange={(e) => {
                                      navigate(
                                        `/password-type-form?form=${e.id}`
                                      );
                                    }}
                                  >
                                    {option.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </Cont>
                      </Row>
                      <Row alignItems="center">
                        <Button
                          width="100%"
                          height="60px"
                          color="white"
                          borderRadius="10px"
                          textColor="black"
                          border="1px solid rgba(0, 0, 0, 0.5);"
                        >
                          <label
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "1px solid rgba(0,0,0,0.5)",
                              borderRadius: "10px",
                            }}
                          >
                            <input
                              type="file"
                              accept="video/*"
                              onClick={(e) => {
                                e.target.value = null;
                              }}
                              onChange={(e) => {
                                setIsUpload(false);
                                postFile(e.target.files[0]);
                              }}
                            />
                            Video
                          </label>
                        </Button>
                      </Row>
                      <Row alignItems="center">
                        <Button
                          width="100%"
                          height="60px"
                          color="white"
                          textColor="black"
                          borderRadius="10px"
                          border="1px solid rgba(0, 0, 0, 0.5);"
                        >
                          <label
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "1px solid rgba(0,0,0,0.5)",
                              borderRadius: "10px",
                            }}
                          >
                            <input
                              type="file"
                              onClick={(e) => {
                                e.target.value = null;
                              }}
                              onChange={(e) => {
                                setIsUpload(false);
                                postFile(e.target.files[0]);
                              }}
                            />
                            Upload From device
                          </label>
                        </Button>
                      </Row>
                    </Box>
                  </Box>
                </Modal>
              </div>

              <NewFile>
                <label
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.target.value = null;
                    setIsUpload(!isUplaod);
                  }}
                >
                  + Upload new File
                </label>
              </NewFile>
            </HomeContainer>
          </Row>
        </Column>

        <Column width="30%" className="width-100 h-unset">
          <HomeContainer
            width="93%"
            height="290px"
            alignItems="start"
            padding="20px"
            className="width-100"
          >
            <Title fontSize="22px">Storage Capacity</Title>
            <PieChart
              viewBoxSize={[154, 154]}
              center={[77, 77]}
              totalValue={100}
              data={[
                {
                  title: "Used",
                  value: `${
                    profile
                      ? ((parseFloat(profile.storage) -
                          parseFloat(profile.storageLeft)) /
                          parseFloat(profile.storage)) *
                        100
                      : 70
                  }`,
                  color: "#FBBC05",
                },
                {
                  title: "Free Space",
                  value: `${
                    profile
                      ? (parseFloat(profile.storageLeft) /
                          parseFloat(profile.storage)) *
                        100
                      : 30
                  }`,
                  color: "#1877f2",
                },
              ]}
              labelPosition={90}
              label={({ x, y, dx, dy, dataEntry }) => {
                return (
                  <g fill="#fff">
                    <circle
                      cx={x + dx}
                      cy={y + dy}
                      r={12}
                      fill="white"
                      style={{
                        stroke: "black",
                        strokeWidth: "1",
                        strokeOpacity: "0.1",
                      }}
                    ></circle>
                    <text
                      x={x}
                      y={y}
                      dx={dx}
                      dy={dy}
                      fill="#000"
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{
                        fontWeight: 600,
                        fontSize: "10px",
                        textAlign: "center",
                        textAnchor: "center",
                        fontFamily: "TT Commons",
                      }}
                    >{`${Math.round(dataEntry.value)}%`}</text>
                  </g>
                );
              }}
            />
            <Row alignItems="center" justifyContent="space-around" width="100%">
              <Row alignItems="center">
                <div
                  style={{
                    backgroundColor: "#FBBC05",
                    height: 12,
                    width: 12,
                    borderRadius: 100,
                    marginRight: 4,
                  }}
                />
                <Title fontSize="12px" fontWeight="400">
                  Used
                </Title>
              </Row>
              <Row alignItems="center">
                <div
                  style={{
                    backgroundColor: "#1877F2",
                    height: 12,
                    width: 12,
                    borderRadius: 100,
                    marginRight: 4,
                  }}
                />
                <Title fontSize="12px" fontWeight="400">
                  Free Space
                </Title>
              </Row>
            </Row>
          </HomeContainer>

          <HomeContainer
            className="width-100"
            width="93%"
            height="546px"
            title="Recent Activity"
          ></HomeContainer>
        </Column>
      </Row>
      <Modal
        open={open}
        onClose={() => setopen(false)}
        keepMounted
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box style={style} className="modal">
          <Title fontSize="1.7rem" fontWeight="700" margin="16px auto 0 25px">
            Create New Folder
          </Title>
          <CrossOutline
            style={{
              position: "absolute",
              right: 20,
              top: 10,
              cursor: "pointer",
            }}
            onClick={() => setopen(false)}
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
              onChange={(e) => setfield(e.target.value)}
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

      <FolderRenameModal
        open={isRenameModalOpen}
        close={() => {
          toggleRenameModal(false);
          setFolderToRename({});
          getFolderData();
        }}
        folder={folderToRename}
      />
    </>
  );
}
