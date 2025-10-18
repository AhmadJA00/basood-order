import { Button, Card, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";

type T = {
  hasCreate?: boolean;
};

const { Search } = Input;

const HeaderTable: React.FC<T> = ({ hasCreate }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);

  const onSearch = (value: string) => {
    urlSearchParams.set("search", value);
    setSearchParams(urlSearchParams);
  };

  return (
    <Card>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Search
          placeholder={t("inputSearchText")}
          enterButton={<Button type="primary">{t("search")}</Button>}
          defaultValue={urlSearchParams.get("search") || ""}
          onSearch={onSearch}
          className="!w-96"
        />

        {hasCreate && (
          <Button type="primary" onClick={() => navigate("create")}>
            {t("create")} +
          </Button>
        )}
      </div>
    </Card>
  );
};

export default HeaderTable;
