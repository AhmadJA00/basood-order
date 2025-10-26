import { Flex, Form, type FormProps } from "antd";
import type { DriverDataType } from "./driver.type";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { postDriver, putDriver } from "./driver.api";
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
  const { openNotification } = useNotification();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData() as DriverDataType;

  const onFinish: FormProps<DriverDataType>["onFinish"] = async (
    formData: DriverDataType
  ) => {
    try {
      setIsLoading(true);
      if (id) {
        await putDriver<DriverDataType>(formData, id);
        openNotification("success", t("updatedSuccessfully"));
      } else {
        await postDriver<DriverDataType>(formData);
        openNotification("success", t("createdSuccessfully"));
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

  const onFinishFailed: FormProps<DriverDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <FormWrapper<DriverDataType>
      title={id ? t("update") : t("create")}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={data}
      isLoading={isLoading}
    >
      <Flex justify="center" gap={"middle"} align="center">
        <CInput<DriverDataType>
          name="firstName"
          className="flex-1"
          label={t("firstName")}
          rules={[{ required: true, message: t("requiredField") }]}
        />
        <CInput<DriverDataType>
          className="flex-1"
          name="middleName"
          label={t("middleName")}
          rules={[{ required: true, message: t("requiredField") }]}
        />
        <CInput<DriverDataType>
          className="flex-1"
          name="lastName"
          label={t("lastName")}
          rules={[{ required: true, message: t("requiredField") }]}
        />{" "}
        <CSwitch<DriverDataType>
          name="isToCustomer"
          label={t("isToCustomer")}
          rules={[{ required: true, message: t("requiredField") }]}
        />
      </Flex>
      <Flex justify="center" gap={"middle"} align="center">
        <CInput<DriverDataType>
          name="driverLicense"
          label={t("driverLicense")}
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
        <CInput<DriverDataType>
          name="birthDay"
          type="date"
          label={t("birthDay")}
          className="flex-1"
          rules={[{ required: true, message: t("requiredField") }]}
        />
      </Flex>
      <CCard title={t("emgCall")}>
        <Flex justify="center" gap={"middle"} align="center">
          <CInput<DriverDataType>
            name="emgFirstName"
            className="flex-1"
            label={t("firstName")}
          />
          <CInput<DriverDataType>
            className="flex-1"
            name="emgMiddleName"
            label={t("middleName")}
          />
          <CInput<DriverDataType>
            className="flex-1"
            name="emgLastName"
            label={t("lastName")}
          />
        </Flex>
        <Flex justify="center" gap={"middle"} align="center">
          <PhoneNumberInput
            name="emgPrimaryPhone"
            label={t("primaryPhone")}
            className="flex-1"
          />
          <PhoneNumberInput
            name="emgSecondaryPhone"
            label={t("secondaryPhone")}
            className="flex-1"
          />
          <CInput<DriverDataType>
            name="emgRelationShip"
            label={t("emgRelationShip")}
            className="flex-1"
          />
        </Flex>
      </CCard>
    </FormWrapper>
  );
};

export default Create;
