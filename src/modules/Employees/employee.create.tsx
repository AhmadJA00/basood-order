import { Flex, Form, type FormProps } from "antd";
import type { EmployeeDataType } from "./employee.type";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useParams, useRevalidator } from "react-router";
import { postEmployee, putEmployee } from "./employee.api";
import CInput from "../../components/CInput";
import FormWrapper from "../../components/FormWrapper";
import PhoneNumberInput from "../../components/PhoneNumberInput";
import CCard from "../../components/CCard";
import CSwitch from "../../components/CSwitch";
import helpers from "../../helpers";
import useNotification from "../../hooks/useNotification";

const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const revalidator = useRevalidator();
  const { openNotification } = useNotification();

  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData() as EmployeeDataType;

  const onFinish: FormProps<EmployeeDataType>["onFinish"] = async (
    formData: EmployeeDataType
  ) => {
    try {
      console.log(formData);
      setIsLoading(true);
      if (id) {
        await putEmployee<EmployeeDataType>(formData, id);
        revalidator.revalidate();
      } else {
        await postEmployee<EmployeeDataType>(formData);
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

  const onFinishFailed: FormProps<EmployeeDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <FormWrapper<EmployeeDataType>
      title={id ? t("update") : t("create")}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={data}
      isLoading={isLoading}
    >
      <Flex justify="center" gap={"middle"} align="center">
        <CInput<EmployeeDataType>
          name="firstName"
          className="flex-1"
          label={t("firstName")}
          rules={[{ required: true, message: t("requiredField") }]}
        />
        <CInput<EmployeeDataType>
          className="flex-1"
          name="middleName"
          label={t("middleName")}
          rules={[{ required: true, message: t("requiredField") }]}
        />
        <CInput<EmployeeDataType>
          className="flex-1"
          name="lastName"
          label={t("lastName")}
          rules={[{ required: true, message: t("requiredField") }]}
        />
      </Flex>
      <Flex justify="center" gap={"middle"} align="center">
        <CInput<EmployeeDataType>
          name="email"
          label={t("email")}
          type="email"
          className="flex-1"
          rules={[{ required: true, message: t("requiredField") }]}
        />
        <PhoneNumberInput
          name="primaryPhone"
          label={t("primaryPhone")}
          className="flex-1"
          rules={[{ required: true, message: t("requiredField") }]}
        />
        <PhoneNumberInput
          name="secondaryPhone"
          label={t("secondaryPhone")}
          className="flex-1"
        />
      </Flex>
      <Flex justify="center" gap={"middle"} align="center">
        {!id && (
          <CInput<EmployeeDataType>
            name="salary"
            label={t("salary")}
            type="number"
            className="flex-1"
            rules={[{ required: true, message: t("requiredField") }]}
          />
        )}
        <CSwitch
          name="isMale"
          label={t("isMale")}
          rules={[{ required: true, message: t("requiredField") }]}
        />

        <CInput<EmployeeDataType>
          name="address"
          label={t("address")}
          className="flex-1"
          rules={[{ required: true, message: t("requiredField") }]}
        />

        <CInput<EmployeeDataType>
          name="birthDay"
          type="date"
          label={t("birthDay")}
          className="flex-1"
          rules={[{ required: true, message: t("requiredField") }]}
        />
      </Flex>
      <CCard title={t("emgCall")}>
        <Flex justify="center" gap={"middle"} align="center">
          <CInput<EmployeeDataType>
            name="emgFirstName"
            className="flex-1"
            label={t("firstName")}
            rules={[{ required: true, message: t("requiredField") }]}
          />
          <CInput<EmployeeDataType>
            className="flex-1"
            name="emgMiddleName"
            label={t("middleName")}
            rules={[{ required: true, message: t("requiredField") }]}
          />
          <CInput<EmployeeDataType>
            className="flex-1"
            name="emgLastName"
            label={t("lastName")}
            rules={[{ required: true, message: t("requiredField") }]}
          />
        </Flex>
        <Flex justify="center" gap={"middle"} align="center">
          <PhoneNumberInput
            name="emgPrimaryPhone"
            label={t("primaryPhone")}
            rules={[{ required: true, message: t("requiredField") }]}
            className="flex-1"
          />
          <PhoneNumberInput
            name="emgSecondaryPhone"
            label={t("secondaryPhone")}
            className="flex-1"
          />
          <CInput<EmployeeDataType>
            name="emgRelationShip"
            label={t("emgRelationShip")}
            className="flex-1"
            rules={[{ required: true, message: t("requiredField") }]}
          />
        </Flex>
      </CCard>
    </FormWrapper>
  );
};

export default Create;
