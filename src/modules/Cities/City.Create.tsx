import { Form, type FormProps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useParams, useRevalidator } from "react-router";
import { postCity, putCity } from "./city.api";
import CInput from "../../components/CInput";
import FormWrapper from "../../components/FormWrapper";
import type { CityDataType } from "./city.type";

const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const revalidator = useRevalidator();

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
      console.error("Error creating LookingForInvestor:", error);
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
      title={id ? t("cityUpdate") : t("cityCreate")}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={data}
      isLoading={isLoading}
    >
      <CInput<CityDataType>
        name="name"
        label={t("name")}
        rules={[{ required: true, message: t("inputtitle") }]}
      />

      <CInput<CityDataType> name="description" label={t("description")} />
    </FormWrapper>
  );
};

export default Create;
