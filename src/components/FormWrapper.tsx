import React from "react";
import { Button, Card, Form, type FormProps } from "antd"; // ✅ Import from 'antd'
import Loading from "./Loading";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

type FormWrapperProps<FieldType = any> = {
  form: FormProps<FieldType>["form"];
  title: string;
  children: React.ReactNode;
  onFinish: FormProps<FieldType>["onFinish"];
  onFinishFailed?: FormProps<FieldType>["onFinishFailed"];
  isLoading?: boolean;
  initialValues?: any;
  className?: string;
  noSubmit?: boolean;
  submitText?: string;
};

const FormWrapper = <FieldType extends {} = any>({
  form,
  title,
  children,
  onFinish,
  onFinishFailed,
  isLoading,
  initialValues,
  className = "",
  noSubmit,
  submitText = "submit",
}: FormWrapperProps<FieldType>) => {
  const { t } = useTranslation();
  const { id } = useParams();
  return (
    <Card
      title={
        <p className="text-2xl py-3 text-center  bg-gradient-to-br  from-primary-light from-40% to-primary ">
          {title}
        </p>
      }
      className="relative overflow-hidden shadow-lg"
      styles={{
        header: {
          padding: "0px",
          color: "white",
        },
      }}
    >
      <Loading isLoading={isLoading || false} />
      <Form<FieldType>
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        initialValues={initialValues}
        className={`!space-y-5 ${className}`}
      >
        {children}
        {!noSubmit && (
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            {isLoading ? t("processing") : id ? t("update") : t(submitText)}
          </Button>
        )}
      </Form>
    </Card>
  );
};

export default FormWrapper;
