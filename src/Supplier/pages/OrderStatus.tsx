import {
  useLoaderData,
  useNavigate,
  useNavigation,
  useRevalidator,
  useSearchParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import DataGrid from "../../components/DataGrid";
import type { ColumnsType } from "../../gloabal.type";
import { Button, Flex, Tooltip } from "antd";
import { MdDeliveryDining } from "react-icons/md";
import React from "react";
import CModal from "../../components/CModal";
import CShowData from "../../components/CShowData";
import type {
  OrderResDataType,
  OrderResType,
} from "../../modules/Orders/order.type";
import type { DriverDataType } from "../../modules/Drivers/driver.type";
import helpers from "../../helpers";
import { IoArrowBack } from "react-icons/io5";

export default function Orderes() {
  const data = useLoaderData() as OrderResType;
  const revalidator = useRevalidator();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [openDriverInfoModal, setOpenDriverInfoModal] = React.useState(false);
  const [currentDrivers, setCurrentDrivers] =
    React.useState<DriverDataType | null>(null);
  const navigate = useNavigate();
  const columns = [
    {
      title: t("productName"),
      key: "productName",
      sorter: true,
      render: (row: OrderResDataType) => `${row?.productName}`,
    },

    {
      title: t("driver"),
      key: "driver",
      sorter: true,
      render: (row: OrderResDataType) => (
        <Flex justify="space-between" align="center" gap={"middle"}>
          <p>{`${row?.driver?.firstName} ${row?.driver?.middleName} ${row?.driver?.lastName} `}</p>
          <Tooltip title={t(`knowDriver`)} color="#003049">
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
      title: `${t("productPrice")} + ${t("deliveryPrice")} (${t(
        "driverPrice"
      )}) = ${t("totalOrder")}`,
      key: "deliveryPrice",
      render: (row: OrderResDataType) => (
        <p className="text-nowrap text-xs">
          {`${row?.productPrice?.toLocaleString()} ${t(
            "iqd"
          )} + ${row?.deliveryPrice?.toLocaleString()} ${t(
            "iqd"
          )} (${row?.driverPrice?.toLocaleString()} ${t(
            "iqd"
          )}) = ${row?.totalOrder?.toLocaleString()} ${t("iqd")}`}
        </p>
      ),
    },
  ] as ColumnsType<OrderResDataType>[];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <Button
        type="default"
        icon={<IoArrowBack size={25} />}
        onClick={() => navigate("../")}
      />
      <DataGrid<OrderResDataType>
        title={t(helpers.getStatus(parseInt(searchParams.get("status"))))}
        columns={columns}
        size="small"
        hasCreate={false}
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
    </div>
  );
}
