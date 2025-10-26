import { Form, type FormProps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { postNeighborhood, putNeighborhood } from "./neighborhood.api";
import CInput from "../../components/CInput";
import FormWrapper from "../../components/FormWrapper";
import type { NeighborhoodDataType } from "./neighborhood.type";
import CSelect from "../../components/CSelect";
import type { CityDataType, CityResType } from "../Cities/city.type";
import { getCity } from "../Cities/city.api";
import useNotification from "../../hooks/useNotification";
import helpers from "../../helpers";

const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { openNotification } = useNotification();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData() as NeighborhoodDataType;
  const [cities, setCities] = React.useState<CityResType | null>(null);

  const onFinish: FormProps<NeighborhoodDataType>["onFinish"] = async (
    formData: NeighborhoodDataType
  ) => {
    try {
      setIsLoading(true);
      if (id) {
        await putNeighborhood<NeighborhoodDataType>(formData, id);
        openNotification("success", t("updatedSuccessfully"));
      } else {
        await postNeighborhood<NeighborhoodDataType>(formData);
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

  const fetchCities = async (signal: AbortSignal) => {
    try {
      setCities(await getCity({ signal }));
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

    fetchCities(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, []);

  const onFinishFailed: FormProps<NeighborhoodDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <FormWrapper<NeighborhoodDataType>
      title={id ? t("update") : t("create")}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={data}
      isLoading={isLoading}
    >
      <CSelect<NeighborhoodDataType>
        name="cityId"
        label={t("selectCity")}
        placeholder={t("selectCity")}
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
      <CInput<NeighborhoodDataType>
        name="name"
        label={t("name")}
        rules={[{ required: true, message: t("requiredField") }]}
      />
      <CInput<NeighborhoodDataType>
        name="description"
        label={t("description")}
      />
    </FormWrapper>
  );
};

export default Create;
