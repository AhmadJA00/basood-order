import { Button, Flex, Form, Modal, Table, type FormProps } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import type { OrderDataType, OrderDetailsType } from "./order.type";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useParams, useRevalidator } from "react-router";
import { postOrder, putOrder } from "./order.api";
import FormWrapper from "../../components/FormWrapper";
import type { CityDataType, CityResType } from "../Cities/city.type";
import { getCity } from "../Cities/city.api";
import CSelect from "../../components/CSelect";
import type { ZoneDataType } from "../Zones/zone.type";
import { getZoneByCityId } from "../Zones/zone.api";
import { useWatch } from "antd/es/form/Form";
import type { DriverDataType, DriverResType } from "../Drivers/driver.type";
import { getDriver } from "../Drivers/driver.api";
import helpers from "../../helpers";
import type { SafeResDataType, SafeResType } from "../Safes/safe.type";
import { getSafe } from "../Safes/safe.api";
import type {
  SupplierDataType,
  SupplierResType,
} from "../Suppliers/supplier.type";
import { getSupplier } from "../Suppliers/supplier.api";
import CSwitch from "../../components/CSwitch";
import CInput from "../../components/CInput";
import PhoneNumberInput from "../../components/PhoneNumberInput";
import { MdDeleteOutline } from "react-icons/md";
const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [orderForm] = Form.useForm();
  const revalidator = useRevalidator();

  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData() as OrderDataType;

  const [orders, setOrders] = React.useState<OrderDetailsType[] | []>([]);
  const [safes, setSafes] = React.useState<SafeResType | null>(null);
  const [drivers, setDrivers] = React.useState<DriverResType | null>(null);
  const [cities, setCities] = React.useState<CityResType | null>(null);
  const [zones, setZones] = React.useState<ZoneDataType[] | null>(null);
  const [suppliers, setSuppliers] = React.useState<SupplierResType | null>(
    null
  );
  const [detailedData, setDetailedData] =
    React.useState<OrderDetailsType | null>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const fromId = useWatch(["fromId"], form);
  const toId = useWatch(["toId"], form);
  const isNewSupplier = useWatch(["isNewSupplier"], orderForm);

  const showOrderDetails = (row: OrderDetailsType) => {
    setOpenModal(true);
    setDetailedData(row);
  };

  const deleteOrder = (orderIndex: number) => {
    setOrders(orders.filter((_, index) => index !== orderIndex));
  };

  const columns = [
    {
      title: t("id"),
      key: "id",
      render: (row: OrderDetailsType) => row?.supplierId || "-",
    },
    {
      title: t("supplierName"),
      key: "supplierName",
      render: (row: OrderDetailsType) => row?.supplierName || "-",
    },
    {
      title: t("supplierPhone"),
      key: "supplierPhone",
      render: (row: OrderDetailsType) => row?.supplierPhoneNumber || "-",
    },
    {
      title: t("productName"),
      key: "productName",
      render: (row: OrderDetailsType) => row?.productName || "-",
    },
    {
      title: t("productAmount"),
      key: "productAmount",
      render: (row: OrderDetailsType) => row?.productAmount || "-",
    },

    {
      title: t("invoiceNo"),
      key: "invoiceNo",
      render: (row: OrderDetailsType) => row?.invoiceNo || "-",
    },
    {
      title: t("actions"),
      render: (row: OrderDetailsType, _: OrderDetailsType, index: number) => (
        <Flex gap={"middle"}>
          <Button danger type="primary" onClick={() => deleteOrder(index)}>
            <MdDeleteOutline size={20} />
          </Button>
          <Button type="primary" onClick={() => showOrderDetails(row)}>
            <IoEyeOutline size={20} />
          </Button>
        </Flex>
      ),
    },
  ];

  const onFinish: FormProps<OrderDataType>["onFinish"] = async (
    formData: OrderDataType
  ) => {
    console.log({ ...formData, orderDetails: orders });
    try {
      setIsLoading(true);
      if (id) {
        await putOrder<OrderDataType>(
          { ...formData, orderDetails: orders },
          id
        );
        revalidator.revalidate();
      } else {
        await postOrder<OrderDataType>({ ...formData, orderDetails: orders });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error creating LookingForInvestor:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const onFinishOrders: FormProps<OrderDetailsType>["onFinish"] = async (
    formData: OrderDetailsType
  ) => {
    console.log(formData);
    setOrders([...orders, formData]);
    orderForm.resetFields();
  };

  const onFinishFailed: FormProps<OrderDataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };
  const onFinishOrdersFaild: FormProps<OrderDetailsType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };
  const fetchData = async (signal: AbortSignal) => {
    try {
      setSafes(await getSafe({ queryOBJ: {}, id: "", signal }));
      setDrivers(await getDriver({ queryOBJ: {}, id: "", signal }));
      setCities(await getCity({ queryOBJ: {}, id: "", signal }));
      setSuppliers(await getSupplier({ queryOBJ: {}, id: "", signal }));
    } catch (err) {
      console.log(err);
    }
  };
  const fetchZones = async (signal: AbortSignal) => {
    try {
      setZones(await getZoneByCityId({ id: fromId || toId, signal }));
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
    if (fromId && toId && fromId === toId) {
      fetchZones(abortController.signal);
    }
    return () => {
      abortController.abort();
    };
  }, [fromId, toId]);

  return (
    <Flex vertical gap={"middle"}>
      <FormWrapper<OrderDataType>
        title={id ? t("update") : t("create")}
        form={form}
        onFinish={onFinish}
        noSubmit
        onFinishFailed={onFinishFailed}
        initialValues={data}
        isLoading={isLoading}
      >
        <Flex justify="center" gap={"middle"} align="center">
          <CSelect<OrderDataType>
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
          <CSelect<OrderDataType>
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
          {fromId && toId && fromId === toId && (
            <CSelect<OrderDataType>
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
          )}
        </Flex>
        <Flex justify="center" gap={"middle"} align="center">
          <CSelect<OrderDataType>
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
          <CSelect<OrderDataType>
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
          <CSelect<OrderDataType>
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
      <FormWrapper
        title={t("orders")}
        form={orderForm}
        onFinish={onFinishOrders}
        onFinishFailed={onFinishOrdersFaild}
        isLoading={isLoading}
        submitText="add"
      >
        <Flex justify="center" gap={"middle"} vertical>
          <Flex justify="center" gap={"middle"} align="center">
            <CSelect<OrderDetailsType>
              disabled={isNewSupplier}
              name={"supplierId"}
              label={t("supplier")}
              placeholder={t("select")}
              className="flex-1"
              rules={[
                {
                  required: isNewSupplier ? false : true,
                  message: t("requiredField"),
                },
              ]}
              onSelect={(_, options) => {
                orderForm.setFieldValue("supplierId", options.value);
                orderForm.setFieldValue("supplierName", options.supplier.name);
                orderForm.setFieldValue(
                  "supplierPhoneNumber",
                  options.supplier.primaryPhone
                );
              }}
              options={
                suppliers?.items?.map((supplier: SupplierDataType) => ({
                  label: t(supplier.name),
                  value: supplier.id,
                  supplier,
                })) || []
              }
            />{" "}
            <CInput<OrderDetailsType>
              disabled={!isNewSupplier}
              name={"supplierName"}
              label={t("supplierName")}
              className="flex-1"
              rules={[{ required: true, message: t("requiredField") }]}
            />
            <PhoneNumberInput
              disabled={!isNewSupplier}
              name={"supplierPhoneNumber"}
              label={t("supplierPhoneNumber")}
              className="flex-1"
              rules={[{ required: true, message: t("requiredField") }]}
            />
            <CSwitch
              name="isNewSupplier"
              label={t("isNewSupplier")}
              onChange={() => {
                orderForm.setFieldValue("supplierId", null);
              }}
            />
          </Flex>
          <Flex justify="center" gap={"middle"} align="center">
            <CInput<OrderDetailsType>
              name={"productName"}
              label={t("productName")}
              className="flex-1"
              rules={[{ required: true, message: t("requiredField") }]}
            />
            <CInput<OrderDetailsType>
              name={"productAmount"}
              label={t("productAmount")}
              type="number"
              className="flex-1"
              rules={[{ required: true, message: t("requiredField") }]}
            />
            <PhoneNumberInput
              name={"receiverNumberPhone"}
              label={t("receiverNumberPhone")}
              className="flex-1"
              rules={[{ required: true, message: t("requiredField") }]}
            />
          </Flex>
          <Flex justify="center" gap={"middle"} align="center">
            <CInput<OrderDetailsType>
              name={"invoiceNo"}
              label={t("invoiceNo")}
              className="flex-1"
              type="number"
            />
            <CInput<OrderDetailsType>
              name={"deliveryAmount"}
              label={t("deliveryAmount")}
              type="number"
              className="flex-1"
              rules={[{ required: true, message: t("requiredField") }]}
            />
            <CInput<OrderDetailsType>
              name={"driverAmount"}
              label={t("driverAmount")}
              type="number"
              className="flex-1"
              rules={[{ required: true, message: t("requiredField") }]}
            />
          </Flex>
          <Flex justify="center" gap={"middle"} align="center">
            <CInput<OrderDetailsType>
              name={"address"}
              label={t("address")}
              className="flex-1"
              rules={[{ required: true, message: t("requiredField") }]}
            />
            <CInput<OrderDetailsType>
              name={"remark"}
              label={t("note")}
              className="flex-1"
            />
          </Flex>
        </Flex>
      </FormWrapper>
      {orders.length > 0 && <Table dataSource={orders} columns={columns} />}
      <Button
        type="primary"
        onClick={() => form.submit()}
        loading={isLoading}
        block
      >
        {isLoading ? t("processing") : id ? t("update") : t("submit")}
      </Button>{" "}
      <Modal
        title={t("detailedOrderData")}
        open={openModal}
        width={1000}
        footer={null}
        onCancel={() => setOpenModal(false)}
        onOk={() => setOpenModal(false)}
      >
        <div className="grid grid-cols-3 justify-between items-center gap-2">
          {Object.entries(detailedData || {})?.map(([key, value]) => (
            <p key={key}>
              <span className="font-semibold">{key}</span>: {value}
            </p>
          ))}
        </div>
      </Modal>
    </Flex>
  );
};

export default Create;
