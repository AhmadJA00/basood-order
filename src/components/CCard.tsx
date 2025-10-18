import { Card } from "antd";
import { useTranslation } from "react-i18next";
import type { CardProps } from "../gloabal.type";

const CCard = ({ title, children }: CardProps) => {
  const { t } = useTranslation();
  return (
    <Card
      title={t(title)}
      className="shadow-lg"
      headStyle={{
        background: "var(--color-primary)",
        color: "white",
      }}
    >
      {children}
    </Card>
  );
};

export default CCard;
