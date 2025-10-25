import { useLoaderData, useNavigation, useRevalidator } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import Actions from "../../components/Actions";
import type {
  TransactionResDataType,
  TransactionResType,
} from "./transaction.type";
import DataGrid from "../../../components/DataGrid";
import Actions from "../../../components/Actions";
import type { ColumnsType } from "../../../gloabal.type";
import { Button, Tooltip } from "antd";
import { BiSolidUserAccount } from "react-icons/bi";
import { createTransactionAccount } from "./transaction.api";
import useNotification from "../../../hooks/useNotification";
import helpers from "../../../helpers";

export default function Transactiones() {
  const data = useLoaderData() as TransactionResType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { openNotification } = useNotification();

  const createAccount = async (id: string) => {
    try {
      if (id) {
        await createTransactionAccount(id);
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
      title: t("amount"),
      key: "amount",
      sorter: true,
      render: (row: TransactionResDataType) =>
        `${row.amount.toLocaleString()} ${t("iqd")}`,
    },

    {
      title: t("totalAmount"),
      key: "totalAmount",
      sorter: true,
      render: (row: TransactionResDataType) =>
        `${row.totalAmount.toLocaleString()} ${t("iqd")}`,
    },
    {
      title: t("action"),
      key: "action",
      render: (row: TransactionResDataType) => {
        return (
          <div className="flex gap-2">
            <Actions id={row.id} hasShow={false} hasEdit />{" "}
          </div>
        );
      },
    },
  ] as ColumnsType<TransactionResDataType>[];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <DataGrid<TransactionResDataType>
        title={t("Transactions")}
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
