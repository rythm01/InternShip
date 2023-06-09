import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Column, Page, Sidebar } from "../../components/common";
import { AuthContext } from "../../context/AuthContext";

export default function Index() {


  const { t } = useContext(AuthContext)



  if (!t) {
    return <Navigate to={'/login'} />
  }
  return (
    <Page row>
      <Sidebar />
      <Column width="1170px" margin="0 auto" hideScrollBar>
        <Outlet />
      </Column>
    </Page>
  );
}
