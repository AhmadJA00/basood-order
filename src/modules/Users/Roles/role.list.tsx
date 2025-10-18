import { useLoaderData, useNavigation, useRevalidator } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DataGrid from "../../../components/DataGrid";
import Actions, { DeleteButton } from "../../../components/Actions";
import { deleteRole } from "./role.api";
import type { ColumnsType } from "../../../gloabal.type";
import type { RoleResDataType, RoleResType } from "./role.type";

export default function List() {
  const data = useLoaderData() as RoleResType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const deleteFunction = async (id: string) => {
    try {
      if (id) {
        await deleteRole(id);
        revalidator.revalidate();
      }
    } catch (error) {
      console.error("Error creating LookingForInvestor:", error);
    }
  };

  const columns = [
    {
      title: t("title"),
      key: "title",
      sorter: true,
      render: (row: RoleResDataType) => row.title,
    },

    {
      title: t("action"),
      key: "action",
      render: (row: RoleResDataType) => {
        return (
          <div className="flex gap-2">
            <Actions id={row.id} hasShow={false} hasEdit />
            <DeleteButton deleteFunction={() => deleteFunction(row?.id)} />
          </div>
        );
      },
    },
  ] as ColumnsType<RoleResDataType>[];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <DataGrid<RoleResDataType>
        title={t("roles")}
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
