import { Card } from "antd";
import { useTranslation } from "react-i18next";

interface CardProps {
  title: string;
  data: { key: string; value: string; className?: string }[];
}

const CCard = ({ title, data }: CardProps) => {
  const { t } = useTranslation();
  return (
    <Card
      title={t(title)}
      headStyle={{
        background: "var(--color-primary)",
        color: "white",
        fontWeight: "600",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
      }}
      bodyStyle={{
        padding: "16px 24px",
        background: "white",
      }}
      style={{
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        border: "none",
      }}
    >
      <div className="grid grid-cols-3 gap-4 w-full">
        {data?.map((item, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${item?.className}`}
            style={{
              background: "var(--color-background-nav)",

              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <span
              className="font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              {item.key}:
            </span>
            <span className="ml-2">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CCard;
