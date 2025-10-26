import React, { Suspense, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Layout } from "antd";
import Sidebar from "./Sidebar.tsx";
import Navbar from "./Navbar.tsx";
import useAuth from "../hooks/useAuth.ts";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";

const { Content } = Layout;

export default function AdminLayout() {
  // const { userLoggedIn, userType } = useAuth() as AuthContextType;
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const userAuth = useAuth();
  const navgiate = useNavigate();

  React.useEffect(() => {
    if (!userAuth.userLoggedIn && pathname !== "/login") {
      navgiate(`/login?prevRouter=${pathname}`);
    }
  }, [userAuth.userLoggedIn, pathname]);

  if (!userAuth.userLoggedIn) {
    return null;
  }
  return (
    <Layout>
      <ErrorBoundary>
        <Suspense fallback={<h1>Loading User Profile...</h1>}>
          <Sidebar collapsed={collapsed} />
          <Layout>
            <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Content className="m-5 rounded-2xl shadow-lg p-5">
              <Outlet />
            </Content>
          </Layout>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}
