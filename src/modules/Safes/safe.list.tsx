import { useLoaderData, useNavigation, useRevalidator } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DataGrid from "../../components/DataGrid";
import Actions, { DeleteButton } from "../../components/Actions";
import { deleteSafe } from "./safe.api";
import type { ColumnsType } from "../../gloabal.type";
import type { SafeResDataType, SafeResType } from "./safe.type";

export default function List() {
  const data = useLoaderData() as SafeResType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const deleteFunction = async (id: string) => {
    try {
      if (id) {
        await deleteSafe(id);
        revalidator.revalidate();
      }
    } catch (error) {
      console.error("Error creating LookingForInvestor:", error);
    }
  };

  const columns = [
    {
      title: t("name"),
      key: "name",
      sorter: true,
      render: (row: SafeResDataType) => row.name,
    },
    {
      title: t("initialBalance"),
      key: "initialBalance",
      sorter: true,
      render: (row: SafeResDataType) =>
        `$ ${(row?.initialBalance || 0)?.toLocaleString()}`,
    },
    {
      title: t("action"),
      key: "action",
      render: (row: SafeResDataType) => {
        return (
          <div className="flex gap-2">
            <Actions id={row.id} hasShow={false} hasEdit />
            <DeleteButton deleteFunction={() => deleteFunction(row?.id)} />
          </div>
        );
      },
    },
  ] as ColumnsType<SafeResDataType>[];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <DataGrid<SafeResDataType>
        title={t("safes")}
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
