import { useLoaderData, useNavigation, useRevalidator } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import Actions from "../../components/Actions";
import type { OrderResDataType, OrderResType } from "./order.type";
import DataGrid from "../../components/DataGrid";
import Actions from "../../components/Actions";
import type { ColumnsType } from "../../gloabal.type";
import { Button, Flex, Select, Tooltip } from "antd";
import { MdDeliveryDining } from "react-icons/md";
import React from "react";
import type { DriverDataType } from "../Drivers/driver.type";
import CModal from "../../components/CModal";
import CShowData from "../../components/CShowData";
import useNotification from "../../hooks/useNotification";
import { changeOrderStatus } from "./order.api";
import helpers from "../../helpers";
import useAuth from "../../hooks/useAuth";
import type { SupplierDataType } from "../Suppliers/supplier.type";
import { IoMdPerson } from "react-icons/io";

export default function Orderes() {
  const data = useLoaderData() as OrderResType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { openNotification } = useNotification();
  const [openDriverInfoModal, setOpenDriverInfoModal] = React.useState(false);
  const userAuth = useAuth();
  const [currentDrivers, setCurrentDrivers] =
    React.useState<DriverDataType | null>(null);
  const [currentSupplier, setCurrentSupplier] =
    React.useState<SupplierDataType | null>(null);
  const [openSupplierInfoModal, setOpenSupplierInfoModal] =
    React.useState(false);
  const columns = [
    {
      title: t("productName"),
      key: "productName",
      sorter: true,
      render: (row: OrderResDataType) => `${row?.productName}`,
    },
    {
      title: t("supplier"),
      key: "supplier",
      sorter: true,
      render: (row: OrderResDataType) => {
        return (
          <Flex align="center" justify="space-between" gap={"middle"}>
            <p>{row.supplier.name}</p>
            {userAuth.currentUser?.userType !== "supplier" &&
              row.supplier?.id && (
                <Tooltip title={t(`knowSupplier`)} color="#003049">
                  <Button
                    type="primary"
                    onClick={() => {
                      setOpenSupplierInfoModal(true);
                      setCurrentSupplier(row.supplier);
                    }}
                  >
                    <IoMdPerson />
                  </Button>{" "}
                </Tooltip>
              )}
          </Flex>
        );
      },
    },
    {
      title: t("driver"),
      key: "driver",
      sorter: true,
      render: (row: OrderResDataType) => (
        <Flex justify="space-between" align="center" gap={"middle"}>
          <p>{`${row?.driver.firstName} ${row?.driver.middleName} ${row?.driver.lastName} `}</p>
          <Tooltip title={t(`knowDriver`)} color="#003049">
            <Button
              type="primary"
              onClick={() => {
                setOpenDriverInfoModal(true);
                setCurrentDrivers(row.driver);
              }}
            >
              <MdDeliveryDining />
            </Button>{" "}
          </Tooltip>
        </Flex>
      ),
    },
    {
      title: `${t("toCity")} (${t("neighborhood")})`,
      key: "fromCity",
      sorter: true,
      render: (row: OrderResDataType) => (
        <p>{` ${row.toCity?.name} ${
          row?.neighborhood?.name ? `(${row?.neighborhood?.name})` : ""
        }`}</p>
      ),
    },

    {
      title: `${t("productPrice")} + ${t("deliveryPrice")} + ${t(
        "driverPrice"
      )} = ${t("totalOrder")}`,
      key: "deliveryPrice",
      render: (row: OrderResDataType) => (
        <p className="text-nowrap">
          {`${row?.productPrice.toLocaleString()} ${t(
            "iqd"
          )} + ${row?.deliveryPrice.toLocaleString()} ${t(
            "iqd"
          )} + ${row?.driverPrice.toLocaleString()} ${t(
            "iqd"
          )} = ${row?.totalOrder.toLocaleString()} ${t("iqd")}`}
        </p>
      ),
    },

    {
      title: t("action"),
      key: "action",
      render: (row: OrderResDataType) => {
        return (
          <div className="flex gap-2">
            <Actions id={row.id} hasShow hasEdit={row.paymentTerm === 2} />
            <Select
              className={"w-52"}
              disabled={userAuth.currentUser?.userType !== "admin"}
              onChange={(value) => {
                if (value) {
                  changeOrderStatusHandler(row.id, value);
                }
              }}
              value={row.status}
              options={helpers.orderStatus.map((status) => ({
                label: t(status.label),
                value: status.value,
              }))}
            />
          </div>
        );
      },
    },
  ] as ColumnsType<OrderResDataType>[];
  const changeOrderStatusHandler = async (rowId: string, value: number) => {
    try {
      await changeOrderStatus(rowId, value);
      openNotification("success", t("updatedSuccessfully"));
      revalidator.revalidate();
    } catch (error: unknown) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <DataGrid<OrderResDataType>
        title={t("orders")}
        columns={columns}
        data={data}
        loading={
          navigation.state === "loading" || revalidator.state === "loading"
        }
        className="mt-4"
      />
      <CModal
        open={openDriverInfoModal}
        setOpen={setOpenDriverInfoModal}
        width={750}
        title={`${t("driver")}: ${currentDrivers?.firstName} ${
          currentDrivers?.middleName
        } ${currentDrivers?.lastName}`}
      >
        <CShowData
          label={t("phoneNumber")}
          data={`${currentDrivers?.primaryPhone} ${
            currentDrivers?.secondaryPhone
              ? ` - ${currentDrivers?.primaryPhone}`
              : ""
          }`}
        />
        <CShowData
          label={t("driverLicense")}
          data={currentDrivers?.driverLicense}
        />
      </CModal>{" "}
      <CModal
        open={openSupplierInfoModal}
        setOpen={setOpenSupplierInfoModal}
        title={`${t("supplier")}: ${currentSupplier?.name}`}
      >
        <CShowData
          label={t("phoneNumber")}
          data={`${currentSupplier?.primaryPhone} ${
            currentSupplier?.secondaryPhone
              ? ` - ${currentSupplier?.primaryPhone}`
              : ""
          }`}
        />
        <CShowData label={t("address")} data={currentSupplier?.address} />
      </CModal>
    </div>
  );
}
