import { useLoaderData, useNavigation, useRevalidator } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import Actions from "../../components/Actions";
import type {
  SupplierOrderResDataType,
  SupplierOrderResType,
} from "./supplierorders.type";
import DataGrid from "../../components/DataGrid";
import Actions from "../../components/Actions";
import type { ColumnsType } from "../../gloabal.type";
import { Select } from "antd";
import React from "react";
import { assignOrderToDriver } from "../Orders/order.api";
import type { DriverDataType, DriverResType } from "../Drivers/driver.type";
import { getDriver } from "../Drivers/driver.api";
import useAuth from "../../hooks/useAuth";

export default function SupplierOrderes() {
  const data = useLoaderData() as SupplierOrderResType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [drivers, setDrivers] = React.useState<DriverResType | null>(null);
  const userAuth = useAuth();
  const asignOrderToDriverHandler = async (rowId: string, driverId: string) => {
    setIsLoading(true);
    try {
      await assignOrderToDriver(driverId, rowId);
      revalidator.revalidate();
    } catch (error: unknown) {
      console.error("Error updating status:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchData = async (signal: AbortSignal) => {
    if (userAuth.currentUser?.userType === "admin") {
      try {
        setDrivers(await getDriver({ queryOBJ: {}, id: "", signal }));
      } catch (err) {
        console.log(err);
      }
    }
  };
  React.useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, []);
  const columns = [
    {
      title: t("invoiceNo"),
      key: "invoiceNo",
      sorter: true,
      render: (row: SupplierOrderResDataType) => `${row.invoiceNo}`,
    },
    {
      title: t("name"),
      key: "name",
      sorter: true,
      render: (row: SupplierOrderResDataType) => `${row.productName}`,
    },
    {
      title: t("productAmount"),
      key: "productAmount",
      sorter: true,
      render: (row: SupplierOrderResDataType) => row?.productAmount || "-",
    },
    {
      title: t("receiverNumberPhone"),
      key: "receiverNumberPhone",
      sorter: true,
      render: (row: SupplierOrderResDataType) => `${row?.receiverNumberPhone}`,
    },
    {
      title: t("address"),
      key: "address",
      sorter: true,
      render: (row: SupplierOrderResDataType) => row?.address || "-",
    },
    {
      title: t("address"),
      key: "address",
      sorter: true,
      render: (row: SupplierOrderResDataType) => row?.address || "-",
    },
    {
      title: t("action"),
      key: "action",
      render: (row: SupplierOrderResDataType) => {
        return (
          <div className="flex gap-2 w-50">
            <Actions
              id={row.id}
              hasShow={false}
              hasEdit={
                userAuth.currentUser?.userType === "supplier" &&
                row.status === 1
              }
            />
            <Select
              className="flex-1"
              placeholder={t("assignToDriver")}
              defaultValue={`${
                row.receivedByDriver?.id
                  ? `${row.receivedByDriver?.firstName} ${row.receivedByDriver?.middleName} ${row.receivedByDriver?.lastName}`
                  : t("assignToDriver")
              }`}
              disabled={userAuth.currentUser?.userType !== "admin"}
              options={
                drivers?.items?.map((driver: DriverDataType) => ({
                  label: `${driver.firstName} ${driver.middleName} ${driver.lastName}`,
                  value: driver.id,
                })) || []
              }
              onChange={(value) => {
                asignOrderToDriverHandler(row.id, value);
              }}
            />
          </div>
        );
      },
    },
  ] as ColumnsType<SupplierOrderResDataType>[];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <DataGrid<SupplierOrderResDataType>
        title={t("supplierOrders")}
        columns={columns}
        data={data}
        hasCreate={userAuth.currentUser?.userType === "supplier"}
        loading={
          navigation.state === "loading" ||
          revalidator.state === "loading" ||
          isLoading
        }
        className="mt-4"
      />
    </div>
  );
}
