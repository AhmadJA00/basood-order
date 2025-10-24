import { useLoaderData, useNavigation, useRevalidator } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DataGrid from "../../components/DataGrid";
import Actions, { DeleteButton } from "../../components/Actions";
import { deleteExpensive } from "./expensive.api";
import type { ColumnsType } from "../../gloabal.type";
import type { ExpensiveResDataType } from "./expensive.type";

export default function List() {
  const data = useLoaderData() as ExpensiveResDataType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const deleteFunction = async (id: string) => {
    try {
      if (id) {
        await deleteExpensive(id);
        revalidator.revalidate();
      }
    } catch (error) {
      const errors = helpers.getErrorObjectKeyValue(error.response.data.errors);
      if (errors.length > 0) {
        errors.forEach((err) => {
          openNotification("error", err.label, err.error as string);
        });
      }
    }
  };

  const columns = [
    {
      title: t("name"),
      key: "name",
      sorter: true,
      render: (row: ExpensiveResDataType) => row.amount,
    },
    {
      title: t("city"),
      key: "city",
      sorter: true,
      render: (row: ExpensiveResDataType) => row?.safe,
    },
    {
      title: t("reason"),
      key: "reason",
      sorter: true,
      render: (row: ExpensiveResDataType) => row?.reason || "-",
    },
    {
      title: t("action"),
      key: "action",
      render: (row: ExpensiveResDataType) => {
        return (
          <div className="flex gap-2">
            <Actions id={row.id} hasShow={false} hasEdit />
            <DeleteButton deleteFunction={() => deleteFunction(row?.id)} />
          </div>
        );
      },
    },
  ] as ColumnsType<ExpensiveResDataType>[];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <DataGrid<ExpensiveResDataType>
        title={t("expensives")}
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
