import React, { useState, useMemo, useRef, useContext, useEffect } from "react";
import {
  IoDocumentTextOutline,
  IoNotificationsOutline,
  IoMusicalNoteOutline,
  IoImageOutline,
  IoDocumentOutline,
} from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import {
  Column,
  IconButton,
  OptionsMenu,
  Paragraph,
  Row,
  Title,
} from "../../components/common";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import files from "../../assets/images/files.png";
import BackTransactions from "../TransactionsPaymentHistory/BackTransactions/DocumentBack";
import { Box, Stack } from "@mui/material";
import FolderContainer from "../Layout/pages/Home/FolderContainer";
import { NewFile } from "../../components/Home";
import { useModal } from "../../context/modal-context";
import AlertModal from "../../components/common/AlertModal";
import ShareWith from "../../components/common/ShareWith";
import useWindowSize from "../../utils/hook/useWindowSize";
// import
import { getFolder } from "../../networks/folders";
import { AuthContext } from "../../context/AuthContext";
import { createFile, deleteFileData } from "../../networks/files";
import { getBuddiesApi } from "../../networks/buddies";
import FileModal from "../../components/common/FileModal";
import toast, { Toaster } from "react-hot-toast";

export default function Folder() {
  const navigate = useNavigate();
  const params = useParams();
  const inputFile = useRef(null);
  const { width } = useWindowSize();
  const { setModal } = useModal();

  const [folder, setFolder] = useState({});
  const [selectedFileId, setSelectedFileId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [buddies, setBuddies] = useState([]);

  const { t, profile } = useContext(AuthContext);

  //upload file function
  const uploadFiles = async ({ file, folderId }) => {
    if (profile.storageLeft < file.size / 1024) {
      return setModal(
        <AlertModal
          message={"You have reached your storage limit."}
          buttonText={"Sounds good"}
          onSubmit={() => {
            navigate("/home/documents");
          }}
        />
      );
    }

    setIsFileUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderId", folderId);
    const res = await createFile(t, formData);
    if (!res.data.success) return toast.error(res.data.message);
    getFolderDetails();
    setIsFileUploading(false);
  };

  const getAllBuddies = async () => {
    setIsLoading(true);
    const allBuddies = await getBuddiesApi(t);
    const allAcceptedBuddy = allBuddies.data.buddies.filter(
      (buddy) => buddy.buddyStatus === "accepted"
    );
    setBuddies(allAcceptedBuddy);
    setIsLoading(false);
  };

  //delete file function
  const deleteFile = async (fileId) => {
    setIsLoading(true);

    const res = await deleteFileData(t, fileId);
    if (!res.data.success) return toast.error(res.data.message);
    getFolderDetails();
    setSelectedFileId(null);
    setIsLoading(false);
  };

  //get buddies function
  const getBuddiesData = async () => {
    const res = await getBuddiesApi(t);
    if (!res.data.success) return toast.error(res.data.message);
    setBuddies(res.data.data);
  };

  //get folder details function
  const getFolderDetails = async () => {
    setIsLoading(true);
    const res = await getFolder(t, params.id);
    if (!res.data.success) return toast.error(res.data.message);
    setFolder(res.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getFolderDetails();
    getAllBuddies();
  }, [t]);

  const addRandomPortion = (array1, array2) => {
    for (var i = 0; i < array2?.length; i++) {
      var sliceLength = Math.floor(Math.random() * (array1?.length - 1));
      var start = Math.floor(Math.random() * (array1?.length - sliceLength));
      var end = start + sliceLength;
      var sharedWith = array1.slice(start, end);
      array2[i].sharedWith = sharedWith;
    }
    return array2;
  };

  const folderDetails = useMemo(() => {
    if (!folder?.files) return {};
    return {
      ...folder,
      files: addRandomPortion(
        buddies,
        Object.assign(
          [],
          folder.files.map((file) => ({ ...file }))
        )
      ),
    };
  }, [folder]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const makeFileCopy = async (item) => {
    console.log("file to copy", item);
    // uploadFiles({file, folderId: folder.id});
  };

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
        <Title margin="0px 0px 0px 80px">
          Folders {">"} {folder?.name?.split("|")[0]}
        </Title>
        {/* <Row>
          <OptionMenuSettings
            options={[
              { Icon: people, text: "My Buddies", onClick: () => { navigate('/home/my-buddies') } },
              { Icon: Group86, text: "My transactions", onClick: () => { navigate('/home/transactions') } },
              { Icon: NotePencil, text: "Send Feedback", onClick: () => { navigate('/home/send/feedback')} },
              {
                Icon: SignOut, text: "Logout", onClick: () => {
                  dispatch(logout())
                  // window.location.href = "https://sandsvault.io"
                  navigate("/");
                }
              }
            ]}
          />
          <IconButton onClick={() => { navigate('/home/notifications') }}>
            <IoNotificationsOutline />
          </IconButton>
        </Row> */}
      </Row>
      <Stack
        style={{ marginBottom: "20px" }}
        alignItems={width < 600 ? "center" : "flex-end"}
      >
        <NewFile
          style={{
            padding: "10px 20px",
            marginLeft: "auto",
            marginRight: "0",
          }}
          onClick={() => inputFile.current.click()}
          position={"static"}
          width={width < 600 ? "50%" : "30%"}
        >
          + Upload new File
          <input
            type="file"
            onClick={(e) => {
              e.target.value = null;
            }}
            onChange={(e) => {
              uploadFiles({
                file: e.target.files[0],
                folderId: folderDetails.id,
              }).then((res) => console.log("upload file", res));
            }}
            ref={inputFile}
            style={{ display: "none" }}
          />
        </NewFile>
      </Stack>
      <Stack
        direction={width > 600 ? "row" : "column"}
        style={{ display: width > 600 && "flex", width: "100%" }}
      >
        <Box
          width={width > 600 ? "70%" : "100%"}
          marginRight={width > 600 && "30px"}
          height="auto"
        >
          <Box
            sx={{
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
            {Boolean(folderDetails.files?.length) &&
              folderDetails.files.map((item, index) => {
                return (
                  <FolderContainer
                    style={{ width: width < 400 ? "50%" : "100%" }}
                    key={index}
                    width="100%"
                    height="150px"
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    borderRadius="15px"
                    isSelected={selectedFileId === item.id}
                    onClick={() => setSelectedFileId(item.id)}
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
                              navigate("/home/documents/file/" + item.id);
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
                    <Row alignItems={"center"} margin="15px">
                      {item.ext.toLowerCase().includes("pdf") ? (
                        <IoDocumentTextOutline color="#00A652" size="24px" />
                      ) : item.ext
                          .toLowerCase()
                          .includes("jpeg" || "jpg" || "png" || "webp") ? (
                        <IoImageOutline color="#FF5F5F" size="24px" />
                      ) : item.ext.toLowerCase().includes("mp3" || "wav") ? (
                        <IoMusicalNoteOutline color="#1877F2" size="24px" />
                      ) : (
                        <IoDocumentOutline color="#00A652" size="24px" />
                      )}
                      <Title fontSize="16px" margin="0px 10px">
                        {item.name.split("|")[1]}
                      </Title>
                    </Row>
                  </FolderContainer>
                );
              })}
          </Box>
          {isFileUploading ? (
            <FileLoading />
          ) : (
            <>
              {!Boolean(folderDetails.files?.length) && (
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "80vh",
                  }}
                >
                  <img src={files} height={"240px"} width={"240px"} />
                  <Paragraph margin={"10px 0px"}>No Files are here.</Paragraph>
                </div>
              )}
            </>
          )}
        </Box>
        {/* {selectedFileId ? (
          <Box
            minWidth="300px"
            width={width > 600 ? "300px" : "100%"}
            marginTop={width <= 600 && "50px"}
          >
            <Box
              style={{ marginLeft: "auto", minWidth: "30%" }}
              justifyContent="flex-end"   
            >
              {
                <ShareWith
                  details={folderDetails.files.find(
                    (file) => file.id === selectedFileId
                  )}
                />
              }
            </Box>
          </Box>
        ) : null} */}
        {/* <FolderRenameModal
          open={true}
          close={() => {
            setIsLoading(false)
            getAllFolders();
            toggleRenameModal(false);
            setFolderToRename({});
          }}
          folder={folderToRename}
        /> */}
      </Stack>
    </>
  );
}

const FileLoading = () => {
  return (
    <FolderContainer
      width="150px"
      height="150px"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding="10px"
      margin="10px"
      borderRadius="15px"
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <IoDocumentOutline color="#00A652" size="18px" />
        <Title fontSize="12px" margin="0px 10px">
          Uploading...
        </Title>
      </div>
    </FolderContainer>
  );
};
