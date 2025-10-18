import { Flex, Form, type FormProps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import FormWrapper from "../../../components/FormWrapper";

import CInput from "../../../components/CInput";
import PhoneNumberInput from "../../../components/PhoneNumberInput";
import { postOrderPending } from "./orderpending.api";
import type { OrderPendingDataType } from "./orderpending.type";
import type { SafeResDataType, SafeResType } from "../../Safes/safe.type";
import type { DriverDataType, DriverResType } from "../../Drivers/driver.type";
import type { CityDataType, CityResType } from "../../Cities/city.type";
import type { ZoneDataType } from "../../Zones/zone.type";
import { getSafe } from "../../Safes/safe.api";
import { getDriver } from "../../Drivers/driver.api";
import { getCity } from "../../Cities/city.api";
import { getZoneByCityId } from "../../Zones/zone.api";
import { useWatch } from "antd/es/form/Form";
import CSelect from "../../../components/CSelect";
import helpers from "../../../helpers";
const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [safes, setSafes] = React.useState<SafeResType | null>(null);
  const [drivers, setDrivers] = React.useState<DriverResType | null>(null);
  const [cities, setCities] = React.useState<CityResType | null>(null);
  const [zones, setZones] = React.useState<ZoneDataType[] | null>(null);

  const fromId = useWatch(["fromId"], form);
  const toId = useWatch(["toId"], form);

  const [isLoading, setIsLoading] = React.useState(false);

  const onFinish: FormProps<OrderPendingDataType>["onFinish"] = async (
    formData: OrderPendingDataType
  ) => {
    try {
      setIsLoading(true);

      await postOrderPending<OrderPendingDataType>(formData);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error creating LookingForInvestor:", error);
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
      setSafes(await getSafe({ queryOBJ: {}, id: "", signal }));
      setDrivers(await getDriver({ queryOBJ: {}, id: "", signal }));
      setCities(await getCity({ queryOBJ: {}, id: "", signal }));
    } catch (err) {
      console.log(err);
    }
  };
  const fetchZones = async (signal: AbortSignal) => {
    try {
      setZones(await getZoneByCityId({ id: toId, signal }));
    } catch (err) {
      console.log(err);
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
    fetchZones(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [fromId, toId]);
  return (
    <FormWrapper<OrderPendingDataType>
      title={t("create")}
      form={form}
      onFinish={onFinish}
      noSubmit
      onFinishFailed={onFinishFaild}
      isLoading={isLoading}
    >
      <Flex justify="center" gap={"middle"} align="center">
        <CSelect<OrderPendingDataType>
          name="fromId"
          label={t("from")}
          placeholder={t("select")}
          className="flex-1"
          rules={[{ required: true, message: t("requiredField") }]}
          options={
            cities?.items?.map((city: CityDataType) => ({
              label: t(city.name),
              value: city.id,
            })) || []
          }
        />
        <CSelect<OrderPendingDataType>
          name="toId"
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
          name="zoneId"
          className="flex-1"
          label={t("zones")}
          placeholder={t("select")}
          rules={[{ required: true, message: t("requiredField") }]}
          options={
            zones?.map((zone: ZoneDataType) => ({
              label: t(zone.name),
              value: zone.id,
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
            drivers?.items?.map((driver: DriverDataType) => ({
              label: `${driver.firstName} ${driver.middleName} ${driver.lastName}`,
              value: driver.id,
            })) || []
          }
        />
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
      </Flex>
    </FormWrapper>
  );
};

export default Create;
