import { Flex, Form, type FormProps } from "antd";
import type { OrderDataType } from "./order.type";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { postOrder, putOrder } from "./order.api";
import FormWrapper from "../../components/FormWrapper";
import type { CityDataType, CityResType } from "../Cities/city.type";
import { getCity } from "../Cities/city.api";
import CSelect from "../../components/CSelect";
import type { NeighborhoodDataType } from "../Neighborhoods/neighborhood.type";
import { getNeighborhoodByCityId } from "../Neighborhoods/neighborhood.api";
import { useWatch } from "antd/es/form/Form";
import type { CustomerDriverDataType } from "../Drivers/driver.type";
import { getCustomerDriver } from "../Drivers/driver.api";
import helpers from "../../helpers";
import type { SafeResDataType, SafeResType } from "../Safes/safe.type";
import { getSafe } from "../Safes/safe.api";
import type {
  SupplierDataType,
  SupplierResType,
} from "../Suppliers/supplier.type";
import { getSupplier } from "../Suppliers/supplier.api";
import CInput from "../../components/CInput";
import PhoneNumberInput from "../../components/PhoneNumberInput";
import useNotification from "../../hooks/useNotification";
import CSwitch from "../../components/CSwitch";
const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { openNotification } = useNotification();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData() as OrderDataType;
  const [safes, setSafes] = React.useState<SafeResType | null>(null);
  const [drivers, setDrivers] = React.useState<CustomerDriverDataType[] | null>(
    null
  );
  const [cities, setCities] = React.useState<CityResType | null>(null);
  const [neighborhoods, setNeighborhoods] = React.useState<
    NeighborhoodDataType[] | null
  >(null);
  const [suppliers, setSuppliers] = React.useState<SupplierResType | null>(
    null
  );

  const toCityId = useWatch(["toCityId"], form);
  const paymentTerm = useWatch(["paymentTerm"], form);

  const onFinish: FormProps<OrderDataType>["onFinish"] = async (
    formData: OrderDataType
  ) => {
    try {
      setIsLoading(true);
      if (id) {
        await putOrder<OrderDataType>(formData, id);
        console.log("updated");
        openNotification("success", t("updatedSuccessfully"));
      } else {
        await postOrder<OrderDataType>(formData);
        openNotification("success", t("createdSuccessfully"));
      }
      navigate("../");
    } catch (error) {
      const errors = helpers.getErrorObjectKeyValue(
        error.response?.data?.errors
      );
      if (errors.length > 0) {
        errors.forEach((err) => {
          openNotification("error", err.label, err.error as string);
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed: FormProps<OrderDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  const fetchData = async (signal: AbortSignal) => {
    try {
      setSafes(await getSafe({ signal }));
      setDrivers(await getCustomerDriver(signal));
      setCities(await getCity({ signal }));
      setSuppliers(await getSupplier({ signal }));
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
    <FormWrapper<OrderDataType>
      hasShow
      title={id ? t("update") : t("create")}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={data || { paymentTerm: 1 }}
      isLoading={isLoading}
    >
      <Flex justify="center" gap={"middle"} align="center">
        <CSelect<OrderDataType>
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
        <CSelect<OrderDataType>
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
        <CInput<OrderDataType>
          name={"address"}
          label={t("address")}
          className="flex-1"
          rules={[{ required: true, message: t("requiredField") }]}
        />
      </Flex>
      <Flex justify="center" gap={"middle"} align="center">
        <CInput<OrderDataType>
          name={"orderNo"}
          label={t("orderNo")}
          disabled={!!id}
          className="flex-1"
          type="number"
        />

        <CSelect<OrderDataType>
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
        />
        <CSelect<OrderDataType>
          name="paymentTerm"
          label={t("paymentTerm")}
          placeholder={t("select")}
          className="flex-1"
          disabled={!!id}
          rules={[{ required: true, message: t("requiredField") }]}
          options={
            helpers?.paymentTerm?.map(
              (term: { value: number; label: string }) => ({
                label: `${t(term.label)}`,
                value: term.value,
              })
            ) || []
          }
        />
        {paymentTerm === 1 && ( // only when it's prepaid
          <CSelect<OrderDataType>
            name="safeId"
            label={t("safe")}
            disabled={!!id}
            placeholder={t("select")}
            className="flex-1"
            rules={[{ required: true, message: t("requiredField") }]}
            options={
              safes?.items?.map((driver: SafeResDataType) => ({
                label: `${driver.name}`,
                value: driver.id,
              })) || []
            }
          />
        )}
      </Flex>
      <Flex justify="center" gap={"middle"} align="center">
        <PhoneNumberInput<OrderDataType>
          name={"receiverPrimaryNumber"}
          label={t("receiverPrimaryNumber")}
          className="flex-1"
          rules={[{ required: true, message: t("requiredField") }]}
        />
        <PhoneNumberInput<OrderDataType>
          name={"receiverSecondaryNumber"}
          label={t("receiverSecondaryNumber")}
          className="flex-1"
        />

        <CSelect<OrderDataType>
          name="supplierId"
          label={t("supplierId")}
          placeholder={t("select")}
          className="flex-1"
          disabled={!!id}
          rules={[{ required: true, message: t("requiredField") }]}
          options={
            suppliers?.items?.map((supplier: SupplierDataType) => ({
              label: `${t(supplier.name)}`,
              value: supplier.id,
            })) || []
          }
        />
        <CSelect<OrderDataType>
          name="driverId"
          label={t("driver")}
          placeholder={t("select")}
          className="flex-1"
          rules={[{ required: true, message: t("requiredField") }]}
          options={
            drivers?.map((driver: CustomerDriverDataType) => ({
              label: `${driver.fullName}`,
              value: driver.id,
            })) || []
          }
        />
      </Flex>{" "}
      <Flex justify="center" gap={"middle"} align="center">
        <CInput<OrderDataType>
          name={"productName"}
          label={t("productName")}
          className="flex-1"
        />
        <CInput<OrderDataType>
          name={"productPrice"}
          label={t("productPrice")}
          className="flex-1"
          type="number"
          rules={[{ required: true, message: t("requiredField") }]}
        />{" "}
        <CInput<OrderDataType>
          name={"deliveryPrice"}
          label={t("deliveryPrice")}
          className="flex-1"
          type="number"
          rules={[{ required: true, message: t("requiredField") }]}
        />{" "}
        <CInput<OrderDataType>
          name={"driverPrice"}
          label={t("driverPrice")}
          className="flex-1"
          type="number"
          rules={[{ required: true, message: t("requiredField") }]}
        />
        <CSwitch<OrderDataType>
          disabled={!!id}
          name={"isLikelyToBreak"}
          label={t("isLikelyToBreak")}
          rules={[{ required: true, message: t("requiredField") }]}
        />
      </Flex>{" "}
      <CInput<OrderDataType>
        name={"note"}
        label={t("note")}
        className="flex-1"
        rows={3}
        isTextArea
      />
    </FormWrapper>
  );
};

export default Create;
