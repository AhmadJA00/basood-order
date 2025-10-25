import { useLoaderData, useNavigation, useRevalidator } from "react-router-dom";
import { useTranslation } from "react-i18next";

import DataGrid from "../../../components/DataGrid";
import Actions from "../../../components/Actions";
import type { ColumnsType } from "../../../gloabal.type";
import type { PaymentResDataType, PaymentResType } from "./payment.type";
import { IoPrintOutline } from "react-icons/io5";
import { Button } from "antd";

export default function Paymentes() {
  const data = useLoaderData() as PaymentResType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const columns = [
    {
      title: "amount",
      key: "amount",
      render: (row: PaymentResDataType) => `${row.amount} ${t("iqd")}`,
    },
    {
      title: t("action"),
      key: "action",
      render: (row: PaymentResDataType) => {
        return (
          <div className="flex gap-2">
            <Actions id={row.id} hasShow={false} hasEdit />{" "}
            <Button type="primary" icon={<IoPrintOutline />}>
              {t("print")}
            </Button>
          </div>
        );
      },
    },
  ] as ColumnsType<PaymentResDataType>[];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <DataGrid<PaymentResDataType>
        title={t("Payments")}
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
