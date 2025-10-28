import { Flex, Form, type FormProps } from "antd";
import type { SupplierOrderDataType } from "./supplierorders.type";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate, useParams } from "react-router";
import FormWrapper from "../../components/FormWrapper";

import CInput from "../../components/CInput";
import PhoneNumberInput from "../../components/PhoneNumberInput";
import { postSupplierOrder, putSupplierOrder } from "./supplierorders.api";
import helpers from "../../helpers";
import useNotification from "../../hooks/useNotification";
import CSelect from "../../components/CSelect";
import type { CityDataType, CityResType } from "../Cities/city.type";
import type { NeighborhoodDataType } from "../Neighborhoods/neighborhood.type";
import { useWatch } from "antd/es/form/Form";
import { getCity } from "../Cities/city.api";
import { getNeighborhoodByCityId } from "../Neighborhoods/neighborhood.api";
import CSwitch from "../../components/CSwitch";
import QrScannerModal from "../../components/QrCodeModal";
const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { openNotification } = useNotification();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isQrCodeSet, setIsQrCodeSet] = React.useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const data = useLoaderData() as SupplierOrderDataType;

  const [cities, setCities] = React.useState<CityResType | null>(null);
  const [neighborhoods, setNeighborhoods] = React.useState<
    NeighborhoodDataType[] | null
  >(null);

  const toCityId = useWatch(["toCityId"], form);

  const onFinish: FormProps<SupplierOrderDataType>["onFinish"] = async (
    formData: SupplierOrderDataType
  ) => {
    try {
      setIsLoading(true);
      if (id) {
        await putSupplierOrder<SupplierOrderDataType>(formData, id);
      } else {
        await postSupplierOrder<SupplierOrderDataType>(formData);
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

  const onFinishFaild: FormProps<SupplierOrderDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  const fetchData = async (signal: AbortSignal) => {
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
  const fetchNeighborhoods = async (signal: AbortSignal) => {
    try {
      setNeighborhoods(await getNeighborhoodByCityId({ id: toCityId, signal }));
    } catch (error) {
      const errors = helpers.getErrorObjectKeyValue(
        error.response.data?.errors
      );
      if (errors.length > 0) {
        errors.forEach((err) => {
          openNotification("error", err.label, err.error as string);
        });
      }
    }
  };

  React.useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, []);

  React.useEffect(() => {
    const abortController = new AbortController();
    if (toCityId) {
      fetchNeighborhoods(abortController.signal);
    }
    return () => {
      abortController.abort();
    };
  }, [toCityId]);

  return (
   <>

   {!isQrCodeSet ?

<QrScannerModal 

onChange={(e)=>{
  alert("Ahmed Please Implement setOrderNo here::" + e);
  setIsQrCodeSet(true);
}}

/>
   :

    <FormWrapper
      title={t("supplierOrders")}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFaild}
      initialValues={data}
      isLoading={isLoading}
    >
      {" "}
      <div className="flex flex-col md:flex-row justify-center gap-3">
        {" "}
        <CSelect<SupplierOrderDataType>
          name="toCityId"
          className="flex-1"
          label={t("to")}
          placeholder={t("select")}
          rules={[{ required: true, message: t("requiredField") }]}
          onSelect={() => {
            form.setFieldValue("neighborhoodId", null);
          }}
          options={
            cities?.items?.map((city: CityDataType) => ({
              label: t(city.name),
              value: city.id,
            })) || []
          }
        />
        <CSelect<SupplierOrderDataType>
          name="neighborhoodId"
          className="flex-1"
          label={t("neighborhoods")}
          placeholder={t("select")}
          options={
            neighborhoods?.map((neighborhood: NeighborhoodDataType) => ({
              label: t(neighborhood.name),
              value: neighborhood.id,
            })) || []
          }
        />{" "}
        <CInput<SupplierOrderDataType>
          name={"address"}
          label={t("address")}
          className="flex-1"
          rules={[{ required: true, message: t("requiredField") }]}
        />{" "}
      </div>{" "}
      <div className="flex flex-col md:flex-row justify-center gap-3">
        <CInput<SupplierOrderDataType>
          name={"orderNo"}
          label={t("orderNo")}
          disabled={true}
          className="flex-1"
          type="text"
        />
        <CSelect<SupplierOrderDataType>
          name="productChange"
          label={t("productChange")}
          placeholder={t("select")}
          className="flex-1"
          disabled={!!id}
          rules={[{ required: true, message: t("requiredField") }]}
          options={
            helpers?.productChange?.map((term) => ({
              label: `${t(term.label)}`,
              value: term.value,
            })) || []
          }
        />{" "}
      </div>{" "}
      <div className="flex flex-col md:flex-row justify-center gap-3">
        {" "}
        <PhoneNumberInput<SupplierOrderDataType>
          name={"receiverPrimaryNumber"}
          label={t("receiverPrimaryNumber")}
          className="flex-1"
          rules={[{ required: true, message: t("requiredField") }]}
        />
        <PhoneNumberInput<SupplierOrderDataType>
          name={"receiverSecondaryNumber"}
          label={t("receiverSecondaryNumber")}
          className="flex-1"
        />
      </div>{" "}
      <div className="flex flex-col md:flex-row justify-center gap-3">
        {" "}
        <CInput<SupplierOrderDataType>
          name={"productName"}
          label={t("productName")}
          className="flex-1"
        />
        <CInput<SupplierOrderDataType>
          name={"productPrice"}
          label={t("productPrice")}
          className="flex-1"
          type="number"
          rules={[{ required: true, message: t("requiredField") }]}
        />{" "}
        <CSwitch<SupplierOrderDataType>
          disabled={!!id}
          name={"isLikelyToBreak"}
          label={t("isLikelyToBreak")}
          rules={[{ required: true, message: t("requiredField") }]}
        />
      </div>{" "}
      <CInput<SupplierOrderDataType>
        name={"note"}
        label={t("note")}
        className="flex-1"
        rows={3}
        isTextArea
      />
    </FormWrapper>
   
   }
   
   
   </>
  );
};

export default Create;
