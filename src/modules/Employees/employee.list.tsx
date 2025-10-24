import { useLoaderData, useNavigation, useRevalidator } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import Actions from "../../components/Actions";
import type {
  EmployeeDataType,
  EmployeeResType,
  SalaryFormUpdateType,
} from "./employee.type";
import DataGrid from "../../components/DataGrid";
import Actions from "../../components/Actions";
import type { ColumnsType } from "../../gloabal.type";
import { Button, Form, Tooltip, type FormProps } from "antd";
import { GiTakeMyMoney } from "react-icons/gi";
import CModal from "../../components/CModal";
import React from "react";
import FormWrapper from "../../components/FormWrapper";
import CInput from "../../components/CInput";
import { putSalary } from "./employee.api";
import helpers from "../../helpers";
import useNotification from "../../hooks/useNotification";
export default function Employees() {
  const data = useLoaderData() as EmployeeResType;
  const revalidator = useRevalidator();
  const { openNotification } = useNotification();
  const [openSalaryChangeModal, setOpenSalaryChangeModal] =
    React.useState(false);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [currentEmploye, setCurrentEmploye] =
    React.useState<EmployeeDataType | null>(null);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState(false);

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
        `${row?.primaryPhone}  ${
          row?.secondaryPhone ? ` - ${row?.secondaryPhone}` : ""
        }`,
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
            <Tooltip title={t(`changeSalary`)} color="#003049">
              <Button
                type="primary"
                onClick={() => {
                  setOpenSalaryChangeModal(true);
                  setCurrentEmploye(row);
                }}
              >
                <GiTakeMyMoney size={24} />
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ] as ColumnsType<EmployeeDataType>[];

  const onFinish: FormProps<SalaryFormUpdateType>["onFinish"] = async (
    formData: SalaryFormUpdateType
  ) => {
    try {
      setIsLoading(true);
      await putSalary<SalaryFormUpdateType>(formData, currentEmploye?.id || "");
      revalidator.revalidate();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      const errors = helpers.getErrorObjectKeyValue(error.response.data.errors);
      if (errors.length > 0) {
        errors.forEach((err) => {
          openNotification("error", err.label, err.error as string);
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed: FormProps<SalaryFormUpdateType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

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
      <CModal
        open={openSalaryChangeModal}
        width={600}
        setOpen={setOpenSalaryChangeModal}
      >
        <div className="p-3">
          <FormWrapper<SalaryFormUpdateType>
            title={t("changeSalary")}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={data}
            isLoading={isLoading}
          >
            <p>
              <span className="font-bold">{t("name")} :</span>
              {currentEmploye?.firstName} {currentEmploye?.middleName}{" "}
              {currentEmploye?.lastName}
            </p>
            <p>
              <span className="font-bold">{t("currentSalary")} :</span>
              {currentEmploye?.salary} IQD
            </p>
            <CInput<SalaryFormUpdateType>
              name="newSalary"
              label={t("newSalary")}
              type="number"
              rules={[{ required: true, message: t("requiredField") }]}
            />
          </FormWrapper>
        </div>
      </CModal>
    </div>
  );
}
