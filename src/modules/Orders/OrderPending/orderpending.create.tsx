import { Flex, Form, type FormProps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import FormWrapper from "../../../components/FormWrapper";

import { getSupplierOrderPending, postOrderPending } from "./orderpending.api";
import type { OrderPendingDataType } from "./orderpending.type";
import type { SafeResDataType, SafeResType } from "../../Safes/safe.type";
import type { CustomerDriverDataType } from "../../Drivers/driver.type";
import type { CityDataType, CityResType } from "../../Cities/city.type";
import type { NeighborhoodDataType } from "../../Neighborhoods/neighborhood.type";
import { getSafe } from "../../Safes/safe.api";
import { getCustomerDriver } from "../../Drivers/driver.api";
import { getCity } from "../../Cities/city.api";
import { getNeighborhoodByCityId } from "../../Neighborhoods/neighborhood.api";
import { useWatch } from "antd/es/form/Form";
import CSelect from "../../../components/CSelect";
import helpers from "../../../helpers";
import type { SupplierOrderResDataType } from "../../SupplierOrders/supplierorders.type";
import useNotification from "../../../hooks/useNotification";
const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { openNotification } = useNotification();

  const [supplierOrders, setSupplierOrders] = React.useState<
    SupplierOrderResDataType[] | null
  >(null);
  const [safes, setSafes] = React.useState<SafeResType | null>(null);
  const [drivers, setDrivers] = React.useState<CustomerDriverDataType[] | null>(
    null
  );
  const [cities, setCities] = React.useState<CityResType | null>(null);
  const [neighborhoods, setNeighborhoods] = React.useState<
    NeighborhoodDataType[] | null
  >(null);

  const fromId = useWatch(["fromId"], form);
  const toId = useWatch(["toId"], form);
  const paymentTerm = useWatch(["paymentTerm"], form);

  const [isLoading, setIsLoading] = React.useState(false);

  const onFinish: FormProps<OrderPendingDataType>["onFinish"] = async (
    formData: OrderPendingDataType
  ) => {
    try {
      setIsLoading(true);

      await postOrderPending<OrderPendingDataType>({
        ...formData,
        orderDetails: orders,
      });
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

  const onFinishFaild: FormProps<OrderPendingDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  const fetchData = async (signal: AbortSignal) => {
    try {
      setSafes(await getSafe({ signal }));
      setDrivers(await getCustomerDriver(signal));
      setCities(await getCity({ signal }));
      setSupplierOrders((await getSupplierOrderPending({ signal }))?.items);
    } catch (error) {
      console.log(error);
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
      if (toId) {
        setNeighborhoods(await getNeighborhoodByCityId({ id: toId, signal }));
      }
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
    fetchData(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, []);

  React.useEffect(() => {
    const abortController = new AbortController();
    fetchNeighborhoods(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [fromId, toId]);
  return (
    <FormWrapper<OrderPendingDataType>
      title={t("create")}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFaild}
      isLoading={isLoading}
    >
      <Flex justify="center" gap={"middle"} align="center">
        <CSelect<OrderPendingDataType>
          name="toCityId"
          className="flex-1"
          label={t("to")}
          placeholder={t("select")}
          rules={[{ required: true, message: t("requiredField") }]}
          options={
            cities?.items?.map((city: CityDataType) => ({
              label: t(city.name),
              value: city.id,
            })) || []
          }
        />
        <CSelect<OrderPendingDataType>
          name="supplierId"
          className="flex-1"
          label={t("to")}
          placeholder={t("select")}
          rules={[{ required: true, message: t("requiredField") }]}
          options={
            cities?.items?.map((city: CityDataType) => ({
              label: t(city.name),
              value: city.id,
            })) || []
          }
        />
        <CSelect<OrderPendingDataType>
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
        />
      </Flex>
      <Flex justify="center" gap={"middle"} align="center">
        <CSelect<OrderPendingDataType>
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
        <CSelect<OrderPendingDataType>
          name="paymentTerm"
          label={t("paymentTerm")}
          placeholder={t("select")}
          className="flex-1"
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
          <CSelect<OrderPendingDataType>
            name="safeId"
            label={t("safe")}
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
      </Flex>{" "}
    </FormWrapper>
  );
};

export default Create;
