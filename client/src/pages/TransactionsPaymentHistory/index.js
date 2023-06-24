import React, { useContext } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { Title, IconButton, OptionsMenu } from "../../components/common";
import { Profile } from "../../components/Home";
import { Grid } from "@mui/material";
import BackTransactions from "./BackTransactions";
import { Table } from "../../components/MyBuddies";
import { useNavigate } from "react-router-dom";
import OptionMenuSettings from "../../components/common/OptionMenuSettings";
import people from "../../assets/images/people.png";
import SignOut from "../../assets/images/SignOut.png";
import Group86 from "../../assets/images/Group 86.png";
import NotePencil from "../../assets/images/NotePencil.png";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import moment from "moment";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";

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

const TransactionsPaymentHistory = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [transactionHistory, setTransactionHistory] = React.useState([]);
  const { logout, profile } = useContext(AuthContext)


  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Row
        width="100%"
        height="73px"
        padding="24px 0"
        alignItems="center"
        justifyContent="space-between"
        className="flex_column"
      >
        <Row>
          <BackTransactions />
          <Title fontWeight="650" margin="14px 0px 0px 80px">
            My Transactions
          </Title>
        </Row>
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
        alignItems="center"
        justifyContent="flex-start"
        margin="60px 0px 20px 0px"
      >
        <Title fontWeight="650" fontSize="20px">
          Payment History
        </Title>
      </Row>
      {/* <Table>
                <thead>
                    <TableHeadRow>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                    </TableHeadRow>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <TableBodyRow key={index}>
                            <td>{item.name}</td>
                            <td>{item.summary}</td>
                            <td>{item.time}</td>
                            <td>
                                <OptionsMenu
                                    options={[
                                        { text: "Get email invoice", onClick: () => { } },
                                        { text: "Get receipt", onClick: () => { } }
                                    ]}
                                />
                            </td>
                        </TableBodyRow>
                    ))}
                </tbody>
            </Table> */}
      <Table>
        <Grid
          container
          fontWeight="400"
          fontFamily="TT Commons"
          color="#00000080"
          padding="18px"
          fontSize="16px"
          textAlign="left"
        >
          <Grid item={true} lg={4}>
            Date
          </Grid>
          <Grid item={true} lg={4}>
            Type
          </Grid>
          <Grid item={true} lg={4}>
            Amount
          </Grid>
          <Grid item={true} lg={4}></Grid>
        </Grid>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.03)",
            width: "100%",
            height: "2px",
          }}
        />
      </Table>
      <Table borderRadius="0px">
        {transactionHistory?.data?.map((item, index) => (
          <>
            {console.log("item", item.currency)}
            <Grid
              container
              flexDirection="row"
              alignItems="center"
              height="50px"
            >
              <Grid
                item
                lg={3.9}
                fontWeight="400"
                fontFamily="TT Commons"
                color="#000000"
                paddingLeft="15px"
                fontSize="16px"
              >
                {moment(item.charges.data[0].created).format("L")} a
              </Grid>
              <Grid
                item
                lg={3.9}
                fontWeight="400"
                fontFamily="TT Commons"
                color="#000000"
                paddingLeft="15px"
                fontSize="16px"
              >
                {item.charges.data[0].payment_method_details.type} a
              </Grid>
              <Grid
                item
                lg={3.7}
                fontWeight="400"
                fontFamily="TT Commons"
                color="#000000"
                paddingLeft="15px"
                fontSize="16px"
              >
                {item.amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: item.currency,
                })}
              </Grid>
              <Grid item lg={0.5}>
                <OptionsMenu
                  options={[
                    { text: "Get email invoice", onClick: () => { } },
                    { text: "Get receipt", onClick: () => { } },
                  ]}
                />
              </Grid>
            </Grid>
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.03)",
                width: "100%",
                height: "2px",
              }}
            />
          </>
        ))}
        <>
          {/* {console.log("item", item.currency)} */}
          <Grid container flexDirection="row" alignItems="center" height="50px">
            <Grid
              item
              lg={3.9}
              fontWeight="400"
              fontFamily="TT Commons"
              color="#000000"
              paddingLeft="15px"
              fontSize="16px"
            >
              {/* {moment(item.charges.data[0].created).format("L")} */}a
            </Grid>
            <Grid
              item
              lg={3.9}
              fontWeight="400"
              fontFamily="TT Commons"
              color="#000000"
              paddingLeft="15px"
              fontSize="16px"
            >
              {/* {item.charges.data[0].payment_method_details.type} */}a
            </Grid>
            <Grid
              item
              lg={3.7}
              fontWeight="400"
              fontFamily="TT Commons"
              color="#000000"
              paddingLeft="15px"
              fontSize="16px"
            >
              {/* {item.amount.toLocaleString("en-US", {
                style: "currency",
                currency: item.currency,
              })} */}{" "}
              aa
            </Grid>
            <Grid item lg={0.5}>
              <OptionsMenu
                options={[
                  { text: "Get email invoice", onClick: () => { } },
                  { text: "Get receipt", onClick: () => { } },
                ]}
              />
            </Grid>
          </Grid>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.03)",
              width: "100%",
              height: "2px",
            }}
          />
        </>
      </Table>
    </>
  );
};

export default TransactionsPaymentHistory;
