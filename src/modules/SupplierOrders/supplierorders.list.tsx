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
import { Button, Flex, Select, Switch, Tooltip } from "antd";
import React from "react";
import { assignOrderToDriver, changeOrderStatus } from "../Orders/order.api";
import type { DriverDataType, DriverResType } from "../Drivers/driver.type";
import { getDriver } from "../Drivers/driver.api";
import useAuth from "../../hooks/useAuth";
import { receivedOrderPending } from "./supplierorders.api";
import helpers from "../../helpers";
import CModal from "../../components/CModal";
import { MdDeliveryDining } from "react-icons/md";
import CShowData from "../../components/CShowData";
import { IoMdPerson } from "react-icons/io";
import type { SupplierDataType } from "../Suppliers/supplier.type";
import useNotification from "../../hooks/useNotification";

export default function SupplierOrderes() {
  const data = useLoaderData() as SupplierOrderResType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [drivers, setDrivers] = React.useState<DriverResType | null>(null);
  const [currentDrivers, setCurrentDrivers] =
    React.useState<DriverDataType | null>(null);
  const [openDriverInfoModal, setOpenDriverInfoModal] = React.useState(false);
  const [currentSupplier, setCurrentSupplier] =
    React.useState<SupplierDataType | null>(null);
  const [openSupplierInfoModal, setOpenSupplierInfoModal] =
    React.useState(false);
  const userAuth = useAuth();
  const {openNotification} = useNotification()

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

  const changeOrderStatus‌Handler = async (rowId: string, value: 3) => {
    setIsLoading(true);
    try {
      await changeOrderStatus(rowId, value);
      revalidator.revalidate();
    } catch (error: unknown) {
      console.error("Error updating status:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const receivedOrderByDriver = async (rowId: string) => {
    setIsLoading(true);
    try {
      receivedOrderPending(rowId);
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
      } catch (error) {
        const errors = helpers.getErrorObjectKeyValue(error.response.data.errors);
      if (errors.length > 0) {
        errors.forEach((err) => {
          openNotification("error", err.label, err.error as string);
        });
      }
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
      render: (row: SupplierOrderResDataType) => `${row.invoiceNo || ""}`,
    },
    {
      title: t("supplier"),
      key: "supplier",
      sorter: true,
      render: (row: SupplierOrderResDataType) => {
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
      responsive:[userAuth.currentUser?.userType !=='driver' &&'sm'],
      render: (row: SupplierOrderResDataType) => `${row?.receiverNumberPhone}`,
    },
    {
      title: t("address"),
      key: "address",
      sorter: true,      responsive:[userAuth.currentUser?.userType !=='driver' &&'sm'],

      render: (row: SupplierOrderResDataType) => row?.address || "-",
    },

   
    {
      title: t("driver"),
      key: "driver",
      responsive: [userAuth.currentUser?.userType === "admin" && "sm"],
      render: (row: SupplierOrderResDataType) => {
        return (
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
        );
      },
    },
    {
      title: t("action"),
      key: "action",
      responsive: [userAuth.currentUser?.userType === "supplier" && "sm"],

      render: (row: SupplierOrderResDataType) => {
        return (
          <Actions
            id={row.id}
            hasShow={false}
            hasEdit={
              userAuth.currentUser?.userType === "supplier" && row.status === 1
            }
          />
        );
      },
    },
    {
      title: t("isDriverPickedUp"),
      key: "isDriverPickedUp",

      render: (row: SupplierOrderResDataType) => {
        return (
          <Flex align="center" justify="center" gap={"middle"}>
            <Switch
              className="flex-1"
              disabled={
                userAuth.currentUser?.userType !== "driver" ||
                helpers.getStatus(row.status) === "DriverReceived"
              }
              checkedChildren={t("yes")}
              defaultChecked={
                helpers.getStatus(row.status) === "DriverReceived"
              }
              unCheckedChildren={t("no")}
              onChange={(value) => {
                if (value) {
                  receivedOrderByDriver(row.id);
                }
              }}
            />
            {userAuth.currentUser?.userType !== "driver" &&
              row.receivedByDriver?.id && (
                <Tooltip title={t(`knowDriver`)} color="#003049">
                  <Button
                    type="primary"
                    onClick={() => {
                      setOpenDriverInfoModal(true);
                      setCurrentDrivers(row.receivedByDriver);
                    }}
                  >
                    <MdDeliveryDining />
                  </Button>{" "}
                </Tooltip>
              )}
          </Flex>
        );
      },
    },
    {
      title: t("isArraivedToOffice"),
      key: "isArraivedToOffice",

      render: (row: SupplierOrderResDataType) => {
        return (
          <Flex align="center" justify="center" gap={"middle"}>
            <Switch
              className="flex-1"
              disabled={
                userAuth.currentUser?.userType !== "admin" ||
                helpers.getStatus(row.status) === "OfficeReceived"
              }
              checkedChildren={t("yes")}
              defaultChecked={
                helpers.getStatus(row.status) === "OfficeReceived"
              }
              unCheckedChildren={t("no")}
              onChange={(value) => {
                if (value ) {
                  changeOrderStatus‌Handler(row.id,3);
                }
              }}
            />
           
          </Flex>
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
      </CModal>
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
