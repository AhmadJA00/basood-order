import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { MdOutlineContactPhone, MdWork } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { Layout } from "antd";
import useAuth from "../hooks/useAuth";

type MenuItem = Required<MenuProps>["items"][number];

type SidebarProps = {
  collapsed: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const { Sider } = Layout;
  const { userLoggedIn, signOut } = useAuth();

  // const { userLoggedIn } = useAuth();
  const { t } = useTranslation();

  const logout = async () => {
    if (userLoggedIn) {
      await signOut();
      navigate("/login");
    }
  };
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    // if (!userLoggedIn) {
    //   return;
    // }
    switch (key) {
      case "branches":
        navigate("branches");
        break;
      case "cities":
        navigate("cities");
        break;
      case "logout":
        logout();
        break;
    }
  };

  const items: MenuItem[] = [
    {
      key: "branches",
      label: t("branches"),
      icon: <MdWork />,
    },
    {
      key: "cities",
      label: t("cities"),
      icon: <MdWork />,
    },

    {
      key: "logout",
      icon: <CgLogOut />,
      label: t("logout"),
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        background: "var(--color-background-nav)",
      }}
      className="!min-w-[250px]"
    >
      <Menu
        className="border-none min-h-screen"
        style={{
          background: "var(--color-background-nav)",
        }}
        defaultSelectedKeys={["business"]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleMenuClick}
        theme="light"
      />
    </Sider>
  );
};

export default Sidebar;
