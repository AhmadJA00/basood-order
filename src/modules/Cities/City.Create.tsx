import { Form, type FormProps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useParams, useRevalidator } from "react-router";
import { postCity, putCity } from "./city.api";
import CInput from "../../components/CInput";
import FormWrapper from "../../components/FormWrapper";
import type { CityDataType } from "./city.type";
import helpers from "../../helpers";
import useNotification from "../../hooks/useNotification";

const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const revalidator = useRevalidator();
  const { openNotification } = useNotification();

  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData() as CityDataType;

  const onFinish: FormProps<CityDataType>["onFinish"] = async (
    formData: CityDataType
  ) => {
    try {
      setIsLoading(true);
      if (id) {
        await putCity<CityDataType>(formData, id);
        revalidator.revalidate();
      } else {
        await postCity<CityDataType>(formData);
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

  const onFinishFailed: FormProps<CityDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <FormWrapper<CityDataType>
      title={id ? t("update") : t("create")}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={data}
      isLoading={isLoading}
    >
      <CInput<CityDataType>
        name="name"
        label={t("name")}
        rules={[{ required: true, message: t("requiredField") }]}
      />

      <CInput<CityDataType> name="description" label={t("description")} />
    </FormWrapper>
  );
};

export default Create;
