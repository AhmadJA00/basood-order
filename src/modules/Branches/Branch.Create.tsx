import { Form, type FormProps } from "antd";
import type { BranchDataType } from "./branch.type";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useParams, useRevalidator } from "react-router";
import { postBranch, putBranch } from "./branch.api";
import CInput from "../../components/CInput";
import FormWrapper from "../../components/FormWrapper";

const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const revalidator = useRevalidator();

  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData() as BranchDataType;

  const onFinish: FormProps<BranchDataType>["onFinish"] = async (
    formData: BranchDataType
  ) => {
    try {
      setIsLoading(true);
      if (id) {
        await putBranch<BranchDataType>(formData, id);
        revalidator.revalidate();
      } else {
        await postBranch<BranchDataType>(formData);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error creating LookingForInvestor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed: FormProps<BranchDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <FormWrapper<BranchDataType>
      title={id ? t("branchUpdate") : t("branchCreate")}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={data}
      isLoading={isLoading}
    >
      <CInput<BranchDataType>
        name="name"
        label={t("name")}
        rules={[{ required: true, message: t("inputtitle") }]}
      />

      <CInput<BranchDataType>
        rules={[{ required: true, message: t("inputtitle") }]}
        name="location"
        label={t("location")}
      />

      <CInput<BranchDataType> name="description" label={t("description")} />
    </FormWrapper>
  );
};

export default Create;
