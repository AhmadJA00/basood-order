import { Flex, Form, type FormProps } from "antd";
import type { SupplierOrderDataType } from "./supplierorders.type";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useParams } from "react-router";
import FormWrapper from "../../components/FormWrapper";

import CInput from "../../components/CInput";
import PhoneNumberInput from "../../components/PhoneNumberInput";
import { postSupplierOrder, putSupplierOrder } from "./supplierorders.api";
import helpers from "../../helpers";
import useNotification from "../../hooks/useNotification";
const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { openNotification } = useNotification();

  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData() as SupplierOrderDataType;

  const onFinish: FormProps<SupplierOrderDataType>["onFinish"] = async (
    formData: SupplierOrderDataType
  ) => {
    try {
      setIsLoading(true);
      if (id) {
        await putSupplierOrder<SupplierOrderDataType>(formData, id);
      } else {
        await postSupplierOrder<SupplierOrderDataType>(formData);
      }
      navigate("../");
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

  const onFinishFaild: FormProps<SupplierOrderDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <FormWrapper
      title={t("supplierOrders")}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFaild}
      initialValues={data}
      isLoading={isLoading}
    >
      <Flex justify="center" gap={"middle"} vertical>
        <div className="flex flex-col lg:flex-row gap-2">
          <CInput<SupplierOrderDataType>
            name={"productName"}
            label={t("productName")}
            className="flex-1"
            rules={[{ required: true, message: t("requiredField") }]}
          />
          <CInput<SupplierOrderDataType>
            name={"productAmount"}
            label={t("productAmount")}
            type="number"
            className="flex-1"
            rules={[{ required: true, message: t("requiredField") }]}
          />
          <PhoneNumberInput
            name={"receiverNumberPhone"}
            label={t("receiverNumberPhone")}
            className="flex-1"
            rules={[{ required: true, message: t("requiredField") }]}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <CInput<SupplierOrderDataType>
            name={"invoiceNo"}
            label={t("invoiceNo")}
            className="flex-1"
            type="number"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <CInput<SupplierOrderDataType>
            name={"address"}
            label={t("address")}
            className="flex-1"
            rules={[{ required: true, message: t("requiredField") }]}
          />
          <CInput<SupplierOrderDataType>
            name={"remark"}
            label={t("note")}
            className="flex-1"
          />
        </div>
      </Flex>
    </FormWrapper>
  );
};

export default Create;
