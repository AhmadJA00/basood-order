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
import { createPortal } from "react-dom";

import PrintPreview from "../../../components/PrintPreview";
import DriverOrderContent, {
  type OrderDriverContentPrintProps,
} from "../../../components/DriverOrderContent";
import type { OrderSupplierContentPrintProps } from "../../../components/SupplierOrderContent";
import SupplierOrderContent from "../../../components/SupplierOrderContent";
import PrintMiniPreview from "../../../components/PrintMiniPreview";

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


      const [printData, setPrintData] =
    React.useState<OrderSupplierContentPrintProps | OrderDriverContentPrintProps | string[] | null >();
  const [opnePrintModal, setOpnePrintModal] = React.useState<"sup" | "dir" | "qr" | null>(null);

  const [currentSupplier, setCurrentSupplier] =
    React.useState<SupplierDataType | null>(null);
  const [openSupplierInfoModal, setOpenSupplierInfoModal] =
    React.useState(false);

  const [currentDrivers, setCurrentDrivers] =
    React.useState<DriverDataType | null>(null);
  const [openDriverInfoModal, setOpenDriverInfoModal] = React.useState(false);

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
              {row?.driver?.firstName} {row?.driver?.middleName}{" "}
              {row?.driver?.lastName}
            </p>
            <Tooltip title={t(`knowSupplier`)} color="#003049">
              <Button
                type="primary"
                onClick={() => {
                  setOpenDriverInfoModal(true);
                  setCurrentDrivers(row?.driver);
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
      title: t("productPrice"),
      key: "productPrice",
      render: (row: OrderDetailsDataType) =>
        ` ${(row?.productPrice || 0)?.toLocaleString()} ${t("iqd")}`,
    },
    {
      title: t("deliveryPrice"),
      key: "deliveryPrice",
      render: (row: OrderDetailsDataType) =>
        ` ${(row?.deliveryPrice || 0)?.toLocaleString()} ${t("iqd")}`,
    },
    {
      title: t("driverPrice"),
      key: "driverPrice",
      render: (row: OrderDetailsDataType) =>
        ` ${(row?.driverPrice || 0)?.toLocaleString()} ${t("iqd")}`,
    },
    {
      title: `${t("fromCity")} -> ${t("toCity")} (${t("neighborhood")})`,
      key: "fromCity",
      render: (row: OrderDetailsDataType) => (
        <p>{`${row?.toCity.name} ${
          row?.neighborhood?.name ? `(${row?.neighborhood?.name})` : ""
        }`}</p>
      ),
    },
    // {
    //   title: t("action"),
    //   key: "action",
    //   render: (row: OrderDetailsDataType) => {
    //     return (
    //       <div className="flex gap-2">
    //         <Button type="primary" icon={<IoPrintOutline />}>
    //           {t("print")}
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
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
      {createPortal(
        <>
          {opnePrintModal === "dir" && printData as OrderDriverContentPrintProps && (
            <PrintPreview
              title="ڕاپۆرتی شۆفێر"
              content={<DriverOrderContent {...printData as OrderDriverContentPrintProps} />}
              fileName="Order_Report.pdf"
              setOpen={setOpnePrintModal}
            />
          )}

          {opnePrintModal === "sup" && printData as OrderSupplierContentPrintProps && (
            <PrintPreview
              title="ڕاپۆرتی دوکاندار"
              content={<SupplierOrderContent {...printData as OrderSupplierContentPrintProps} />}
              fileName="Order_Report.pdf"
              setOpen={setOpnePrintModal}
            />
          )}

           {opnePrintModal === "qr" && printData as string[] && (
            <PrintMiniPreview
              title="کۆد"
              ids={printData as string[]}
              setOpen={setOpnePrintModal}
            />
          )}
        </>,
        document.body
      )}

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
          <Button
            onClick={() => {
              if (
                data.items!.length > 0 &&
                searchParams.get("driverId") &&
                searchParams.get("fromDate") &&
                searchParams.get("toDate")
              ) {
                const printData: OrderDriverContentPrintProps = {
                  orderDetails: data.items,
                  driver: `${data.items[0].driver.firstName} ${data.items[0].driver.middleName} ${data.items[0].driver.lastName}`,
                  driverId: data.items[0].driver.id,
                  toCity: data.items[0].toCity.name,
                  neighborhood: data.items[0].neighborhood?.name ?? null,
                  fromDate: searchParams.get("fromDate")!,
                  toDate: searchParams.get("toDate")!,
                };

                setPrintData(printData);
                setOpnePrintModal("dir");
              } else {
                openNotification(
                  "warning",
                  t("makeSureYouHaveSelectedDriverIdFromDateToDate")
                );
              }
            }}
          >
            {t("print")}
          </Button>
          

          <Button
            onClick={() => {
              if (
                data.items!.length > 0 &&
                searchParams.get("supplierId") &&
                searchParams.get("fromDate") &&
                searchParams.get("toDate")
              ) {
                const printData: OrderSupplierContentPrintProps = {
                  orderDetails: data.items,
                  supplier: data.items[0].supplier.name,
                  supplierId: data.items[0].supplier.id!,
                  fromDate: searchParams.get("fromDate")!,
                  toDate: searchParams.get("toDate")!,
                };

                setPrintData(printData);
                setOpnePrintModal("sup");
              } else {
                openNotification(
                  "warning",
                  t("makeSureYouHaveSelectedSupplierIdFromDateToDate")
                );
              }
            }}
            type="primary"
            icon={<IoPrintOutline />}
          >
            {t("print")} + Supplier
          </Button>

          <Button
            onClick={() => {
                const printData: string[]  = [
  "bdbdc1df-a449-4f54-acf1-536fc78cd4e9",
  "36bc53c9-32bb-40fc-80a6-7e37f44627fb",
  "f484a9f9-a794-4048-8bbc-10b150a3964e",
  "e7684fc7-1dec-4b75-9221-3d5dde67d27e",
  "b662e2ea-5ffe-4dfd-8b2d-62479ab381c6",
  "d4b5c947-081d-44e0-84a5-8acbaff2a787",
  "783cf0c6-ad16-4f08-bc68-95b6b2e92777",
  "6a833b69-8757-46b7-9cf8-f34cb30038c3",
  "191ea2ea-199f-4830-8ccc-78e802d8a34a",
  "3a10c035-52c9-465f-88c5-34fded299d9b",
  "4de604e8-4c0c-43d2-9d7e-b8a3f18fa4c2",
  "b4f386d4-475e-4c20-bdb6-86b47c285287",
  "6f254f58-0195-4cb6-871d-3457619d157a",
  "13685ebd-f970-4809-a069-b4d97f642133",
  "d02f06da-b608-4d85-b80b-0b1feab8dc9c"
]

                setPrintData(printData);
                setOpnePrintModal("qr");
            }}
            type="primary"
            icon={<IoPrintOutline />}
          >
            {t("print")} + QrCode
          </Button>
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
