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
      case "business":
        navigate("business");
        break;
      case "appliedBusinesses":
        navigate("business/applied");
        break;
      case "franchise":
        navigate("franchise");
        break;
      case "appliedFranchises":
        navigate("franchise/applied");
        break;
      case "lookingForInvestor":
        navigate("lookingForInvestor");
        break;
      case "appliedInvestors":
        navigate("lookingForInvestor/applied");
        break;
      case "lookingForIdea":
        navigate("lookingForIdea");
        break;
      case "appliedIdeas":
        navigate("lookingForIdea/applied");
        break;
      case "commercials":
        navigate("commercials");
        break;
      case "appliedCommercials":
        navigate("commercials/applied");
        break;
      case "primumBusinesses":
        navigate("primumBusinesses");
        break;
      case "primumFranchises":
        navigate("primumFranchises");
        break;
      case "primumCountries":
        navigate("primumCountries");
        break;
      case "primumCategories":
        navigate("primumCategories");
        break;
      case "businessConsultingsEn":
        navigate("businessConsultingsEn");
        break;
      case "businessConsultingsKu":
        navigate("businessConsultingsKu");
        break;
      case "businessConsultingsAr":
        navigate("businessConsultingsAr");
        break;
      case "aboutUs":
        navigate("aboutUs");
        break;
      case "contactUs":
        navigate("contactUs");
        break;
      case "brokers":
        navigate("brokers");
        break;
      case "logout":
        logout();
        break;
    }
  };

  const items: MenuItem[] = [
    {
      key: "business",
      label: t("businesses"),
      icon: <MdWork />,
      children: [
        {
          key: "business",
          icon: <MdWork />,
          label: t("businesses"),
        },
        {
          key: "appliedBusinesses",
          icon: <MdOutlineContactPhone />,
          label: t("appliedBusinesses"),
        },
      ],
    },
    {
      key: "franchise",
      label: t("franchises"),
      icon: <MdWork />,
      children: [
        {
          key: "franchise",
          icon: <MdWork />,
          label: t("franchises"),
        },
        {
          key: "appliedFranchises",
          icon: <MdOutlineContactPhone />,
          label: t("appliedFranchises"),
        },
      ],
    },
    {
      key: "commercials",
      icon: <MdWork />,
      label: t("commercials"),
      children: [
        {
          key: "commercials",
          icon: <MdWork />,
          label: t("commercials"),
        },
        {
          key: "appliedCommercials",
          icon: <MdOutlineContactPhone />,
          label: t("appliedCommercials"),
        },
      ],
    },
    {
      key: "lookingForInvestor",
      icon: <MdWork />,
      label: t("investors"),
      children: [
        {
          key: "lookingForInvestor",
          icon: <MdWork />,
          label: t("investors"),
        },
        {
          key: "appliedInvestors",
          icon: <MdOutlineContactPhone />,
          label: t("appliedInvestors"),
        },
      ],
    },

    {
      key: "lookingForIdea",
      icon: <MdWork />,
      label: t("ideas"),
      children: [
        {
          key: "lookingForIdea",
          icon: <MdWork />,
          label: t("ideas"),
        },
        {
          key: "appliedIdeas",
          icon: <MdOutlineContactPhone />,
          label: t("appliedIdeas"),
        },
      ],
    },
    {
      key: "primumSliders",
      icon: <MdWork />,
      label: t("primumSliders"),
      children: [
        {
          key: "primumBusinesses",
          icon: <MdWork />,
          label: t("primumBusinesses"),
        },
        {
          key: "primumFranchises",
          icon: <MdWork />,
          label: t("primumFranchises"),
        },
        {
          key: "primumCountries",
          icon: <MdWork />,
          label: t("primumCountries"),
        },
        {
          key: "primumCategories",
          icon: <MdWork />,
          label: t("primumCategories"),
        },
      ],
    },
    {
      key: "businessConsultings",
      icon: <MdWork />,
      label: t("businessConsultings"),
      children: [
        {
          key: "businessConsultingsEn",
          icon: <MdWork />,
          label: t("english"),
        },
        {
          key: "businessConsultingsKu",
          icon: <MdWork />,
          label: t("kurdish"),
        },
        {
          key: "businessConsultingsAr",
          icon: <MdWork />,
          label: t("arabic"),
        },
      ],
    },
    {
      key: "brokers",
      icon: <MdWork />,
      label: t("brokers"),
    },
    // {
    //   key: "settings",
    //   label: t("settings"),
    //   icon: <IoSettingsSharp />,
    //   children: [
    //     {
    //       key: "aboutUs",
    //       icon: <MdOutlineImportContacts />,
    //       label: t("aboutUs"),
    //     },
    //     {
    //       key: "contactUs",
    //       icon: <MdOutlineContactPhone />,
    //       label: t("contactUs"),
    //     },
    //   ],
    // },
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
