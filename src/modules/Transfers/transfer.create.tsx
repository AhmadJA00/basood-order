import { Form, type FormProps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useParams, useRevalidator } from "react-router";
import { postTransfer, putTransfer } from "./transfer.api";
import CInput from "../../components/CInput";
import FormWrapper from "../../components/FormWrapper";
import type { TransferDataType } from "./transfer.type";
import CSelect from "../../components/CSelect";
import type { CityDataType, CityResType } from "../Cities/city.type";
import { getSafe } from "../Safes/safe.api";
import useNotification from "../../hooks/useNotification";
import helpers from "../../helpers";

const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const revalidator = useRevalidator();
  const { openNotification } = useNotification();

  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData() as TransferDataType;
  const [safes, setSafes] = React.useState<CityResType | null>(null);

  const onFinish: FormProps<TransferDataType>["onFinish"] = async (
    formData: TransferDataType
  ) => {
    try {
      setIsLoading(true);
      if (id) {
        await putTransfer<TransferDataType>(formData, id);
        revalidator.revalidate();
      } else {
        await postTransfer<TransferDataType>(formData);
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

  const fetchCities = async (signal: AbortSignal) => {
    try {
      setSafes(await getSafe({ queryOBJ: {}, id: "", signal }));
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

  const onFinishFailed: FormProps<TransferDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <FormWrapper<TransferDataType>
      title={id ? t("update") : t("create")}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={data}
      isLoading={isLoading}
    >
      <CSelect<TransferDataType>
        name="fromId"
        label={t("selectSafeBox")}
        placeholder={t("selectSafeBox")}
        rules={[{ required: true, message: t("requiredField") }]}
        options={
          safes?.items?.map((city: CityDataType) => ({
            label: t(city.name),
            value: city.id,
          })) || []
        }
        onSelect={(value) => {
          form.setFieldValue("fromId", value);
        }}
      />
      <CSelect<TransferDataType>
        name="toId"
        label={t("selectSafeBox")}
        placeholder={t("selectSafeBox")}
        rules={[{ required: true, message: t("requiredField") }]}
        options={
          safes?.items?.map((city: CityDataType) => ({
            label: t(city.name),
            value: city.id,
          })) || []
        }
        onSelect={(value) => {
          form.setFieldValue("toId", value);
        }}
      />
      <CInput<TransferDataType>
        name="amount"
        label={t("amount")}
        type="number"
        rules={[{ required: true, message: t("requiredField") }]}
      />
      <CInput<TransferDataType>
        name="driverAmount"
        label={t("driverAmount")}
        type="number"
        rules={[{ required: true, message: t("requiredField") }]}
      />
      <CInput<TransferDataType> name="description" label={t("description")} />
    </FormWrapper>
  );
};

export default Create;
