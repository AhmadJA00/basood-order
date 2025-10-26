import { Form, type FormProps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useParams, useRevalidator } from "react-router";
import { getPermissions, postRole, putRole } from "./role.api";
import CInput from "../../../components/CInput";
import FormWrapper from "../../../components/FormWrapper";
import type { Permission, RoleDataType } from "./role.type";
import CSelect from "../../../components/CSelect";
import helpers from "../../../helpers";
import useNotification from "../../../hooks/useNotification";

const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const revalidator = useRevalidator();
  const { openNotification } = useNotification();

  const [permissions, setPermissions] = React.useState<Permission[] | null>(
    null
  );

  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData() as RoleDataType;

  const fetchPermissions = async (signal: AbortSignal) => {
    try {
      setPermissions(await getPermissions({ signal }));
    } catch (error) {
      const errors = helpers.getErrorObjectKeyValue(error.response.data.errors);
      if (errors.length > 0) {
        errors.forEach((err) => {
          openNotification("error", err.label, err.error as string);
        });
      }
    }
  };
  React.useEffect(() => {
    const abortController = new AbortController();
    fetchPermissions(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, []);

  const onFinish: FormProps<RoleDataType>["onFinish"] = async (
    formData: RoleDataType
  ) => {
    try {
      setIsLoading(true);
      console.log(formData);
      if (id) {
        await putRole<RoleDataType>(formData, id);
        revalidator.revalidate();
      } else {
        await postRole<RoleDataType>(formData);
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

  const onFinishFailed: FormProps<RoleDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <FormWrapper<RoleDataType>
      title={id ? t("update") : t("create")}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={data}
      isLoading={isLoading}
    >
      <CInput<RoleDataType>
        name="title"
        label={t("title")}
        rules={[{ required: true, message: t("requiredField") }]}
      />

      <CSelect<RoleDataType>
        name="permissions"
        label={t("permissions")}
        multiple
        placeholder={t("select")}
        rules={[{ required: true, message: t("requiredField") }]}
        options={
          permissions?.map((permission: Permission) => ({
            label: permission.title,
            value: permission.id,
          })) || []
        }
      />
    </FormWrapper>
  );
};

export default Create;
