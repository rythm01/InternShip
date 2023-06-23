import React, { useContext } from "react";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import {
  Button,
  CheckBox,
  IconButton,
  Image,
  OptionsMenu,
  Paragraph,
  // Row,
  Title,
} from "../../../../components/common";
import {
  AddBuddyModal,
  Table,
  TableBodyRow,
  TableHeadRow,
 
} from "../../../../components/MyBuddies";
import  LimitExistModal from "../../../../components/MyBuddies/LimitExistModal";
import { useModal } from "../../../../context/modal-context";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../../store/actions/auth";
import people from "../../../../assets/images/people.png";
import SignOut from "../../../../assets/images/SignOut.png";
import Group86 from "../../../../assets/images/Group 86.png";
import NotePencil from "../../../../assets/images/NotePencil.png";
import OptionMenuSettings from "../../../../components/common/OptionMenuSettings";
import AlertModal from "../../../../components/common/AlertModal";

import LoadingSpinner from "../../../../components/common/LoadingSpinner";

import styled from "styled-components";
import { AuthContext } from "../../../../context/AuthContext";
import { addBuddyApi, deleteBuddyApi, getBuddiesApi } from "../../../../networks/buddies";
import StorageFullModal from "../Home/StorageFullModal";


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

export default function MyBuddies() {
  const navigate = useNavigate();
  const [buddies, setbuddies] = useState([]);
  const { setModal } = useModal();
  const [selectedBuddies, setSelectedBuddies] = useState({});
  const [checkBox, setCheckBox] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [invitations, setInvitations] = useState([]);

  const [isLoading, setIsLoading] = useState(false)


  const { profile } = useContext(AuthContext)


  useEffect(() => {
    const initialSelectedBuddies = {};
    buddies.forEach(({ id }) => {
      initialSelectedBuddies[id] = false;
    });
    setSelectedBuddies({});
  }, [setSelectedBuddies]);

  // const checkAllBuddiesSelected = () => {
  //   const values = Object.values(selectedBuddies)
  //   for (const value of values) {
  //     if (!value) return false
  //   }
  //   return true
  // }

  const toggleAllBuddies = () => {
    const allBuddies = {};
    buddies.forEach(({ id }) => {
      allBuddies[id] = checkBox;
    });
    setSelectedBuddies(allBuddies);
  };

  useEffect(() => {
    toggleAllBuddies();
  }, [checkBox]);

  const toggleBuddy = (id) => {

  };

  const { t } = useContext(AuthContext)

  const addBuddy = async (email, relation) => {
    const formdata = { email, relation };

    const res = await addBuddyApi(t, formdata);
    if (!res.data.success) return setError(res.data.message)
    setSuccess(true)
    setModal(null)

  }


  useEffect(() => {

    getBuddies()

  }, [success]);


  const getBuddies = async () => {
    setIsLoading(true)
    const res = await getBuddiesApi(t)
    if (!res.data.success) return setError(res.data.message)
    setbuddies(res.data.buddies)
    setInvitations(res.data.invitations)
    setIsLoading(false)
  }


  const HandleDelete = async (type, id) => {

    setIsLoading(true)
    const res = await deleteBuddyApi(t, { type, id })
    if (!res.data.success) return setError(res.data.message)
    setIsLoading(false)
    getBuddies()
  };

  const addNewBuddy = () => {
    if (buddies.length >= 1 || invitations.length >= 1) {
      setModal(
        // <AlertModal
        //   message={"We are currently in beta testing mode once we are live you will be able to add more buddies"}
        //   buttonText={"Sounds good"}
        //   onSubmit={() => {
        //     navigate("/my-buddies");
        //   }}
        // />
        <LimitExistModal></LimitExistModal>
      
     
        
      );
    } else {
      setModal(<AddBuddyModal onSubmit={addBuddy} />);

    }
  };


  if (isLoading) {
    return <LoadingSpinner />
  }


  return (
    <>
      <Row
        width="100% !important"
        height="73px"
        padding="24px 0"
        alignItems="center"
        justifyContent="space-between"
        className="pb-0"
      >
        <Title>My Buddies</Title>

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


      <>
        <Row
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          margin="24px 0 12px"
          className="mt-0"
        >
          <Paragraph bold fontSize="24px" color="#000">
            All Buddies
          </Paragraph>
          <Button
            width="151px"
            height="46px"
            color="#00A652"
            onClick={addNewBuddy}
          >
            + Add new Buddy
          </Button>
        </Row>
        <div className="table_responsive">
          <Table>
            <thead>
              <TableHeadRow>
                <th>
                  <CheckBox
                    checked={checkBox}
                    onChange={() => setCheckBox(!checkBox)}
                  />
                </th>
                <th>Contact Name</th>
                <th>Relation</th>
                <th>Status</th>
                <th>Email</th>
                <th>Buddy Type</th>
              </TableHeadRow>
            </thead>
            <tbody>
              {buddies?.map((item, index) => (
                <TableBodyRow key={index}>
                  <td>
                    <CheckBox
                      checked={selectedBuddies[item.id] === true}
                      onChange={() => toggleBuddy(item.id)}
                    />
                  </td>
                  <td>
                    <Row alignItems="center">
                      {item?.profile_picture && (
                        <Image
                          width="36px"
                          height="36px"
                          borderRadius="50%"
                          objectFit="cover"
                          src={item?.profile_picture}
                          alt="Person"
                        />
                      )}
                      {item?.buddy?.email.split('@')[0] ?? "N/A"}

                    </Row>
                  </td>
                  <td>{item?.relationshipStatus ?? "N/A"}</td>
                  <td>
                    {item?.buddyStatus ?? "N/A"}
                  </td>
                  <td>{item?.buddy?.email ?? "N/A"}</td>
                  <td>
                    {item?.buddyType}
                  </td>
                  <td>

                    <img onClick={() => {
                      HandleDelete('BD', item?.id);
                    }} width={25} src="https://cdn-icons-png.flaticon.com/512/3439/3439691.png" />

                    {/* <OptionsMenu
                      options={[
                        {
                          text: "Delete",
                          onClick: () => {
                            HandleDelete('BD', item?.id);
                          },
                        },
                      ]}
                    /> */}
                  </td>
                </TableBodyRow>
              ))}
              {invitations?.map((item, index) => (
                <TableBodyRow key={index}>
                  <td>
                    <CheckBox
                      checked={selectedBuddies[item.id] === true}
                      onChange={() => toggleBuddy(item.id)}
                    />
                  </td>
                  <td>
                    <Row alignItems="center">
                      {item?.profile_picture && (
                        <Image
                          width="36px"
                          height="36px"
                          borderRadius="50%"
                          objectFit="cover"
                          src={item?.profile_picture}
                          alt="Person"
                        />
                      )}
                      {item?.buddy.split('@')[0] ?? "N/A"}
                    </Row>
                  </td>
                  <td>{item?.relationshipStatus ?? "N/A"}</td>
                  <td>
                    {item?.buddyStatus ?? "N/A"}
                  </td>
                  <td>{item?.buddy ? item?.buddy : "N/A"}</td>
                  <td>
                    {item?.buddyType}
                  </td>
                  <td>
                    <img onClick={() => {
                      HandleDelete('IN', item?.id);
                    }} width={25} src="https://cdn-icons-png.flaticon.com/512/3439/3439691.png" />

                    {/* <OptionsMenu
                      options={[
                        {
                          text: "Delete",
                          onClick: () => {
                            HandleDelete('IN', item?.id);
                          },
                        },
                      ]}
                    /> */}
                  </td>
                </TableBodyRow>
              ))}
            </tbody>
          </Table>
        </div>
      </>
    </>
  );
}
