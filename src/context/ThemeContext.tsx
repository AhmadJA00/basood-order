// src/context/ThemeContext.tsx
import { ConfigProvider, theme } from "antd";
import React, { createContext, useContext, useState, useEffect } from "react";
import { NotificationProvider } from "./NotificationContext";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const { darkAlgorithm, defaultAlgorithm } = theme;

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  const lightTheme = {
    // Primary colors
    colorPrimary: "#003049", // Primary color for all components
    colorPrimaryHover: "#005683",

    colorPrimaryBg: "#E2F4FF", // Primary background color
    colorPrimaryBgHover: "#005683", // Primary background hover color

    colorPrimaryBorder: "#003049", // Primary border color
    colorPrimaryBorderHover: "#005683",

    colorPrimaryActive: "#001a29",
    colorPrimaryTextHover: "#40a9ff",

    colorPrimaryText: "#1890ff",
    colorPrimaryTextActive: "#005683",

    // Success colors
    colorSuccess: "#52c41a",
    colorSuccessBg: "#f6ffed",
    colorSuccessBgHover: "#d9f7be",
    colorSuccessBorder: "#b7eb8f",
    colorSuccessBorderHover: "#95de64",
    colorSuccessHover: "#73d13d",
    colorSuccessActive: "#389e0d",
    colorSuccessTextHover: "#73d13d",
    colorSuccessText: "#52c41a",
    colorSuccessTextActive: "#389e0d",

    // Warning colors
    colorWarning: "#CBA215",
    colorWarningBg: "#fffbe6",
    colorWarningBgHover: "#fff1b8",
    colorWarningBorder: "#ffe58f",
    colorWarningBorderHover: "#ffd666",
    colorWarningHover: "#ffc53d",
    colorWarningActive: "#d48806",
    colorWarningTextHover: "#ffc53d",
    colorWarningText: "#faad14",
    colorWarningTextActive: "#d48806",

    // Error colors
    colorError: "#c1111f",
    colorErrorBg: "#c1111f",
    colorErrorBgHover: "#790000",
    colorErrorBorder: "#c1111f",
    colorErrorBorderHover: "#790000",
    colorErrorHover: "#790000",
    colorErrorActive: "#630101",
    colorErrorTextHover: "#ff7875",
    colorErrorText: "#ff4d4f",
    colorErrorTextActive: "#630101",

    // Info colors
    colorInfo: "#1890ff",
    colorInfoBg: "#e6f7ff",
    colorInfoBgHover: "#bae7ff",
    colorInfoBorder: "#91d5ff",
    colorInfoBorderHover: "#69c0ff",
    colorInfoHover: "#40a9ff",
    colorInfoActive: "#096dd9",
    colorInfoTextHover: "#40a9ff",
    colorInfoText: "#1890ff",
    colorInfoTextActive: "#096dd9",

    // Neutral colors
    colorText: "rgba(0, 0, 0, 0.88)", // Default text color
    colorTextSecondary: "rgba(0, 0, 0, 0.65)", // Secondary text color
    colorTextTertiary: "rgba(0, 0, 0, 0.45)", // Tertiary text color
    colorTextQuaternary: "rgba(0, 0, 0, 0.25)",
    colorBorder: "rgba(0,48,73,0.3)", // Default border color
    colorBorderSecondary: "#f0f0f0", // Secondary border color
    colorFill: "rgba(0, 0, 0, 0.15)", // Default fill color
    colorFillSecondary: "rgba(0, 0, 0, 0.06)",
    colorFillTertiary: "rgba(0, 0, 0, 0.04)",
    colorFillQuaternary: "rgba(0, 0, 0, 0.02)",

    colorBgContainer: "#F5FBFF", // Background of components
    colorBgElevated: "#F5FBFF", // Background of elevated components
    colorBgLayout: "#F5FBFF", // Layout background
    colorBgSpotlight: "#F5FBFF", // Mask background
    colorBgMask: "#F5FBFF", // Popup background
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <NotificationProvider>
        <ConfigProvider
          // theme={lightTheme}
          theme={{
            algorithm: defaultAlgorithm,
            token: lightTheme,
          }}
        >
          {children}
        </ConfigProvider>
      </NotificationProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
