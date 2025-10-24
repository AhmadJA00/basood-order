import { Form, type FormProps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useParams, useRevalidator } from "react-router";
import { postSafe, putSafe } from "./safe.api";
import CInput from "../../components/CInput";
import FormWrapper from "../../components/FormWrapper";
import type { SafeDataType } from "./safe.type";
import helpers from "../../helpers";
import useNotification from "../../hooks/useNotification";

const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const revalidator = useRevalidator();
  const { openNotification } = useNotification();
  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData() as SafeDataType;

  const onFinish: FormProps<SafeDataType>["onFinish"] = async (
    formData: SafeDataType
  ) => {
    try {
      setIsLoading(true);
      if (id) {
        await putSafe<SafeDataType>(formData, id);
        revalidator.revalidate();
      } else {
        const res = await postSafe<SafeDataType>(formData);
        console.log(res);
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

  const onFinishFailed: FormProps<SafeDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <FormWrapper<SafeDataType>
      title={id ? t("update") : t("create")}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={data}
      isLoading={isLoading}
    >
      <CInput<SafeDataType>
        name="name"
        label={t("name")}
        rules={[{ required: true, message: t("requiredField") }]}
      />

      <CInput<SafeDataType>
        name="initialBalance"
        disabled={!!id}
        type="number"
        label={t("initialBalance")}
        rules={[{ required: true, message: t("requiredField") }]}
      />
    </FormWrapper>
  );
};

export default Create;
