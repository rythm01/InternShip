import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../../assets/images/Logo.svg";

import Brand from "../Brand";
import SidebarItem from "./SidebarItem";
import { IoLogOutOutline } from "react-icons/io5";
import routes from "./routes";
import SidebarContainer from "./SidebarContainer";
import useDevice from "../../../utils/hook/mediaQuery";
import useWindowSize from "../../../utils/hook/useWindowSize";
import { AuthContext } from "../../../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();


  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    //add logout function
    logout();
    window.location.href = "https://sandsvault.io"
  };

  const { width } = useWindowSize();

  return (
    <SidebarContainer>
      {width > 600 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "start",
            // margin: "56px 0 auto 0",
            overflow: "hidden",
            marginLeft: "15px",
          }}
        >
          {<Logo className="logo_width" />}
          {width > 800 && <Brand>S & S Vault</Brand>}
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: width < 600 ? "row" : "column",
          alignItems: width > 600 && "start",
          justifyContent: width <= 600 && "space-around",
          width: width <= 600 && "100%",
          alignSelf: width > 600 && "start",
          margin: width > 600 && "56px 0 auto 0",
          overflow: "hidden",
        }}
      >
        {routes.map((route, index) => (
          <SidebarItem
            key={index}
            active={location.pathname === route.pathname}
            {...route}
          />
        ))}
        {width <= 600 && (
          <SidebarItem
            name="Logout"
            Icon={IoLogOutOutline}
            onClick={handleLogout}
          />
        )}
      </div>
      {width > 600 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            alignSelf: "start",
            margin: "auto 0 0",
            overflow: "hidden",
          }}
        >
          <SidebarItem
            name="Logout"
            Icon={IoLogOutOutline}
            onClick={handleLogout}
          />
        </div>
      )}
    </SidebarContainer>
  );
}
