import { Button, GetProps, Input, Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";

type T = {
  title: string;
  columns: { title: string; key: string; searchable: boolean }[];
  hasCreate?: boolean;
};

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const HeaderTable: React.FC<T> = ({ title, columns, hasCreate }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);
  const [searchField, setSearchField] = React.useState(
    urlSearchParams.get("searchField") || ""
  );

  const onSearch: SearchProps["onSearch"] = (value) => {
    urlSearchParams.set("search", value);
    urlSearchParams.set("searchField", searchField);
    setSearchParams(urlSearchParams);
  };

  return (
    <div className="pb-6 bg-primary/5 p-6 rounded-lg  mb-6">
      <h1 className="text-2xl font-semibold text-primary mb-6">{t(title)}</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Select
            className="min-w-[200px]"
            labelRender={(e) => (
              <span className="text-gray-500 font-medium">
                {t("searchBy")}: {t(`${e.label ?? ""}`)}
              </span>
            )}
            value={searchField}
            onChange={setSearchField}
            options={columns
              .filter((col) => col.searchable && col.title !== "Action")
              .map((col) => ({
                label: t(col.title),
                value: col.key,
              }))}
            style={{
              borderColor: "var(--color-background-nav)",
            }}
          />

          <Search
            placeholder={t("inputSearchText")}
            className="min-w-[250px]"
            enterButton={
              <Button
                type="primary"
                style={{
                  backgroundColor: "var(--color-primary)",
                  borderColor: "var(--color-primary)",
                }}
              >
                {t("search")}
              </Button>
            }
            defaultValue={urlSearchParams.get("search") || ""}
            onSearch={onSearch}
            style={{
              borderColor: "var(--color-background-nav)",
            }}
          />
        </div>

        {!hasCreate && (
          <Button
            type="primary"
            onClick={() => navigate("create")}
            style={{
              backgroundColor: "var(--color-primary)",
              borderColor: "var(--color-primary)",
            }}
            className="w-full md:w-auto mt-4 md:mt-0"
          >
            {t("create")} +
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderTable;
