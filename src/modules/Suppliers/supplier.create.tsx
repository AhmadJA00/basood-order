import { Form, type FormProps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useParams, useRevalidator } from "react-router";
import { postSupplier, putSupplier } from "./supplier.api";
import CInput from "../../components/CInput";
import FormWrapper from "../../components/FormWrapper";
import type { SupplierDataType } from "./supplier.type";
import PhoneNumberInput from "../../components/PhoneNumberInput";
import helpers from "../../helpers";
import useNotification from "../../hooks/useNotification";

const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const revalidator = useRevalidator();
  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData();
  const { openNotification } = useNotification();

  const onFinish: FormProps<SupplierDataType>["onFinish"] = async (
    formData: SupplierDataType
  ) => {
    try {
      setIsLoading(true);
      if (id) {
        await putSupplier<SupplierDataType>(formData, id);
        revalidator.revalidate();
      } else {
        await postSupplier<SupplierDataType>(formData);
      }
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

  const onFinishFailed: FormProps<SupplierDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <FormWrapper<SupplierDataType>
      title={id ? t("update") : t("create")}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={data}
      isLoading={isLoading}
    >
      <CInput<SupplierDataType>
        name="name"
        label={t("name")}
        rules={[{ required: true, message: t("requiredField") }]}
      />
      <CInput<SupplierDataType>
        name="address"
        label={t("address")}
        rules={[{ required: true, message: t("requiredField") }]}
      />
      <PhoneNumberInput
        name="primaryPhone"
        label={t("primaryPhone")}
        rules={[{ required: true, message: t("requiredField") }]}
      />
      <PhoneNumberInput name="secondaryPhone" label={t("secondaryPhone")} />
      <CInput<SupplierDataType> name="description" label={t("description")} />
    </FormWrapper>
  );
};

export default Create;
