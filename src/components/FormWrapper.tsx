import React from "react";
import { Card, Form, type FormProps } from "antd"; // ✅ Import from 'antd'
import Loading from "./Loading";

type FormWrapperProps<FieldType = any> = {
  form: FormProps<FieldType>["form"];
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
  children,
  onFinish,
  onFinishFailed,
  isLoading,
  initialValues,
  className = "",
  columns = 3,
}: FormWrapperProps<FieldType>) => {
  return (
    <Card className="relative">
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
      </Form>
    </Card>
  );
};

export default FormWrapper;
