import { useLoaderData, useNavigation, useRevalidator } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import Actions from "../../components/Actions";
import DataGrid from "../../../components/DataGrid";
import Actions from "../../../components/Actions";
import type { ColumnsType } from "../../../gloabal.type";
import { Button, Flex, Form, Tooltip, type FormProps } from "antd";
import React from "react";
import CModal from "../../../components/CModal";
import CShowData from "../../../components/CShowData";
import type { ChangeDriverAmountFormType } from "./driverorder.type";
import { putDriverAmount } from "./driverorder.api";
import type {
  OrderDetailsType,
  OrderResDataType,
} from "../../Orders/order.type";
import helpers from "../../../helpers";
import useNotification from "../../../hooks/useNotification";
import { GiTakeMyMoney } from "react-icons/gi";
import FormWrapper from "../../../components/FormWrapper";
import CInput from "../../../components/CInput";

export default function Orderes() {
  const data = useLoaderData() as OrderResDataType;
  const consistData = { items: data };
  console.log(consistData);
  const [form] = Form.useForm();

  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { openNotification } = useNotification();
  const [isLoading, setIsLoading] = React.useState(false);
  const [openChangeDriverPrice, setOpenChangeDriverPrice] =
    React.useState(false);
  const [currentOrder, setCurrentOrder] =
    React.useState<OrderDetailsType | null>(null);

  const onFinishChangeAmount: FormProps<ChangeDriverAmountFormType>["onFinish"] =
    async (formData: ChangeDriverAmountFormType) => {
      try {
        setIsLoading(true);
        await putDriverAmount<ChangeDriverAmountFormType>(
          formData,
          currentOrder?.id || ""
        );
        revalidator.revalidate();
        setOpenChangeDriverPrice(false);
      } catch (error) {
        const errors = helpers.getErrorObjectKeyValue(
          error.response.data.errors
        );
        if (errors.length > 0) {
          errors.forEach((err) => {
            openNotification("error", err.label, err.error as string);
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

  const onFinishFailedChangeAmount: FormProps<ChangeDriverAmountFormType>["onFinishFailed"] =
    (errorInfo) => {
      console.error("Failed:", errorInfo);
    };
  const columns = [
    {
      title: t("driver"),
      key: "driver",
      sorter: true,
      render: (row: OrderResDataType) => (
        <Flex justify="space-between" align="center" gap={"middle"}>
          <p>{`${row?.order?.driver?.firstName} ${row?.order?.driver.middleName} ${row?.order?.driver.lastName} `}</p>
        </Flex>
      ),
    },

    {
      title: t("totalOrder"),
      key: "totalOrder",
      sorter: true,
      render: (row: OrderResDataType) =>
        `${row?.order?.totalOrder.toLocaleString()} ${t("iqd")}`,
    },
    {
      title: t("totalOrder"),
      key: "totalOrder",
      sorter: true,
      render: (row: OrderResDataType) => `${helpers.getStatus(row?.status)} `,
    },

    {
      title: t("action"),
      key: "action",
      render: (row: OrderResDataType) => {
        return (
          <div className="flex gap-2">
            {" "}
            <Tooltip title={t(`changeDriverAmount`)} color="#003049">
              <Button
                type="primary"
                onClick={() => {
                  setOpenChangeDriverPrice(true);
                  setCurrentOrder(row);
                }}
              >
                <GiTakeMyMoney size={24} />
              </Button>
            </Tooltip>
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
        data={consistData}
        loading={
          navigation.state === "loading" || revalidator.state === "loading"
        }
        className="mt-4"
      />
      <CModal
        open={openChangeDriverPrice}
        width={600}
        setOpen={setOpenChangeDriverPrice}
      >
        <div className="p-3">
          <FormWrapper<ChangeDriverAmountFormType>
            title={t("changeDriverAmount")}
            form={form}
            onFinish={onFinishChangeAmount}
            onFinishFailed={onFinishFailedChangeAmount}
            initialValues={data}
            isLoading={isLoading}
          >
            <CShowData label={t("name")} data={currentOrder?.supplierName} />
            <CShowData
              label={t("productAmount")}
              data={`${currentOrder?.productAmount} ${t("iqd")}`}
            />
            <CShowData
              label={t("deliveryAmount")}
              data={`${currentOrder?.deliveryAmount} ${t("iqd")}`}
            />
            <CShowData
              label={t("driverAmount")}
              data={`${currentOrder?.driverAmount} ${t("iqd")}`}
            />

            <CInput<ChangeDriverAmountFormType>
              name="amount"
              label={t("newDriverAmount")}
              type="number"
              rules={[{ required: true, message: t("requiredField") }]}
            />
          </FormWrapper>
        </div>
      </CModal>
    </div>
  );
}
