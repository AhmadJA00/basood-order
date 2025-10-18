import { Form, type FormProps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useParams, useRevalidator } from "react-router";
import { postZone, putZone } from "./zone.api";
import CInput from "../../components/CInput";
import FormWrapper from "../../components/FormWrapper";
import type { ZoneDataType } from "./zone.type";
import CSelect from "../../components/CSelect";
import type { CityDataType, CityResType } from "../Cities/city.type";
import { getCity } from "../Cities/city.api";

const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const revalidator = useRevalidator();

  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData() as ZoneDataType;
  const [cities, setCities] = React.useState<CityResType | null>(null);

  const onFinish: FormProps<ZoneDataType>["onFinish"] = async (
    formData: ZoneDataType
  ) => {
    try {
      setIsLoading(true);
      if (id) {
        await putZone<ZoneDataType>(formData, id);
        revalidator.revalidate();
      } else {
        await postZone<ZoneDataType>(formData);
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
      setCities(await getCity({ queryOBJ: {}, id: "", signal }));
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

  const onFinishFailed: FormProps<ZoneDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <FormWrapper<ZoneDataType>
      title={id ? t("update") : t("create")}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={data}
      isLoading={isLoading}
    >
      <CSelect<ZoneDataType>
        name="cityId"
        label={t("selectAccount")}
        placeholder={t("selectAccount")}
        rules={[{ required: true, message: t("requiredField") }]}
        options={
          cities?.items?.map((city: CityDataType) => ({
            label: t(city.name),
            value: city.id,
          })) || []
        }
        onSelect={(value) => {
          form.setFieldValue("accountId", value);
        }}
      />
      <CInput<ZoneDataType>
        name="name"
        label={t("name")}
        rules={[{ required: true, message: t("requiredField") }]}
      />
      <CInput<ZoneDataType> name="description" label={t("description")} />
    </FormWrapper>
  );
};

export default Create;
