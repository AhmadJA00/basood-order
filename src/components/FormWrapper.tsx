import React from "react";
import { Button, Card, Flex, Form, type FormProps } from "antd"; // ✅ Import from 'antd'
import Loading from "./Loading";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router";
import { IoArrowBack } from "react-icons/io5";

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
  hasShow?: boolean;
  hasNoBackButton?: boolean;
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
  hasShow = false,
  hasNoBackButton = false,
}: FormWrapperProps<FieldType>) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Card
      title={
        <Flex
          justify="space-between"
          align="center"
          className="bg-gradient-to-br  from-primary-light from-40% to-primary !px-5"
        >
          <p className="text-2xl py-3 text-center  bg-gradient-to-br  flex-1">
            {title}
          </p>
          {!hasNoBackButton && (
            <Button
              type="default"
              icon={<IoArrowBack size={25} />}
              onClick={() => navigate("../")}
            />
          )}
        </Flex>
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
        {!noSubmit &&
          (hasShow && pathname.includes("/show") ? (
            // <Button
            //   type="primary"
            //   htmlType={"button"}
            //   loading={isLoading}
            //   onClick={() => {
            //     if (hasShow && id) {
            //       const oldUrl = pathname.split("/");
            //       const basePath = oldUrl.slice(0, -2);

            //       const newPathname = basePath.join("/");

            //       navigate(`${newPathname}/edit/${id}`);
            //       window.scrollTo({ top: 0, behavior: "smooth" });
            //     }
            //   }}
            //   block
            // >
            //   {t("edit")}
            // </Button>
            ""
          ) : (
            <Button
              type="primary"
              htmlType={"submit"}
              loading={isLoading}
              block
            >
              {isLoading ? t("processing") : id ? t("update") : t(submitText)}
            </Button>
          ))}
      </Form>
    </Card>
  );
};

export default FormWrapper;
