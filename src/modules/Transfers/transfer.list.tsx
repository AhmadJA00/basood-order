import { useLoaderData, useNavigation, useRevalidator } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DataGrid from "../../components/DataGrid";
import Actions, { DeleteButton } from "../../components/Actions";
import { deleteTransfer } from "./transfer.api";
import type { ColumnsType } from "../../gloabal.type";
import type { TransferResDataType } from "./transfer.type";

export default function List() {
  const data = useLoaderData() as TransferResDataType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const deleteFunction = async (id: string) => {
    try {
      if (id) {
        await deleteTransfer(id);
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
      render: (row: TransferResDataType) => row.amount,
    },
    {
      title: t("city"),
      key: "city",
      sorter: true,
      render: (row: TransferResDataType) => row?.safe,
    },
    {
      title: t("reason"),
      key: "reason",
      sorter: true,
      render: (row: TransferResDataType) => row?.reason || "-",
    },
    {
      title: t("action"),
      key: "action",
      render: (row: TransferResDataType) => {
        return (
          <div className="flex gap-2">
            <Actions id={row.id} hasShow={false} hasEdit />
            <DeleteButton deleteFunction={() => deleteFunction(row?.id)} />
          </div>
        );
      },
    },
  ] as ColumnsType<TransferResDataType>[];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <DataGrid<TransferResDataType>
        title={t("cities")}
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
