import { Form, type FormProps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useParams, useRevalidator } from "react-router";
import { postExpensive, putExpensive } from "./expensive.api";
import CInput from "../../components/CInput";
import FormWrapper from "../../components/FormWrapper";
import type { ExpensiveDataType } from "./expensive.type";
import CSelect from "../../components/CSelect";
import type { CityDataType, CityResType } from "../Cities/city.type";
import { getSafe } from "../Safes/safe.api";

const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const revalidator = useRevalidator();

  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData() as ExpensiveDataType;
  const [safes, setSafes] = React.useState<CityResType | null>(null);

  const onFinish: FormProps<ExpensiveDataType>["onFinish"] = async (
    formData: ExpensiveDataType
  ) => {
    try {
      setIsLoading(true);
      if (id) {
        await putExpensive<ExpensiveDataType>(formData, id);
        revalidator.revalidate();
      } else {
        await postExpensive<ExpensiveDataType>(formData);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error creating LookingForInvestor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCities = async (signal: AbortSignal) => {
    try {
      setSafes(await getSafe({ queryOBJ: {}, id: "", signal }));
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    const abortController = new AbortController();
    fetchCities(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, []);

  const onFinishFailed: FormProps<ExpensiveDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <FormWrapper<ExpensiveDataType>
      title={id ? t("update") : t("create")}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={data}
      isLoading={isLoading}
    >
      <CSelect<ExpensiveDataType>
        name="safeId"
        label={t("safe")}
        placeholder={t("select")}
        rules={[{ required: true, message: t("requiredField") }]}
        options={
          safes?.items?.map((city: CityDataType) => ({
            label: t(city.name),
            value: city.id,
          })) || []
        }
        onSelect={(value) => {
          form.setFieldValue("safeId", value);
        }}
      />
      <CInput<ExpensiveDataType>
        name="amount"
        label={t("amount")}
        type="number"
        rules={[{ required: true, message: t("requiredField") }]}
      />
      <CInput<ExpensiveDataType>
        name="reason"
        label={t("reason")}
        rules={[{ required: true, message: t("requiredField") }]}
      />
    </FormWrapper>
  );
};

export default Create;
