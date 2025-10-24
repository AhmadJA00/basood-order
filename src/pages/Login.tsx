import React from "react";
import { Form, type FormProps } from "antd";
import CInput from "../components/CInput";
import FormWrapper from "../components/FormWrapper";
import { HTTP } from "../axios";
import axios from "axios";
import type { LoginType } from "../gloabal.type";
import helpers from "../helpers";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import useNotification from "../hooks/useNotification";
import { useTranslation } from "react-i18next";

type FieldType = {
  email?: string;
  password?: string;
};

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState(false);
  const { setCurrentUser, setUserSeation, setUserLoggedIn } = useAuth();
  const { openNotification } = useNotification();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsLoading(true);
    try {
      delete axios.defaults.headers.common["Authorization"];
      const res = await HTTP.post("/user/login", values);

      if (res.status === 200) {
        setUserSeation({
          refreshToken: res.data.refreshToken,
          token: res.data?.token,
          expired: res.data?.expired,
          permissions: res.data?.permissions.join(","),
        });

        setCurrentUser({
          id: res.data?.user?.id,
          fullName: `${res.data?.user?.firstName} ${res.data?.user?.lastName}`,
          username: res.data?.user?.username,
          email: res.data?.user?.email,
          imageUrl: res.data?.user?.imageUrl,
          userType:
            res.data?.user?.userType === 3
              ? "supplier"
              : res.data?.user?.userType === 2
              ? "driver"
              : "admin",
        });
        helpers.setCookie("refreshtoken", res.data.refreshToken);
        helpers.setCookie("token", res?.data?.token);
        helpers.setCookie("expired", res?.data?.expired);
        helpers.setCookie("permissions", res?.data?.permissions.join(","));

        helpers.setCookie("id", res?.data?.user?.id);
        helpers.setCookie(
          "fullname",
          `${res.data?.user?.firstName} ${res.data?.user?.lastName}`
        );
        helpers.setCookie("username", res?.data?.user?.username);
        helpers.setCookie("email", res?.data?.user?.email);
        helpers.setCookie("imageurl", res?.data?.user?.imageUrl);
        helpers.setCookie(
          "usertype",
          res.data?.user?.userType === 3
            ? "supplier"
            : res.data?.user?.userType === 2
            ? "driver"
            : "admin"
        );
        setUserLoggedIn(true);

        HTTP.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data?.token}`;

        HTTP.defaults.headers.common["Branch"] = res.data?.branchId || null;

        navigate(
          new URLSearchParams(window.location.search).get("prevRouter") || "/"
        );
      }
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
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log(errorInfo);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br  from-primary-light to-primary ">
      <div className="max-w-lg mx-auto min-h-screen flex flex-col justify-center">
        <FormWrapper
          title={t("login")}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          isLoading={isLoading}
        >
          <CInput<LoginType>
            label={t("username")}
            name="username"
            rules={[{ required: true, message: "Please input your email!" }]}
          />
          <CInput<LoginType>
            label={t("password")}
            type="password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          />
        </FormWrapper>
      </div>
    </div>
  );
};
export default Login;
