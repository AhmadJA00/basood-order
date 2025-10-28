import { Button } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaShoppingCart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";

export default function Footer() {
  const url = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const links = [
    {
      route: "/supplier-side",
      title: "orders",
      icon: <FaShoppingCart />,
    },
    {
      route: "/supplier-side/balance",
      title: "balance",
      icon: <MdOutlineAccountBalanceWallet />,
    },
    {
      route: "/supplier-side/create",
      title: "addOrders",
      icon: <FaCartPlus />,
    },
  ];
  return (
    <footer className="fixed bottom-0 right-0 left-0 bg-gradient-to-br p-2 from-primary-light from-40% to-primary">
      <div className="flex justify-around items-center gap-2">
        {links.map((link) => (
          <Button
            type={url.pathname === link.route ? "default" : "text"}
            className={`${url.pathname !== link.route ? "!text-white" : ""}`}
            icon={link.icon}
            onClick={() => navigate(link.route)}
          >
            {t(link.title)}
          </Button>
        ))}
      </div>
    </footer>
  );
}
