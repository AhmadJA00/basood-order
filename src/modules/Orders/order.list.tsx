import {
  useLoaderData,
  useNavigate,
  useNavigation,
  useRevalidator,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
// import Actions from "../../components/Actions";
import type { OrderDataType, OrderResType } from "./order.type";
import DataGrid from "../../components/DataGrid";
import Actions from "../../components/Actions";
import type { ColumnsType } from "../../gloabal.type";
import { Button, Flex } from "antd";

export default function Orderes() {
  const data = useLoaderData() as OrderResType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const columns = [
    {
      title: t("name"),
      key: "name",
      sorter: true,
      render: (row: OrderDataType) =>
        `${row.firstName} ${row.middleName} ${row.lastName}`,
    },
    {
      title: t("phoneNumber"),
      key: "phoneNumber",
      sorter: true,
      render: (row: OrderDataType) =>
        `${row?.primaryPhone} - ${row?.secondaryPhone}`,
    },
    {
      title: t("email"),
      key: "email",
      sorter: true,
      render: (row: OrderDataType) => row?.email || "-",
    },
    {
      title: t("salary"),
      key: "salary",
      sorter: true,
      render: (row: OrderDataType) => row?.salary || "-",
    },
    {
      title: t("action"),
      key: "action",
      render: (row: OrderDataType) => {
        return (
          <div className="flex gap-2">
            <Actions id={row.id} hasShow={false} hasEdit />
          </div>
        );
      },
    },
  ] as ColumnsType<OrderDataType>[];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <DataGrid<OrderDataType>
        title={t("orders")}
        columns={columns}
        data={data}
        loading={
          navigation.state === "loading" || revalidator.state === "loading"
        }
        className="mt-4"
      >
        {" "}
        <Flex align="center" justify="start">
          <Button onClick={() => navigate("pending")} type="primary">
            AssignSupplierOrders
          </Button>
        </Flex>
      </DataGrid>
    </div>
  );
}
