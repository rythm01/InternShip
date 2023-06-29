import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import data from "./data";
import { Divider } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getBuddiesApi } from "../../networks/buddies";
import { addBuddiesToFilePermissionApi } from "../../networks/filePermission";

function AddPermission() {
  const [isBuddyDropdownOpen, setIsBuddyDropdownOpen] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Access the query parameters
  const type = queryParams.get("type");
  const id = queryParams.get("id");
  const idToUse = queryParams.get("idToUse");

  const handleSelectBuddiesDropdownToggle = () => {
    setIsBuddyDropdownOpen(!isBuddyDropdownOpen);
    setIsTimeDropdownOpen(false);
  };

  const handleSelectTimeDropdownToggle = () => {
    setIsTimeDropdownOpen(!isTimeDropdownOpen);
    setIsBuddyDropdownOpen(false);
  };

  const [updatedData, setUpdatedData] = useState(null);
  const [selectedShareOption, setSelectedShareOption] = useState(null);
  const [selectedBuddy, setSelectedBuddy] = useState(null);

  const handleCheckboxChange = (e, buddy, username) => {
    console.log(buddy, updatedData);
    setSelectedBuddy(buddy);
    const isChecked = e.target.checked;
    const existingData = updatedData.find((item) => item.buddy.id === buddy.id);

    if (existingData) {
      const updatedCheckboxData = updatedData.map((item) => {
        if (item.username === username) {
          return {
            ...item,
            checked: isChecked ? "true" : "false",
          };
        }
        return item;
      });
      setUpdatedData(updatedCheckboxData);
    } else {
      const newPermission = {
        username,
        checked: isChecked ? "true" : "false",
        email: "",
        share: "",
      };
      setUpdatedData([...updatedData, newPermission]);
    }
  };

  const handleRadioChange = (option) => {
    setSelectedShareOption(option);

    const updatedShareData = updatedData.map((item) => {
      if (item.checked === "true") {
        return {
          ...item,
          share: option,
        };
      }
      return item;
    });

    setUpdatedData(updatedShareData);
  };

  useEffect(() => {
    async function getBuddies() {
      const token = localStorage.getItem("token");
      const data = await getBuddiesApi(token);
      setUpdatedData(data.data.buddies);
    }
    getBuddies();
  }, []);

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    console.log(selectedBuddy.id);
    addBuddiesToFilePermissionApi(token, {
      form_type: type,
      [idToUse]: id,
      buddy_ids: [selectedBuddy.id],
    });
    navigate("/home");
  };

  return (
    <>
      {/* <Permission updatedData={updatedData}/> */}
      <Container>
        <div className="container">
          <div className="permissionForm">
            {/* <div
              className="backButton"
              onClick={() => navigate("home/passwords/permission")}
            >
              <ArrowBackIcon color="success" style={{ cursor: "pointer" }} />
            </div> */}
            <div className="permission">
              <h1 className="heading">Add Permissions</h1>
            </div>
            <div className="main">
              <div className="selectBuddies">
                <h4
                  className="heading"
                  style={{ marginBottom: "6px", marginTop: "0" }}
                >
                  Whom do you want to share?
                </h4>
                <div
                  className="dropdown-header"
                  onClick={handleSelectBuddiesDropdownToggle}
                >
                  <span style={{ marginLeft: "20px" }}>Select buddies</span>
                  {isBuddyDropdownOpen ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </div>
                {isBuddyDropdownOpen && (
                  <ul className="option">
                    {updatedData?.map((d, index) => (
                      <li key={index} style={{ listStyle: "none" }}>
                        <input
                          type="checkbox"
                          id={d.buddy.id}
                          name="buddy"
                          checked={d.checked === "true"}
                          onChange={(e) => handleCheckboxChange(e, d.buddy)}
                        />
                        <label htmlFor={d.buddy.email}>{d.buddy.email}</label>
                        <Divider />
                      </li>
                    ))}
                    <li style={{ margin: "9px" }}>Add Buddy</li>
                  </ul>
                )}
              </div>
              <div className="selectTime">
                <h4
                  className="heading"
                  style={{ marginBottom: "6px", marginTop: "0" }}
                >
                  When do you want to share?
                </h4>
                <div
                  className="dropdown-header"
                  onClick={handleSelectTimeDropdownToggle}
                >
                  <span style={{ marginLeft: "20px" }}>Select time period</span>
                  {isTimeDropdownOpen ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </div>
                {isTimeDropdownOpen && (
                  <ul className="option">
                    <li style={{ listStyle: "none" }}>
                      <input
                        type="radio"
                        id="immediate"
                        name="buddy"
                        checked={selectedShareOption === "Immediate Access"}
                        onChange={() => handleRadioChange("Immediate Access")}
                      />
                      <label htmlFor="immediate">Immediate Access</label>
                    </li>
                    <Divider />
                    <li style={{ listStyle: "none" }}>
                      <input
                        type="radio"
                        id="timed"
                        name="buddy"
                        checked={selectedShareOption === "Timed release"}
                        onChange={() => handleRadioChange("Timed release")}
                      />
                      <label htmlFor="immediate">Timed release</label>
                    </li>
                    <Divider />
                    <li style={{ listStyle: "none" }}>
                      <input
                        type="radio"
                        id="unshared"
                        name="buddy"
                        checked={selectedShareOption === "Unshared"}
                        onChange={() => handleRadioChange("Unshared")}
                      />
                      <label htmlFor="immediate">Unshared</label>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            {/* {isTimeDropdownOpen ||
              (isBuddyDropdownOpen && ( */}
            <div onClick={handleSubmit} className="subbutton">
              <button type="submit">Confirm</button>
            </div>
            {/* ))} */}
          </div>
        </div>
      </Container>
    </>
  );
}

export default AddPermission;

const Container = styled.div`
  .container {
    max-width: 900px;
    margin: 10px auto;
    padding: 10px 20px;
    border-radius: 8px;
    font-family: "Poppins", sans-serif;
    input[type="checkbox"],
    input[type="radio"] {
      accent-color: green;
    }
    .permissionForm {
      max-width: 500px;
      width: 50%;
      height: 85vh;
      margin: 10px auto;
      padding: 10px 20px;
      border-radius: 8px;
      .subbutton {
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          padding: 12px 39px;
          color: #fff;
          background-color: #00a652;
          font-size: 18px;
          font-style: normal;
          text-align: center;
          border-radius: 5px;
          width: 382px;
          border: 1px solid #00a652;
          border-width: 1px 1px 3px;
          border-radius: 10px;
          box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
          margin-bottom: 10px;
          font-weight: 600;
          cursor: pointer;
          position: absolute;
          bottom: 25px;
        }
      }
      .subbutton1 {
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          padding: 12px 39px;
          color: #fff;
          background-color: #00a652;
          font-size: 18px;
          font-style: normal;
          text-align: center;
          border-radius: 5px;
          width: 382px;
          border: 1px solid #00a652;
          border-width: 1px 1px 3px;
          border-radius: 10px;
          box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
          margin-bottom: 10px;
          font-weight: 600;
          cursor: pointer;
          position: absolute;
          bottom: 290px;
        }
      }
      .backButton {
        width: 2rem;
        height: 1.8rem;
        background: #fff;
        box-shadow: 2px 2px 26px -1px grey;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        margin: 4px 10px;
      }
      .permission {
        .heading {
          margin: 35px 0 15px 33px;
        }
      }
      .main {
        // border:1px solid black;
        height: 63vh;
        width: 95%;
        margin: 0 0 0 12px;
        .selectBuddies {
          width: 380px;
          margin: auto;
          margin-top: 20px;
          .dropdown-header {
            border: 1px solid grey;
            color: grey;
            border-radius: 8px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          ul.option {
            margin-top: 4px;
            max-height: 150px;
            width: 100%;
            color: grey;
            list-style: none;
            padding: 0;
            overflow: auto;
            text-transform: capitalize;
            border: 1px solid grey;
            border-radius: 8px;
            margin-bottom: 10px;
            &.option::-webkit-scrollbar {
              width: 6px;
            }
            &.option::-webkit-scrollbar-thumb {
              background-color: grey;
            }
            &.option::-webkit-scrollbar-thumb {
              border-radius: 20px;
            }
            input {
              margin: 12px;
            }
          }
        }
        .selectTime {
          width: 380px;
          margin: auto;
          margin-top: 25px;
          .dropdown-header {
            border: 1px solid grey;
            color: grey;
            border-radius: 8px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          ul.option {
            margin-top: 4px;
            height: fit-content;
            width: 100%;
            list-style: none;
            color: grey;
            padding: 0;
            // margin: 0;
            overflow: auto;
            border: 1px solid grey;
            border-radius: 8px;
            margin-bottom: 10px;
            &.option::-webkit-scrollbar {
              width: 6px;
            }
            &.option::-webkit-scrollbar-thumb {
              background-color: grey;
            }
            &.option::-webkit-scrollbar-thumb {
              border-radius: 20px;
            }
            input {
              margin: 12px;
            }
          }
        }
      }
    }
  }
`;
