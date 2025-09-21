import { Button, Flex, Select } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

type NavbarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FC<NavbarProps> = ({ collapsed, setCollapsed }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="p-2">
      <Flex gap="middle" align="center" justify="start">
        <div className={`${i18n.language !== "en" && "rotate-180"}`}>
          <Button
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
        </div>
        <Select
          placeholder={t("selectLanguage")}
          style={{ width: 120 }}
          value={i18n.language}
          onChange={(value) => {
            try {
              i18n.changeLanguage(value);
            } catch (error) {
              console.error("Error changing language:", error);
            }
          }}
          options={[
            { label: "English", value: "en" },
            { label: "العربية", value: "ar" },
            { label: "کوردی", value: "he" },
          ]}
        />
      </Flex>
    </div>
  );
};
export default Navbar;
