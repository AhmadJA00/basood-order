import { Flex, Form, type FormProps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useParams, useRevalidator } from "react-router";
import { postUser, putUser } from "./user.api";
import CInput from "../../components/CInput";
import FormWrapper from "../../components/FormWrapper";
import type { UserDataType } from "./user.type";
import CSelect from "../../components/CSelect";
import type { RoleListDataType } from "./Roles/role.type";
import { getRoleList } from "./Roles/role.api";
import type { BranchListDataType } from "../Branches/branch.type";
import { getBranchList } from "../Branches/branch.api";
import useNotification from "../../hooks/useNotification";
import helpers from "../../helpers";

const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const revalidator = useRevalidator();
  const { openNotification } = useNotification();

  const [roles, setRoles] = React.useState<RoleListDataType[] | null>(null);
  const [branches, setBranches] = React.useState<BranchListDataType[] | null>(
    null
  );

  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData() as UserDataType;

  const fetchRoles = async (signal: AbortSignal) => {
    try {
      setRoles(await getRoleList({ signal }));
    } catch (error) {
      const errors = helpers.getErrorObjectKeyValue(error.response.data.errors);
      if (errors.length > 0) {
        errors.forEach((err) => {
          openNotification("error", err.label, err.error as string);
        });
      }
    }
  };

  const fetchBranches = async (signal: AbortSignal) => {
    try {
      setBranches(await getBranchList({ signal }));
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
    fetchRoles(abortController.signal);
    fetchBranches(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, []);

  const onFinish: FormProps<UserDataType>["onFinish"] = async (
    formData: UserDataType
  ) => {
    try {
      setIsLoading(true);
      if (id) {
        await putUser<UserDataType>(
          { ...formData, driverId: 2, userType: 2 },
          id
        );
        revalidator.revalidate();
      } else {
        await postUser<UserDataType>({
          ...formData,
          supplierId: 1,
          userType: 3,
        });
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

  const onFinishFailed: FormProps<UserDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <FormWrapper<UserDataType>
      title={id ? t("update") : t("create")}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={data}
      isLoading={isLoading}
    >
      <Flex align="center" gap={"middle"}>
        <CInput<UserDataType>
          name="firstName"
          className="flex-1"
          label={t("firstName")}
          rules={[{ required: true, message: t("requiredField") }]}
        />
        <CInput<UserDataType>
          name="lastName"
          className="flex-1"
          label={t("lastName")}
          rules={[{ required: true, message: t("requiredField") }]}
        />
        <CInput<UserDataType>
          name="username"
          className="flex-1"
          label={t("username")}
          rules={[{ required: true, message: t("requiredField") }]}
        />
        <CInput<UserDataType>
          className="flex-1"
          name="email"
          label={t("email")}
        />
      </Flex>

      <Flex align="center" gap={"middle"}>
        <CInput<UserDataType>
          name="password"
          label={t("password")}
          type="password"
          validateTrigger={["onBlur", "onChange"]}
          rules={[
            {
              required: true,
              message: t("enterPassword"),
            },
            {
              min: 6,
              message: t("passwordMinLength"),
            },
          ]}
          className="flex-1"
          hasFeedback
        />
        <CInput<UserDataType>
          name="confirmPassword"
          label={t("confirmPassword")}
          type="password"
          validateTrigger={["onBlur", "onChange"]}
          rules={[
            {
              required: true,
              message: t("confirmPassword"),
            },
            {
              min: 6,
              message: t("passwordMinLength"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t("passwordsDontMatch")));
              },
            }),
          ]}
          hasFeedback
          className="flex-1"
        />
      </Flex>

      <CSelect<UserDataType>
        name="roleId"
        label={t("roles")}
        placeholder={t("select")}
        rules={[{ required: true, message: t("requiredField") }]}
        options={
          roles?.map((role: RoleListDataType) => ({
            label: role.title,
            value: role.id,
          })) || []
        }
      />
      <CSelect<UserDataType>
        name="branchIds"
        label={t("branches")}
        placeholder={t("select")}
        multiple
        rules={[{ required: true, message: t("requiredField") }]}
        options={
          branches?.map((branch: BranchListDataType) => ({
            label: branch.name,
            value: branch.id,
          })) || []
        }
      />
    </FormWrapper>
  );
};

export default Create;
