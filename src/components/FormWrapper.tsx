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
  columns?: 1 | 2 | 3 | 4;
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
  columns = 3,
}: FormWrapperProps<FieldType>) => {
  const { t } = useTranslation();
  const { id } = useParams();
  return (
    <Card className="relative">
      <p className="text-3xl py-2 text-center">{title}</p>
      <Loading isLoading={isLoading || false} />
      <Form<FieldType>
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className={`grid grid-cols-1 gap-x-5 gap-y-4 ${className}`}
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        initialValues={initialValues}
      >
        {children}
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          {isLoading ? t("processing") : id ? t("update") : t("submit")}
        </Button>
      </Form>
    </Card>
  );
};

export default FormWrapper;
