import { Button, Card, Flex, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";

type T = {
  children?: React.ReactNode;
  hasCreate?: boolean;
};

const { Search } = Input;

const HeaderTable: React.FC<T> = ({ children, hasCreate }) => {
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
        <Flex gap="middle" align="center" wrap="wrap">
          <Search
            placeholder={t("inputSearchText")}
            enterButton={<Button type="primary">{t("search")}</Button>}
            defaultValue={urlSearchParams.get("search") || ""}
            onSearch={onSearch}
            className="!w-96"
          />
          {children}
        </Flex>
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
