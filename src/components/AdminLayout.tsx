import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Layout } from "antd";
import Sidebar from "./Sidebar.tsx";
import Navbar from "./Navbar.tsx";
import useAuth from "../hooks/useAuth.ts";

const { Content } = Layout;

export default function AdminLayout() {
  // const { userLoggedIn, userType } = useAuth() as AuthContextType;
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const { userLoggedIn } = useAuth();
  const navgiate = useNavigate();

  React.useEffect(() => {
    if (!userLoggedIn && pathname !== "/login") {
      navgiate(`/login?prevRouter=${pathname}`);
    }
  }, [userLoggedIn, pathname]);

  if (!userLoggedIn) {
    return null;
  }
  return (
    <Layout>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="m-5 rounded-2xl shadow-lg p-5">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
