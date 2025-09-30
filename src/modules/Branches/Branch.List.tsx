import { useLoaderData, useNavigation, useRevalidator } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import Actions from "../../components/Actions";
import type { BranchDataType, BranchResType } from "./Branch.type";
import DataGrid from "../../components/DataGrid";
import Actions from "../../components/Actions";

export default function Branches() {
  const data = useLoaderData() as BranchResType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const columns = [
    {
      title: t("name"),
      key: "name",
      sorter: true,
      render: (row: BranchDataType) => row.name,
    },
    {
      title: t("location"),
      key: "location",
      sorter: true,
      render: (row: BranchDataType) => row.location,
    },
    {
      title: t("description"),
      key: "description",
      sorter: true,
      render: (row: BranchDataType) => row?.description || "-",
    },
    {
      title: t("action"),
      key: "action",
      render: (row: BranchResType) => {
        return (
          <div className="flex gap-2">
            <Actions
              row={row}
              isShow={false}
              hasEdit
              // isDelete={true}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <DataGrid<BranchDataType>
        title={t("branches")}
        columns={columns}
        data={data}
        loading={
          navigation.state === "loading" || revalidator.state === "loading"
        }
        className="mt-4"
      />
    </div>
  );
}
