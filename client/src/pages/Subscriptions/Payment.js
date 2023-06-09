import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Back,
  Button,
  Container,
  Divider,
  InputGroup,
  Label,
  Page,
  Paragraph,
  Row,
  Title,
  CheckBox,
} from "../../components/common";
import styled from "styled-components";
import {
  useAddCardMutation,
  useAddSwapSubscriptionMutation,
  useGetAllCardsQuery,
  useGetMyProfileQuery,
  useSubscribePlanMutation,
  useAddAddOnsMutation,
} from "../../store/slice/api";
import Select from "react-select";
import { components } from "react-select";
import Success from "./Success";
import Error from "./Error";
import PlanHeader from "../../components/Subscriptions/Plan/PlanHeader";
import PlanName from "../../components/Subscriptions/Plan/PlanName";
import PlanPrice from "../../components/Subscriptions/Plan/PlanPrice";
import PlanFeatures from "../../components/Subscriptions/Plan/PlanFeatures";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import PlanFeature from "../../components/Subscriptions/Plan/PlanFeature";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { getProfile } from "../../store/slice/mainSlice";
import useWindowSize from "../../utils/hook/useWindowSize";
import { Box, Stack } from "@mui/material";
const Text = styled.span`
  font-family: "TT Commons";
  font-style: "normal";
  font-size: 20px;
  color: black;
  margin: auto 0;
  font-weight: 600;
  line-height: 30px;
`;

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <CheckBox
          text={props.label}
          onChange={() => null}
          checked={props.isSelected}
        />
      </components.Option>
    </div>
  );
};

