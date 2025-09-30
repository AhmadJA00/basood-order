import React from "react";
import { Button, Form, type FormProps } from "antd"; // ✅ Consistent import
import { useNavigate } from "react-router";
import CInput from "./CInput";
import { useTranslation } from "react-i18next";
import FormWrapper from "./FormWrapper";
import { HTTP } from "../axios";
import axios from "axios";
import type { LoginType } from "../gloabal.type";
import helpers from "../helpers";
import useAuth from "../hooks/useAuth";

type FieldType = {
  email?: string;
  password?: string;
};

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setCurrentUser, setUserSeation, setUserLoggedIn } = useAuth();

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
        setUserLoggedIn(true);

        HTTP.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data?.token}`;

        HTTP.defaults.headers.common["Branch"] = res.data?.branchId || null;

        navigate(
          new URLSearchParams(window.location.search).get("prevRouter") || "/"
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {};

  return (
    <div className="w-screen h-screen bg-gradient-to-br  from-primary-light to-primary ">
      <div className="max-w-lg mx-auto min-h-screen flex flex-col justify-center">
        <FormWrapper
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          isLoading={isLoading}
          columns={1}
        >
          <CInput<LoginType>
            label="username"
            name="username"
            rules={[{ required: true, message: "Please input your email!" }]}
          />
          <CInput<LoginType>
            type="password"
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          />

          <Button loading={isLoading} type="primary" htmlType="submit" block>
            Submit
          </Button>
        </FormWrapper>
      </div>
    </div>
  );
};
export default Login;
