import React, { useState, useEffect, useMemo } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/modal-context";
import { Paragraph } from "../../common";
import AddOnsModal from "../AddOnsModal";
import Container from "./Container";
import Coupon from "./Coupon";
import PlanButton from "./PlanButton";
import PlanFeature from "./PlanFeature";
import PlanFeatures from "./PlanFeatures";
import PlanHeader from "./PlanHeader";
import PlanName from "./PlanName";
import PlanPrice from "./PlanPrice";
import { useSelector } from "react-redux";

export default function Plan({
  plan: {
    id: planId,
    nickname: name,
    unit_amount,
    currency,
    color,
    availableFeatureCount,
    payment,
    height,
  },
  videos,
  storages,
  interval,
  monthly,
}) {
  const navigate = useNavigate();
  const [price, setPrice] = useState(unit_amount);
  const [coupon, setCoupon] = useState("");
  const { setModal, unSetModal } = useModal();
  const user = useSelector((state) => state.reducer.auth.user);

  useEffect(() => {
    setPrice(unit_amount);
    return () => setCoupon("");
  }, [unit_amount]);

  const subscribe = useMemo(() => {
    if (user && user.subscription) {
      return user.subscription.items.find((item) => {
        if (item.plan.nickname.includes("package") && item.plan.id === planId) {
          return item;
        } else {
          return;
        }
      });
    }
  }, [user, interval, monthly]);

  const swapId = useMemo(() => {
    if (user.subscription) {
      return user.subscription.items.find((id) => {
        if (id.plan.nickname.includes("package")) {
          return id;
        }
      });
    }
  }, [user, interval, monthly]);

  const checkCoupon = (c) => {
    setCoupon(c);
    const timeout = setTimeout(() => {
      if (c === "12345") {
        setPrice(unit_amount - (unit_amount * 50) / 100);
        clearTimeout(timeout);
      } else {
        setPrice(unit_amount);
      }
    }, 1000 * 1);
  };

  const choosePlan = () => {
    navigate("/subscriptions/payment", {
      state: {
        plan: {
          id: planId,
          nickname: name,
          unit_amount: price,
          currency,
          color,
          availableFeatureCount,
          swapId: swapId ? swapId.id : "",
        },
      },
    });
  };

  const choosePlanSubscried = () => {
    window.alert("plan already Subscribed");
  };

  const viewAddon = () => {
    setModal(
      <AddOnsModal
        storages={storages}
        videos={videos}
        nickname={name}
        subscription={price}
        currency={currency}
        color={color}
        availableFeatureCount={availableFeatureCount}
        buy={buyAddon}
      />
    );
  };

  const buyAddon = ({ storage, video }) => {
    unSetModal();
    navigate("/subscriptions/payment", {
      state: {
        plan: {
          id: planId,
          nickname: name,
          unit_amount: price,
          currency,
          color,
          availableFeatureCount,
          swapId: swapId ? swapId.id : "",
        },
        storage,
        video,
      },
    });
  };

  return (
    <Container
      style={{ height: height ? height : "606px", width: "100%", flex: 1 }}
    >
      <PlanHeader>
        <PlanName color={color}>{name}</PlanName>
        <PlanPrice>
          {currency}
          {price}
        </PlanPrice>
        <Paragraph width="" color="#000">
          For single membership
        </Paragraph>
      </PlanHeader>

      <PlanFeatures width="100%" height="152px">
        {[...Array(4)].map((v, i) => (
          <PlanFeature key={i} active={availableFeatureCount >= i + 1}>
            <IoCheckmarkCircleOutline
              size="20px"
              color="#00A652"
              style={{ marginRight: "5px" }}
            />
            Feature Name will be here
          </PlanFeature>
        ))}
      </PlanFeatures>

      {!payment && (
        <>
          <Coupon
            placeholder="Coupon Code"
            value={coupon}
            onChange={(e) => checkCoupon(e.target.value)}
          />
          {!subscribe && (
            <PlanButton onClick={choosePlan}>Choose plan</PlanButton>
          )}
          {subscribe && (
            <PlanButton
              background="#00A652"
              color="#fff"
              border="none"
              onClick={choosePlanSubscried}
            >
              Subscribed
            </PlanButton>
          )}
          <Paragraph bold link color="#00A652" onClick={viewAddon}>
            View Add-ons
          </Paragraph>
        </>
      )}
    </Container>
  );
}
