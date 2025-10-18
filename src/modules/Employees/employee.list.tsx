import { useLoaderData, useNavigation, useRevalidator } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import Actions from "../../components/Actions";
import type { EmployeeDataType, EmployeeResType } from "./employee.type";
import DataGrid from "../../components/DataGrid";
import Actions from "../../components/Actions";
import type { ColumnsType } from "../../gloabal.type";

export default function Employees() {
  const data = useLoaderData() as EmployeeResType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const columns = [
    {
      title: t("name"),
      key: "name",
      sorter: true,
      render: (row: EmployeeDataType) =>
        `${row.firstName} ${row.middleName} ${row.lastName}`,
    },
    {
      title: t("phoneNumber"),
      key: "phoneNumber",
      sorter: true,
      render: (row: EmployeeDataType) =>
        `${row?.primaryPhone} - ${row?.secondaryPhone}`,
    },
    {
      title: t("email"),
      key: "email",
      sorter: true,
      render: (row: EmployeeDataType) => row?.email || "-",
    },
    {
      title: t("salary"),
      key: "salary",
      sorter: true,
      render: (row: EmployeeDataType) => row?.salary || "-",
    },
    {
      title: t("action"),
      key: "action",
      render: (row: EmployeeDataType) => {
        return (
          <div className="flex gap-2">
            <Actions id={row.id} hasShow={false} hasEdit />
          </div>
        );
      },
    },
  ] as ColumnsType<EmployeeDataType>[];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <DataGrid<EmployeeDataType>
        title={t("employees")}
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
