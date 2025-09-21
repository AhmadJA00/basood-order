import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import notFoundVector from "../assets/not found.png";
import { useTranslation } from "react-i18next";

export default function NotFound({ backURL = "/" }: { backURL?: string }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen overflow-hidden">
      <img src={notFoundVector} alt="" className="w-1/2" />
      <p className="text-4xl">{t("pageNotFound")}</p>
      <Button
        className="rounded-lg"
        type="primary"
        size="large"
        onClick={() => navigate(backURL)}
      >
        {t("goToHome")}
      </Button>
    </div>
  );
}
