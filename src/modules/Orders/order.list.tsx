import {
  useLoaderData,
  useNavigate,
  useNavigation,
  useRevalidator,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
// import Actions from "../../components/Actions";
import type {
  OrderDataType,
  OrderResDataType,
  OrderResType,
} from "./order.type";
import DataGrid from "../../components/DataGrid";
import Actions from "../../components/Actions";
import type { ColumnsType } from "../../gloabal.type";
import { Button, Flex, Tooltip } from "antd";
import { MdDeliveryDining } from "react-icons/md";
import React from "react";
import type { DriverDataType } from "../Drivers/driver.type";
import CModal from "../../components/CModal";
import CShowData from "../../components/CShowData";

export default function Orderes() {
  const data = useLoaderData() as OrderResType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [openDriverInfoModal, setOpenDriverInfoModal] = React.useState(false);

  const [currentDrivers, setCurrentDrivers] =
    React.useState<DriverDataType | null>(null);
  const columns = [
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
      title: `${t("fromCity")} -> ${t("toCity")} (${t("zone")})`,
      key: "fromCity",
      sorter: true,
      render: (row: OrderResDataType) => (
        <p>{`${row?.from.name} -> ${row.to.name} ${
          row?.zone?.name ? `(${row?.zone?.name})` : ""
        }`}</p>
      ),
    },
    {
      title: t("totalOrder"),
      key: "totalOrder",
      sorter: true,
      render: (row: OrderResDataType) =>
        `${row?.totalOrder.toLocaleString()} ${t("iqd")}`,
    },

    {
      title: t("action"),
      key: "action",
      render: (row: OrderResDataType) => {
        return (
          <div className="flex gap-2">
            <Actions
              id={row.id}
              hasShow={false}
              hasEdit={row.paymentTerm === 2}
            />
          </div>
        );
      },
    },
  ] as ColumnsType<OrderResDataType>[];

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
      </CModal>
    </div>
  );
}
