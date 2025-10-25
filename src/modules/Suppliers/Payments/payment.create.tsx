import { Flex, Form, type FormProps } from "antd";
import type { PaymentDataType, PaymentResDataType } from "./payment.type";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useRevalidator,
} from "react-router";
import {
  getOrderDetailBySupplierId,
  postPayment,
  putPayment,
} from "./payment.api";
import FormWrapper from "../../../components/FormWrapper";
import helpers from "../../../helpers";
import useNotification from "../../../hooks/useNotification";
import type { SafeResDataType, SafeResType } from "../../Safes/safe.type";
import { getSafe } from "../../Safes/safe.api";
import CSelect from "../../../components/CSelect";
import { useWatch } from "antd/es/form/Form";
import type { OrderDetailsDataType } from "../../Orders/OrderDetails/orderdetails.type";
import { getSupplier } from "../supplier.api";
import type { CustomerDriverDataType } from "../../Drivers/driver.type";
import type { SupplierDataType, SupplierResType } from "../supplier.type";
import { getCustomerDriver } from "../../Drivers/driver.api";

const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const revalidator = useRevalidator();
  const { openNotification } = useNotification();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData() as PaymentResDataType;
  const [safes, setSafes] = React.useState<SafeResType | null>(null);
  const [drivers, setDrivers] = React.useState<CustomerDriverDataType[] | null>(
    null
  );
  const [suppliers, setSuppliers] = React.useState<SupplierResType | null>(
    null
  );
  const supplierId = useWatch(["supplierId"], form);
  const payerType = useWatch(["payerType"], form);
  const [orderDetails, setOrderDetails] = React.useState<
    OrderDetailsDataType[]
  >([]);

  const onFinish: FormProps<PaymentDataType>["onFinish"] = async (
    formData: PaymentDataType
  ) => {
    try {
      setIsLoading(true);
      if (id) {
        await putPayment<PaymentDataType>(formData, id);
        revalidator.revalidate();
      } else {
        await postPayment<PaymentDataType>(formData);
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

  const onFinishFailed: FormProps<PaymentDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  const fetchData = async (signal: AbortSignal) => {
    try {
      setSafes(await getSafe({ signal }));
      setDrivers(await getCustomerDriver(signal));
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
  const fetchOrderDetails = async (signal: AbortSignal) => {
    try {
      setOrderDetails(
        await getOrderDetailBySupplierId({ id: supplierId, signal })
      );
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
    if (supplierId) {
      fetchOrderDetails(abortController.signal);
    }
    return () => {
      abortController.abort();
    };
  }, [supplierId]);

  return (
    <Flex gap="middle " vertical>
      <FormWrapper<PaymentDataType>
        title={id ? t("update") : t("create")}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={data}
        isLoading={isLoading}
      >
        <Flex justify="center" gap={"middle"} align="center">
          <CSelect<PaymentDataType>
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
          <CSelect<PaymentDataType>
            name="supplierId"
            label={t("supplier")}
            placeholder={t("select")}
            className="flex-1"
            rules={[{ required: true, message: t("requiredField") }]}
            options={
              suppliers?.items?.map((supplier: SupplierDataType) => ({
                label: `${supplier.name}`,
                value: supplier.id,
              })) || []
            }
          />
          <CSelect<PaymentDataType>
            name="payerType"
            label={t("payerType")}
            placeholder={t("select")}
            className="flex-1"
            rules={[{ required: true, message: t("requiredField") }]}
            options={
              helpers.payerType.map((type) => ({
                label: `${type.label}`,
                value: type.value,
              })) || []
            }
          />
          {payerType === 1 && (
            <CSelect<PaymentDataType>
              name="senderId"
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
          )}
        </Flex>
        <CSelect<PaymentDataType>
          name="orderDetailIds"
          label={t("orders")}
          placeholder={t("select")}
          className="flex-1"
          multiple
          rules={[{ required: true, message: t("requiredField") }]}
          options={
            orderDetails?.map((order) => ({
              label: `${order.id}`,
              value: order.id,
            })) || []
          }
        />
      </FormWrapper>
    </Flex>
  );
};

export default Create;
