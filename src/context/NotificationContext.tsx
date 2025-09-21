// src/contexts/NotificationContext.tsx
import React, { createContext, useContext } from "react";
import { notification } from "antd";

interface NotificationContextType {
  openNotification: (
    type: "success" | "info" | "warning" | "error",
    message: string,
    description?: string
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    type: "success" | "info" | "warning" | "error",
    message: string,
    description?: string
  ) => {
    api[`${type}`]({
      key: "updatable",
      message,
      description,
      placement: "bottom",
      duration: 10,
    });
  };

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