const Payment = () => {
  const {
    state: { plan, storage, video },
  } = useLocation();

  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [paymentAlreadyDone, setPaymentAlreadyDone] = useState();
  const [successPage, setSuccessPage] = useState(false);
  const [errorPage, setErrorPage] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { data: myProfile } = useGetMyProfileQuery();
  const [addCard, { isLoading: addingCard }] = useAddCardMutation();
  const [swapSubscription] = useAddSwapSubscriptionMutation();
  const [addAddOns] = useAddAddOnsMutation();
  const [addSubscription, { isLoading: subscribing }] =
    useSubscribePlanMutation();
  const { data: allCards, error, isLoading, isSuccess } = useGetAllCardsQuery();
  console.log("plan", plan.swapId);
  console.log("storage", storage);
  console.log("video", video);

  const invalidateProfile = () => {
    const user = myProfile.results[0];
    dispatch(getProfile(user));
  };

  const handleSubmit = async () => {
    const card = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
      billing_details: {
        name: name,
      },
    });
    if (error) {
      console.log("[error]", error);
      alert(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      addCard(paymentMethod?.id)
        .unwrap()
        .then((resp) => {
          console.log("success", resp);
          const subscriptionData = {
            payment_method: resp.data[0].id,
            plan_ids: [{ plan: plan.id }],
          };

          if (storage) {
            subscriptionData.plan_ids.push({ plan: storage.id });
          }
          if (video) {
            subscriptionData.plan_ids.push({ plan: video.id });
          }
          if (plan.swapId) {
            swapSubscription([{ id: plan.swapId, price: plan.id }])
              .unwrap()
              .then((resp) => {
                invalidateProfile();
                setSuccessPage(true);
              })
              .catch((error) => {
                if (error.data.detail === "User is already subscribed") {
                  setPaymentAlreadyDone(error.data.detail);
                }
                setErrorPage(true);
                console.log("error", error);
              });
            return;
          } else {
            addSubscription(subscriptionData)
              .unwrap()
              .then((resp) => {
                setSuccessPage(true);
              })
              .catch((error) => {
                if (error.data.detail === "User is already subscribed") {
                  setPaymentAlreadyDone(error.data.detail);
                }
                setErrorPage(true);
                console.log("error", error);
              });
          }
        })
        .catch((error) => {
          console.log("error", error);
          alert(JSON.stringify(error));
        });
      // ... SEND to your API server to process payment intent
    }
  };

  const handleSwap = () => {
    swapSubscription([{ id: plan.swapId, price: plan.id }])
      .unwrap()
      .then((resp) => {
        setSuccessPage(true);
      })
      .catch((error) => {
        if (error.data.detail === "User is already subscribed") {
          setPaymentAlreadyDone(error.data.detail);
        }
        setErrorPage(true);
        console.log("error", error);
      });
  };

  const handleConfirm = () => {
    if (plan.swapId && video && storage) {
      handleSwap();
      addAddOns(video.id)
        .unwrap()
        .then((resp) => {
          addAddOns(storage.id)
            .unwrap()
            .then((resp) => {
              setSuccessPage(true);
            })
            .catch((err) => {
              console.log(
                "You cannot subscribe to a plan with a different billing interval"
              );
              window.alert(
                "You cannot subscribe to a plan with a different billing interval"
              );
            });
        })
        .catch((err) => {
          console.log(
            "You cannot subscribe to a plan with a different billing interval"
          );
          window.alert(
            "You cannot subscribe to a plan with a different billing interval"
          );
        });
    } else if (plan.swapId && storage) {
      handleSwap();
      addAddOns(storage.id)
        .unwrap()
        .then((resp) => {
          setSuccessPage(true);
        })
        .catch((err) => {
          console.log(
            "You cannot subscribe to a plan with a different billing interval"
          );
          window.alert(
            "You cannot subscribe to a plan with a different billing interval"
          );
        });
    } else if (plan.swapId && video) {
      handleSwap();
      addAddOns(video.id)
        .unwrap()
        .then((resp) => {
          setSuccessPage(true);
        })
        .catch((err) => {
          console.log(
            "You cannot subscribe to a plan with a different billing interval"
          );
          window.alert(
            "You cannot subscribe to a plan with a different billing interval"
          );
        });
    } else if (plan.swapId) {
      handleSwap();
    } else {
      const subscriptionData = {
        payment_method: card.value,
        plan_ids: [{ plan: plan.id }],
      };

      if (storage) {
        subscriptionData.plan_ids.push({ plan: storage.id });
      }

      if (video) {
        subscriptionData.plan_ids.push({ plan: video.id });
      }
      addSubscription(subscriptionData)
        .unwrap()
        .then((resp) => {
          setSuccessPage(true);
        })
        .catch((error) => {
          if (error.data.detail === "User is already subscribed") {
            setPaymentAlreadyDone(error.data.detail);
          }
          setErrorPage(true);
          console.log("error", error);
        });
    }
  };

  const option = useMemo(() => {
    if (allCards?.data) {
      return allCards.data.map((items) => ({
        value: items.id,
        label: `**** **** **** ${items.card.last4}`,
      }));
    }
  }, [allCards]);

  const getCard = useMemo(() => {
    if (allCards?.data && card) {
      return allCards?.data.filter((items) => {
        if (items.id === card.value) {
          return items;
        }
      });
    }
  }, [allCards, card]);

  useEffect(() => {
    if (allCards?.data) {
      // items?.metadata && items?.metadata?.default === 'True'
      allCards.data.map((items) => {
        if (items?.metadata && items?.metadata?.default === "True") {
          setCard({
            value: items.id,
            label: `**** **** **** ${items.card.last4}`,
          });
        } else {
          setCard({
            value: allCards?.data[0].id,
            label: `**** **** **** ${allCards?.data[0].card.last4}`,
          });
        }
      });
    }
  }, [allCards]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderRadius: "10px",
      borderColor: "#292D3233",
      height: "80px",
      padding: "0px 6px",
      fontfamily: "TT Commons",
      fontSize: "16px",
      lineHeight: "26px",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: "#00A652",
      },
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
      "&:hover": {
        backgroundColor: "#00A652",
      },
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      fontFamily: "TT Commons",
      fontSize: "18px",
    }),
  };

  const handleError = () => {
    setErrorPage(false);
  };

  const { width } = useWindowSize();

  if (addingCard || subscribing) {
    return <LoadingSpinner height="100vh" />;
  }

  if (successPage) {
    return <Success />;
  }

  if (errorPage) {
    return (
      <Error
        handleError={handleError}
        paymentAlreadyDone={paymentAlreadyDone}
      />
    );
  }

  return (
    <>
      <Page justifyContent={width < 900 && "flex-start"}>
        <Container margin="69px auto" justifyContent="flex-start" width="80%">
          <Title
            fontWeight="700"
            margin={width < 900 ? "10px auto 10px" : "46px auto 40px"}
          >
            Payment
          </Title>
          <Box
            display="flex"
            flexDirection={width < 900 && "column"}
            justifyContent="space-between"
            width={width <= 600 ? "90vw" : "60vw"}
          >
            <Box
              borderRadius="20px"
              justifyContent="flex-start"
              alignItems="center"
              padding={"20px"}
              height="410px"
              marginRight={width >= 900 && "60px"}
              style={{
                boxShadow: "0 2px 10px 1px #0000000d",
                maxWidth: width < 900 && "320px",
                margin: width < 900 && "20px auto",
              }}
            >
              <PlanHeader>
                <PlanName color={plan.color}>{plan.nickname}</PlanName>
                <PlanPrice>
                  {plan.currency}
                  {plan.unit_amount}
                </PlanPrice>
                <Paragraph width="" color="#000">
                  For single membership
                </Paragraph>
              </PlanHeader>

              <PlanFeatures width="279px" height="152px">
                {[...Array(4)].map((v, i) => (
                  <PlanFeature
                    key={i}
                    active={plan.availableFeatureCount >= i + 1}
                  >
                    <IoCheckmarkCircleOutline
                      size="20px"
                      color="#00A652"
                      style={{ marginRight: "5px" }}
                    />
                    Feature Name will be here
                  </PlanFeature>
                ))}
              </PlanFeatures>
            </Box>
            <Box flex={1}>
              <Box
                display="flex"
                justifyContent="space-between"
                direction="row"
                margin="5px 0"
              >
                <Text>Subscription</Text>
                <Text>
                  {plan.currency}
                  {plan.unit_amount}
                </Text>
              </Box>
              <Box display="flex" justifyContent="space-between" margin="5px 0">
                <Text>Additional space</Text>
                <Text>
                  {storage ? `${storage.currency}${storage.unit_amount}` : "$0"}
                </Text>
              </Box>
              <Box display="flex" justifyContent="space-between" margin="5x 0">
                <Text>Subscription</Text>
                <Text>
                  {video ? `${video.currency}${video.unit_amount}` : "$0"}
                </Text>
              </Box>
              <hr
                style={{
                  width: "100%",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                }}
              />
              <Box display="flex" justifyContent="space-between" margin="5x 0">
                <Text>Total</Text>
                <Text>
                  {plan.currency}
                  {plan.unit_amount +
                    (storage ? storage.unit_amount : 0) +
                    (video ? video.unit_amount : 0)}
                </Text>
              </Box>
              {!Boolean(allCards?.data.length) && (
                <Row justifyContent="flex-start" margin="5x 0">
                  <h1
                    style={{
                      fontFamily: "TT Commons",
                      fontWeight: "600",
                      fontSize: "24px",
                      lineHeight: "42px",
                      color: "#000000",
                    }}
                  >
                    Add Payment Method
                  </h1>
                </Row>
              )}
              {Boolean(allCards?.data.length > 1) && (
                <Row justifyContent="space-between" margin="5px 0">
                  <div
                    style={{
                      display: "block",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <Row justifyContent="space-between">
                      <Label>Select Card</Label>
                    </Row>
                    {option && (
                      <Select
                        height="50px"
                        placeholder="Select the card"
                        value={card}
                        styles={customStyles}
                        onChange={(e) => {
                          setCard(e);
                        }}
                        options={option}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{
                          Option,
                        }}
                      />
                    )}
                  </div>
                </Row>
              )}
              <Box justifyContent="flex-start" margin="5x 0">
                {Boolean(allCards?.data.length) ? (
                  <InputGroup
                    width="100%"
                    label="Card Number"
                    placeholder={`${card.label}`}
                    type="text"
                    disabled={true}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "8px 0",
                    }}
                  >
                    <Label>Card Number</Label>
                    <div
                      id="card-number-container"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 8,
                        border: "1px solid",
                        borderColor: "#292D3233",
                        borderRadius: 10,
                        backgroundColor: "#fff",
                        padding: "0 14px",
                        width: "100%",
                        height: 75,
                      }}
                    >
                      <div style={{ width: "100%" }}>
                        <CardNumberElement
                          onFocus={() => {
                            document.querySelector(
                              "#card-number-container"
                            ).style.transition = "0.25s";
                            document.querySelector(
                              "#card-number-container"
                            ).style.borderColor = "#00A652";
                          }}
                          onBlur={() => {
                            document.querySelector(
                              "#card-number-container"
                            ).style.borderColor = "#292D3233";
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Box>
              <Box
                display="flex"
                flexDirection={width <= 600 && "column"}
                justifyContent="space-between"
                margin="5x 0"
              >
                {Boolean(allCards?.data.length) ? (
                  <>
                    <Box flex={1} marginRight={width >= 600 && "20px"}>
                      <InputGroup
                        width="100%"
                        style={{ width: "100% !important", flex: 1 }}
                        label="Card Expiration Date"
                        placeholder={
                          getCard &&
                          `${getCard[0]?.card.exp_month} / ${String(
                            getCard[0]?.card.exp_year
                          ).slice(-2)}`
                        }
                        type="text"
                        disabled={true}
                      />
                    </Box>
                    <InputGroup
                      label="CVC"
                      placeholder="****"
                      type="text"
                      width={width < 900 ? "50px" : "100px"}
                      disabled={true}
                    />
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "8px 0",
                        width: width < 900 ? "50px" : "100px",
                      }}
                    >
                      <Label>Card Expiration Date </Label>
                      <div
                        id="card-expiry-container"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: 8,
                          border: "solid 1px #292D3233",
                          borderRadius: 10,
                          backgroundColor: "#fff",
                          padding: "0 14px",
                          height: 75,
                          width: width < 900 ? "50px" : "100px",
                        }}
                      >
                        <div style={{ width: "100%" }}>
                          <CardExpiryElement
                            onFocus={() => {
                              document.querySelector(
                                "#card-expiry-container"
                              ).style.transition = "0.25s";
                              document.querySelector(
                                "#card-expiry-container"
                              ).style.borderColor = "#00A652";
                            }}
                            onBlur={() => {
                              document.querySelector(
                                "#card-expiry-container"
                              ).style.borderColor = "#292D3233";
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "8px 0",
                        width: width < 900 ? "50px" : "100px",
                      }}
                    >
                      <Label>CVC</Label>
                      <div
                        id="card-cvc-container"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: 8,
                          border: "solid 1px #292D3233",
                          borderRadius: 10,
                          backgroundColor: "#fff",
                          padding: "0 14px",
                          height: 75,
                          width: width < 900 ? "50px" : "100px",
                        }}
                      >
                        <div style={{ width: "100%" }}>
                          <CardCvcElement
                            onFocus={() => {
                              document.querySelector(
                                "#card-cvc-container"
                              ).style.transition = "0.25s";
                              document.querySelector(
                                "#card-cvc-container"
                              ).style.borderColor = "#00A652";
                            }}
                            onBlur={() => {
                              document.querySelector(
                                "#card-cvc-container"
                              ).style.borderColor = "#292D3233";
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Box>
              <Box justifyContent="flex-start" margin="5x 0">
                {Boolean(allCards?.data.length) ? (
                  <InputGroup
                    width="100%"
                    label="Cardholder Name"
                    placeholder="Anthon Paul"
                    type="text"
                    disabled={true}
                  />
                ) : (
                  <InputGroup
                    width="100%"
                    label="Cardholder Name"
                    placeholder="Anthon Paul"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
              </Box>
              {/* items?.metadata && items?.metadata?.default === 'True' */}
              <Row justifyContent="flex-end">
                {Boolean(allCards?.data.length) ? (
                  <Button
                    color="#00A652"
                    width="190px"
                    onClick={() => handleConfirm()}
                  >
                    Confirm
                  </Button>
                ) : (
                  <Button
                    color="#00A652"
                    onClick={() => handleSubmit()}
                    width="190px"
                  >
                    Add Card
                  </Button>
                )}
              </Row>
            </Box>
          </Box>
          <Back />
        </Container>
      </Page>
    </>
  );
};

export default Payment;
