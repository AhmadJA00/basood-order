import { Button, Flex, Form, Select, Table, type FormProps } from "antd";
import type {
  TransactionDataType,
  TransactionOrderDetailsType,
  TransactionResDataType,
} from "./transaction.type";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useRevalidator,
} from "react-router";
import { postTransaction, putTransaction } from "./transaction.api";
import FormWrapper from "../../../components/FormWrapper";
import helpers from "../../../helpers";
import useNotification from "../../../hooks/useNotification";
import type { SafeResDataType, SafeResType } from "../../Safes/safe.type";
import type { CustomerDriverDataType } from "../driver.type";
import { getCustomerDriver } from "../driver.api";
import { getSafe } from "../../Safes/safe.api";
import CSelect from "../../../components/CSelect";
import { useWatch } from "antd/es/form/Form";
import { getOrderDetailDriverById } from "../../Transfers/transfer.api";
import type { OrderDetailsDataType } from "../../Orders/OrderDetails/orderdetails.type";
import CInput from "../../../components/CInput";
import CSwitch from "../../../components/CSwitch";
import { MdDeleteOutline } from "react-icons/md";

const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [orderForm] = Form.useForm();

  const revalidator = useRevalidator();
  const { openNotification } = useNotification();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData() as TransactionResDataType;
  const [safes, setSafes] = React.useState<SafeResType | null>(null);
  const [drivers, setDrivers] = React.useState<CustomerDriverDataType[] | null>(
    null
  );
  const driverId = useWatch(["driverId"], form);
  const [orderDetails, setOrderDetails] = React.useState<
    OrderDetailsDataType[]
  >([]);
  const [orders, setOrders] = React.useState<
    TransactionOrderDetailsType[] | []
  >(data.orderDetails || []);

  const onFinish: FormProps<TransactionDataType>["onFinish"] = async (
    formData: TransactionDataType
  ) => {
    try {
      setIsLoading(true);
      if (id) {
        await putTransaction<TransactionDataType>(formData, id);
        revalidator.revalidate();
      } else {
        await postTransaction<TransactionDataType>({
          ...formData,
          details: orders,
        });
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

  const onFinishOrders: FormProps<TransactionOrderDetailsType>["onFinish"] =
    async (formData: TransactionOrderDetailsType) => {
      setOrders([...orders, formData]);
      orderForm.resetFields();
    };

  const onFinishFailed: FormProps<TransactionDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  const fetchData = async (signal: AbortSignal) => {
    try {
      setSafes(await getSafe({ signal }));
      setDrivers(await getCustomerDriver(signal));
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
      setOrderDetails(await getOrderDetailDriverById({ id: driverId, signal }));
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
    if (driverId) {
      fetchOrderDetails(abortController.signal);
    }
    return () => {
      abortController.abort();
    };
  }, [driverId]);

  const deleteOrder = (orderIndex: number) => {
    setOrders(orders.filter((_, index) => index !== orderIndex));
  };

  const columns = [
    {
      title: t("id"),
      key: "id",
      render: (row: TransactionOrderDetailsType) => `${row?.id}`,
    },
    {
      title: t("isPartiallyDelivery"),
      key: "isPartiallyDelivery",
      render: (row: TransactionOrderDetailsType) =>
        `${row?.isPartiallyDelivery}`,
    },
    {
      title: t("driverAmount"),
      key: "driverAmount",
      render: (row: TransactionOrderDetailsType) =>
        `${row?.driverAmount.toLocaleString()} ${t("iqd")}`,
    },

    {
      title: t("actions"),
      render: (
        row: TransactionOrderDetailsType,
        _: TransactionOrderDetailsType,
        index: number
      ) => (
        <Flex gap={"middle"}>
          {!id && (
            <Button danger type="primary" onClick={() => deleteOrder(index)}>
              <MdDeleteOutline size={20} />
            </Button>
          )}
        </Flex>
      ),
    },
  ];
  return (
    <Flex gap="middle " vertical>
      <FormWrapper<TransactionDataType>
        title={id ? t("update") : t("create")}
        form={form}
        onFinish={onFinish}
        noSubmit
        onFinishFailed={onFinishFailed}
        initialValues={data}
        isLoading={isLoading}
      >
        <Flex justify="center" gap={"middle"} align="center">
          <CSelect<TransactionDataType>
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
          <CSelect<TransactionDataType>
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
        </Flex>
      </FormWrapper>
      {orderDetails.length > 0 && (
        <FormWrapper<TransactionOrderDetailsType>
          title={t("orders")}
          form={orderForm}
          onFinish={onFinishOrders}
          isLoading={isLoading}
          submitText="add"
        >
          <Flex justify="center" gap={"middle"} align="center">
            <CSelect<TransactionOrderDetailsType>
              name="id"
              label={t("safe")}
              placeholder={t("select")}
              className="flex-1"
              rules={[{ required: true, message: t("requiredField") }]}
              options={
                orderDetails?.map((order) => ({
                  label: `${order?.id}`,
                  value: order.id,
                  order,
                })) || []
              }
              onSelect={(val, option) => {
                if (option.order.status === 7) {
                  orderForm.setFieldValue("isPartiallyDelivery", true);
                } else {
                  orderForm.setFieldValue("isPartiallyDelivery", false);
                }
              }}
            />
            <CSwitch<TransactionOrderDetailsType>
              name="isPartiallyDelivery"
              disabled
              label={t("isPartiallyDelivery")}
            />
            <CInput<TransactionOrderDetailsType>
              name="driverAmount"
              label={t("driverAmount")}
              className="flex-1"
              type="number"
              rules={[{ required: true, message: t("requiredField") }]}
            />
          </Flex>
        </FormWrapper>
      )}
      {orders.length > 0 && <Table dataSource={orders} columns={columns} />}
      <Button
        type="primary"
        onClick={() => form.submit()}
        loading={isLoading}
        block
      >
        {isLoading ? t("processing") : id ? t("update") : t("submit")}
      </Button>{" "}
    </Flex>
  );
};

export default Create;
