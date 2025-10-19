import { useLoaderData, useNavigation, useRevalidator } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import Actions from "../../components/Actions";
import type { DriverDataType, DriverResType } from "./driver.type";
import DataGrid from "../../components/DataGrid";
import Actions from "../../components/Actions";
import type { ColumnsType } from "../../gloabal.type";
import { Button, Tooltip } from "antd";
import { BiSolidUserAccount } from "react-icons/bi";
import { createDriverAccount } from "./driver.api";

export default function Driveres() {
  const data = useLoaderData() as DriverResType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const createAccount = async (id: string) => {
    try {
      if (id) {
        await createDriverAccount(id);
        revalidator.revalidate();
      }
    } catch (error) {
      console.error("Error creating LookingForInvestor:", error);
    }
  };

  const columns = [
    {
      title: t("name"),
      key: "name",
      sorter: true,
      render: (row: DriverDataType) =>
        `${row.firstName} ${row.middleName} ${row.lastName}`,
    },
    {
      title: t("phoneNumber"),
      key: "phoneNumber",
      sorter: true,
      render: (row: DriverDataType) =>
        `${row?.primaryPhone} - ${row?.secondaryPhone}`,
    },
    {
      title: t("driverLicense"),
      key: "driverLicense",
      sorter: true,
      render: (row: DriverDataType) => row?.driverLicense || "-",
    },
    {
      title: t("action"),
      key: "action",
      render: (row: DriverDataType) => {
        return (
          <div className="flex gap-2">
            <Actions id={row.id} hasShow={false} hasEdit />{" "}
            <Tooltip title={t(`createAccount`)} color="#003049">
              <Button
                type="primary"
                onClick={() => {
                  createAccount(row.id);
                }}
              >
                <BiSolidUserAccount />
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ] as ColumnsType<DriverDataType>[];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <DataGrid<DriverDataType>
        title={t("drivers")}
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
