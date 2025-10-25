import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { MdWork } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { Layout } from "antd";
import useAuth from "../hooks/useAuth";
import type { ItemType } from "antd/es/menu/interface";
import { FaCodeBranch } from "react-icons/fa6";

type SidebarProps = {
  collapsed: boolean;
};

// Define the custom MenuItem type for clarity
type MenuItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  allowed: boolean;
  children?: MenuItem[];
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const { Sider } = Layout;
  const { userLoggedIn, signOut, currentUser } = useAuth();
  const { t } = useTranslation();

  const logout = async () => {
    if (userLoggedIn) {
      await signOut();
      navigate("/login");
    }
  };

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    // Simplified switch case for brevity, assuming existing logic is fine
    switch (key) {
      case "branches":
        navigate("branches");
        break;
      case "drivers":
        navigate("drivers");
        break;
      case "cities":
        navigate("cities");
        break;
      case "orders":
        navigate("orders");
        break;
      case "orderPending":
        navigate("orders/pending");
        break;
      case "orderDetails":
        navigate("orders/order-details");
        break;
      case "supplierOrders":
        navigate("supplierOrders");
        break;
      case "suppliers":
        navigate("suppliers");
        break;
      case "transactions":
        navigate("drivers/transactions");
        break;
      case "safes":
        navigate("accountant/safes");
        break;
      case "expensives":
        navigate("accountant/expensives");
        break;
      case "transfers":
        navigate("accountant/transfers");
        break;
      case "zones":
        navigate("zones");
        break;
      case "employees":
        navigate("employees");
        break;
      case "users":
        navigate("users");
        break;
      case "roles":
        navigate("users/roles");
        break;
      case "logout":
        logout();
        break;
    }
  };

  const menuItems: MenuItem[] = [
    {
      key: "branches",
      label: t("branches"),
      icon: <FaCodeBranch />,
      allowed: currentUser?.userType === "admin", // Example: Always allowed
    },
    {
      key: "orders-group", // Changed key to avoid conflict with child 'orders' key
      label: t("orders"),
      icon: <MdWork />,
      allowed: currentUser?.userType === "admin",
      children: [
        {
          key: "orders",
          label: t("orders"),
          icon: <MdWork />,
          allowed: currentUser?.userType === "admin", // Example: Always allowed
        },
        {
          key: "supplierOrders",
          label: t("supplierOrders"),
          icon: <MdWork />,
          // This item is only allowed if the userType is 'supplier'
          allowed: currentUser?.userType === "admin",
        },
        {
          key: "orderPending",
          label: t("orderPending"),
          icon: <MdWork />,
          // This item is only allowed if the userType is 'supplier'
          allowed: currentUser?.userType === "admin",
        },
        {
          key: "orderDetails",
          label: t("orderDetails"),
          icon: <MdWork />,
          // This item is only allowed if the userType is 'supplier'
          allowed: currentUser?.userType === "admin",
        },
      ],
    },
    {
      key: "supplierOrders",
      label: t("supplierOrders"),
      icon: <MdWork />,
      allowed:
        currentUser?.userType === "supplier" ||
        currentUser?.userType === "driver",
    },
    {
      key: "drivers-group",
      label: t("drivers"),
      icon: <MdWork />,
      allowed: currentUser?.userType === "admin",
      children: [
        {
          key: "drivers",
          label: t("drivers"),
          icon: <MdWork />,
          allowed: currentUser?.userType === "admin",
        },
        {
          key: "transactions",
          label: t("transactions"),
          icon: <MdWork />,
          allowed: currentUser?.userType === "admin",
        },
      ],
    },
    {
      key: "accountant",
      label: t("accountant"),
      icon: <MdWork />,
      allowed: currentUser?.userType === "admin",
      children: [
        {
          key: "safes",
          label: t("safes"),
          icon: <MdWork />,
          allowed: currentUser?.userType === "admin",
        },
        {
          key: "expensives",
          label: t("expensives"),
          icon: <MdWork />,
          allowed: currentUser?.userType === "admin",
        },
        {
          key: "transfers",
          label: t("transfers"),
          icon: <MdWork />,
          allowed: currentUser?.userType === "admin",
        },
      ],
    },
    {
      key: "suppliers",
      label: t("suppliers"),
      icon: <MdWork />,
      allowed: currentUser?.userType === "admin",
    },
    {
      key: "cities",
      label: t("cities"),
      icon: <MdWork />,
      allowed: currentUser?.userType === "admin",
    },
    {
      key: "zones",
      label: t("zones"),
      icon: <MdWork />,
      allowed: currentUser?.userType === "admin",
    },
    {
      key: "employees",
      label: t("employees"),
      icon: <MdWork />,
      allowed: currentUser?.userType === "admin",
    },
    {
      key: "users-management", // Changed key
      label: t("users"),
      icon: <MdWork />,
      // Example: Only allowed for administrators
      allowed: currentUser?.userType === "admin",
      children: [
        {
          key: "users",
          label: t("users"),
          icon: <MdWork />,
          allowed: currentUser?.userType === "admin",
        },
        {
          key: "roles",
          label: t("roles"),
          icon: <MdWork />,
          allowed: currentUser?.userType === "admin",
        },
      ],
    },
    {
      key: "logout",
      icon: <CgLogOut />,
      allowed: true,
      label: t("logout"),
    },
  ];

  /**
   * Recursively filters the custom MenuItem array and converts it to Ant Design's ItemType.
   * - Filters out any item where `allowed` is false.
   * - Recursively filters children.
   * - A parent item with children will be kept if it is 'allowed' OR if any of its children are kept.
   * (The implementation below filters out the parent if it's explicitly disallowed AND has no allowed children.)
   * @param items The array of custom MenuItem objects.
   * @returns An array of Ant Design's ItemType suitable for the Menu component.
   */
  const filterAllowedMenuItems = (items: MenuItem[]): ItemType[] => {
    return items
      .map((item) => {
        // 1. Check for allowed children recursively
        const allowedChildren = item.children
          ? filterAllowedMenuItems(item.children)
          : [];

        // 2. Determine if the current item should be included
        const isSelfAllowed = item.allowed;
        const hasAllowedChildren = allowedChildren.length > 0;

        // If the item itself is not allowed AND it has no allowed children, return null (to be filtered out)
        if (!isSelfAllowed && !hasAllowedChildren) {
          return null;
        }

        // 3. Construct the Ant Design ItemType object
        const finalItem: ItemType = {
          key: item.key,
          label: item.label,
          icon: item.icon,
          // Only include the children property if there are allowed children
          ...(hasAllowedChildren && { children: allowedChildren }),
        };

        return finalItem;
      })
      .filter((item) => item !== null); // Filter out the nulls
  };

  const finalMenuItems = filterAllowedMenuItems(menuItems);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Menu
        className="border-none min-h-screen"
        // Consider setting a default open key for nested menus if needed
        // defaultOpenKeys={['orders-group']}
        mode="inline"
        inlineCollapsed={collapsed}
        // Use the filtered and transformed items here
        items={finalMenuItems}
        onClick={handleMenuClick}
        theme="light"
      />
    </Sider>
  );
};

export default Sidebar;
