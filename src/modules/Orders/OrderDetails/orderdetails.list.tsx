import {
  useLoaderData,
  useNavigation,
  useRevalidator,
  useSearchParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import DataGrid from "../../../components/DataGrid";
import type { ColumnsType } from "../../../gloabal.type";
import type {
  OrderDetailsDataType,
  OrderDetailsResType,
} from "./orderdetails.type";
import { Button, Flex, Input, Select, Tooltip } from "antd";
import { IoMdPerson } from "react-icons/io";
import type {
  SupplierDataType,
  SupplierResType,
} from "../../Suppliers/supplier.type";
import React from "react";
import CModal from "../../../components/CModal";
import CShowData from "../../../components/CShowData";
import type { DriverDataType, DriverResType } from "../../Drivers/driver.type";
import { MdDeliveryDining } from "react-icons/md";
import helpers from "../../../helpers";
import { IoPrintOutline } from "react-icons/io5";
import { getDriver } from "../../Drivers/driver.api";
import { getSupplier } from "../../Suppliers/supplier.api";
import useNotification from "../../../hooks/useNotification";

export default function List() {
  const data = useLoaderData() as OrderDetailsResType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { openNotification } = useNotification();
  const [searchParams, setSearchParams] = useSearchParams();
  const [shownColumns, setShownColumns] = React.useState<string[] | []>(
    JSON.parse(localStorage?.getItem("shownColumns-order-details")) || []
  );
  const [suppliers, setSuppliers] = React.useState<SupplierResType>();
  const [drivers, setDrivers] = React.useState<DriverResType>();

  const [currentSupplier, setCurrentSupplier] =
    React.useState<SupplierDataType | null>(null);
  const [openSupplierInfoModal, setOpenSupplierInfoModal] =
    React.useState(false);

  const [currentDrivers, setCurrentDrivers] =
    React.useState<DriverDataType | null>(null);
  const [openDriverInfoModal, setOpenDriverInfoModal] = React.useState(false);

  // 💥 NEW STATE: To track selected rows 💥
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState<
    OrderDetailsDataType[]
  >([]);

  // Function to handle logging the selected data
  const handleLogSelected = () => {
    console.log("--- Selected Row Data ---");
    // Log the actual data objects
    selectedRows.forEach((row) => console.log(row));
    // Or log just the IDs
    // console.log('Selected Keys:', selectedRowKeys);
  };

  // 💥 Row Selection Configuration Object 💥
  const rowSelection = {
    selectedRowKeys,
    onChange: (
      newSelectedRowKeys: React.Key[],
      newSelectedRows: OrderDetailsDataType[]
    ) => {
      // Update state when selection changes
      setSelectedRowKeys(newSelectedRowKeys);
      setSelectedRows(newSelectedRows);
    },
    // Optional: Add logic for row selection behavior (e.g., disable certain rows)
    // getCheckboxProps: (record: OrderDetailsDataType) => ({
    //   disabled: record.status === 'Completed',
    // }),
  };

  const columns = [
    {
      title: t("supplier"),
      key: "supplier",
      render: (row: OrderDetailsDataType) => {
        return (
          <Flex align="center" justify="space-between" gap={"middle"}>
            <p>{row.supplier.name}</p>
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
          </Flex>
        );
      },
    },
    {
      title: t("driver"),
      key: "driver",
      render: (row: OrderDetailsDataType) => {
        return (
          <Flex align="center" justify="space-between" gap={"middle"}>
            <p>
              {row?.order?.driver?.firstName} {row?.order?.driver?.middleName}{" "}
              {row?.order?.driver?.lastName}
            </p>
            <Tooltip title={t(`knowSupplier`)} color="#003049">
              <Button
                type="primary"
                onClick={() => {
                  setOpenDriverInfoModal(true);
                  setCurrentDrivers(row?.order?.driver);
                }}
              >
                <MdDeliveryDining />
              </Button>{" "}
            </Tooltip>
          </Flex>
        );
      },
    },
    {
      title: t("status"),
      key: "status",
      render: (row: OrderDetailsDataType) => helpers.getStatus(row?.status),
    },
    {
      title: t("productAmount"),
      key: "productAmount",
      render: (row: OrderDetailsDataType) =>
        ` ${(row?.productAmount || 0)?.toLocaleString()} ${t("iqd")}`,
    },
    {
      title: t("deliveryAmount"),
      key: "deliveryAmount",
      render: (row: OrderDetailsDataType) =>
        ` ${(row?.deliveryAmount || 0)?.toLocaleString()} ${t("iqd")}`,
    },
    {
      title: t("driverAmount"),
      key: "driverAmount",
      render: (row: OrderDetailsDataType) =>
        ` ${(row?.driverAmount || 0)?.toLocaleString()} ${t("iqd")}`,
    },
    {
      title: `${t("fromCity")} -> ${t("toCity")} (${t("zone")})`,
      key: "fromCity",
      render: (row: OrderDetailsDataType) => (
        <p>{`${row?.order?.from.name} -> ${row?.order?.to.name} ${
          row?.order?.zone?.name ? `(${row?.order?.zone?.name})` : ""
        }`}</p>
      ),
    },
    {
      title: t("action"),
      key: "action",
      render: (row: OrderDetailsDataType) => {
        return (
          <div className="flex gap-2">
            <Button type="primary" icon={<IoPrintOutline />}>
              {t("print")}
            </Button>
          </div>
        );
      },
    },
  ] as ColumnsType<OrderDetailsDataType>[];
  const [displayColumns, setDisplayColumns] =
    React.useState<ColumnsType<OrderDetailsDataType>[]>(columns);

  React.useEffect(() => {
    setDisplayColumns(
      columns.filter((col) =>
        shownColumns.length > 0
          ? shownColumns?.includes(col.key as string)
          : true
      )
    );
    localStorage?.setItem(
      "shownColumns-order-details",
      JSON.stringify(shownColumns)
    );
  }, [shownColumns]);

  React.useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, []);

  const fetchData = async (signal: AbortSignal) => {
    try {
      setDrivers(await getDriver({ signal }));
      setSuppliers(await getSupplier({ signal }));
    } catch (error) {
      const errors = helpers.getErrorObjectKeyValue(error.response.data.errors);
      if (errors.length > 0) {
        errors.forEach((err) => {
          openNotification("error", err.label, err.error as string);
        });
      }
    }
  };
  const updateColumns = (columns: string[]) => {
    setShownColumns(columns);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <DataGrid<OrderDetailsDataType>
        title={t("OrderDetails")}
        columns={displayColumns}
        data={data}
        hasCreate={false}
        loading={
          navigation.state === "loading" || revalidator.state === "loading"
        }
        className="mt-4"
      >
        <Select
          className={"min-w-40 flex-1"}
          onSelect={(value, option) => {
            searchParams.set("statusName", t(option.label));
            searchParams.set("status", value);
            setSearchParams(searchParams);
          }}
          onClear={() => {
            searchParams.delete("statusName");
            searchParams.delete("status");
            setSearchParams(searchParams);
          }}
          value={searchParams.get("statusName")}
          allowClear
          placeholder={t("status")}
          options={helpers.orderStatus?.map((status) => ({
            label: t(status.label),
            value: status.value,
          }))}
        />
        <Select
          className={"min-w-40 flex-1"}
          onSelect={(value, option) => {
            searchParams.set("supplierName", option.supplier.name);
            searchParams.set("supplierId", value);
            setSearchParams(searchParams);
          }}
          onClear={() => {
            searchParams.delete("supplierName");
            searchParams.delete("supplierId");
            setSearchParams(searchParams);
          }}
          value={searchParams.get("supplierName")}
          allowClear
          placeholder={t("suppliers")}
          options={suppliers?.items?.map((supplier) => ({
            label: supplier.name,
            value: supplier.id,
            supplier,
          }))}
        />
        <Select
          className={"min-w-40 flex-1"}
          onSelect={(value, option) => {
            searchParams.set("driverId", value);
            searchParams.set(
              "driverName",
              `${option.driver.firstName} ${option.driver.middleName} ${option.driver.lastName}`
            );
            setSearchParams(searchParams);
          }}
          onClear={() => {
            searchParams.delete("driverName");
            searchParams.delete("driverId");
            setSearchParams(searchParams);
          }}
          allowClear
          value={searchParams.get("driverName")}
          placeholder={t("drivers")}
          options={drivers?.items?.map((driver) => ({
            label: `${driver.firstName} ${driver.middleName} ${driver.lastName}`,
            value: driver.id,
            driver,
          }))}
        />
        <Select
          className={"min-w-40 flex-1"}
          onChange={(value) => {
            if (value) {
              updateColumns(value);
            }
          }}
          mode="multiple"
          value={shownColumns}
          placeholder={t("changeColumns")}
          options={columns.map((col) => ({
            label: t(col.title),
            value: col.key,
          }))}
        />
        <Flex gap="large" align="center">
          <Flex justify="center" align="center" gap="small">
            <p>{t("fromDate")}:</p>
            <Input
              type="date"
              value={searchParams.get("fromDate") || ""}
              onChange={(e) => {
                searchParams.set("fromDate", e.target.value);
                setSearchParams(searchParams);
              }}
              onClear={() => {
                searchParams.delete("fromDate");
                setSearchParams(searchParams);
              }}
              allowClear
              className={"min-w-40 flex-1"}
              placeholder="startdate"
            />
          </Flex>
          <Flex justify="center" align="center" gap="small">
            <p>{t("toDate")}:</p>
            <Input
              value={searchParams.get("toDate") || ""}
              onChange={(e) => {
                searchParams.set("toDate", e.target.value);
                setSearchParams(searchParams);
              }}
              onClear={() => {
                searchParams.delete("toDate");
                setSearchParams(searchParams);
              }}
              type="date"
              allowClear
              className={"min-w-40 flex-1"}
              placeholder="startdate"
            />
          </Flex>
        </Flex>
      </DataGrid>
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
