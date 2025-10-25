import {
  Button,
  Flex,
  Form,
  Modal,
  Select,
  Table,
  Tooltip,
  type FormProps,
} from "antd";
import { IoEyeOutline } from "react-icons/io5";
import type {
  ChangeDriverAmountFormType,
  OrderDataType,
  OrderDetailsType,
} from "./order.type";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useRevalidator,
} from "react-router";
import {
  changeOrderStatus,
  postOrder,
  putDriverAmount,
  putOrder,
} from "./order.api";
import FormWrapper from "../../components/FormWrapper";
import type { CityDataType, CityResType } from "../Cities/city.type";
import { getCity } from "../Cities/city.api";
import CSelect from "../../components/CSelect";
import type { ZoneDataType } from "../Zones/zone.type";
import { getZoneByCityId } from "../Zones/zone.api";
import { useWatch } from "antd/es/form/Form";
import { EditOutlined } from "@ant-design/icons";
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
import { MdDeleteOutline } from "react-icons/md";
import useNotification from "../../hooks/useNotification";
import CModal from "../../components/CModal";
import { GiTakeMyMoney } from "react-icons/gi";
const Create = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [orderForm] = Form.useForm();
  const { openNotification } = useNotification();
  const navigate = useNavigate();
  const [openChangeDriverPrice, setOpenChangeDriverPrice] =
    React.useState(false);
  const [currentOrder, setCurrentOrder] =
    React.useState<OrderDetailsType | null>(null);
  const revalidator = useRevalidator();

  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const data = useLoaderData() as OrderDataType;
  const [orders, setOrders] = React.useState<OrderDetailsType[] | []>([]);
  const [safes, setSafes] = React.useState<SafeResType | null>(null);
  const [drivers, setDrivers] = React.useState<CustomerDriverDataType[] | null>(
    null
  );
  const [cities, setCities] = React.useState<CityResType | null>(null);
  const [zones, setZones] = React.useState<ZoneDataType[] | null>(null);
  const [suppliers, setSuppliers] = React.useState<SupplierResType | null>(
    null
  );
  const [detailedData, setDetailedData] =
    React.useState<OrderDetailsType | null>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [editKey, setEditKey] = React.useState<string | null>(null);
  const toId = useWatch(["toId"], form);
  const paymentTerm = useWatch(["paymentTerm"], form);

  const changeOrderStatusHandler = async (rowId: string, value: number) => {
    setIsLoading(true);
    try {
      await changeOrderStatus(rowId, value);
      openNotification("success", t("updatedSuccessfully"));
    } catch (error: unknown) {
      console.error("Error updating status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const showOrderDetails = (row: OrderDetailsType) => {
    setOpenModal(true);
    setDetailedData(row);
  };

  const deleteOrder = (orderIndex: number) => {
    setOrders(orders.filter((_, index) => index !== orderIndex));
  };

  const handleEdit = (data: OrderDetailsType) => {
    setEditKey(data.id);
    orderForm.setFieldsValue(data);
  };

  const columns = [
    {
      title: t("supplier"),
      key: "supplier",
      render: (row: OrderDetailsType) =>
        `${row.supplierId} - ${row?.supplierName || "-"} (${
          row.supplierPhoneNumber
        })`,
    },
    {
      title: t("productName"),
      key: "productName",
      render: (row: OrderDetailsType) => row?.productName || "-",
    },
    {
      title: t("productAmount"),
      key: "productAmount",
      render: (row: OrderDetailsType) =>
        `${row?.productAmount.toLocaleString()} ${t("iqd")}`,
    },
    {
      title: t("deliveryAmount"),
      key: "deliveryAmount",
      render: (row: OrderDetailsType) =>
        `${row?.deliveryAmount.toLocaleString()} ${t("iqd")}`,
    },
    {
      title: t("driverAmount"),
      key: "driverAmount",
      render: (row: OrderDetailsType) =>
        `${row?.driverAmount.toLocaleString()} ${t("iqd")}`,
    },
    {
      title: t("total"),
      key: "total",
      render: (row: OrderDetailsType) =>
        `${(row?.productAmount + row.deliveryAmount).toLocaleString()} ${t(
          "iqd"
        )}`,
    },

    {
      title: t("actions"),
      render: (row: OrderDetailsType, _: OrderDetailsType, index: number) => (
        <Flex gap={"middle"}>
          <Button type="primary" onClick={() => handleEdit(row)}>
            <EditOutlined size={20} />
          </Button>
          <Tooltip title={t(`changeSalary`)} color="#003049">
            <Button
              type="primary"
              onClick={() => {
                setOpenChangeDriverPrice(true);
                setCurrentOrder(row);
              }}
            >
              <GiTakeMyMoney size={24} />
            </Button>
          </Tooltip>
          {!id && (
            <Button danger type="primary" onClick={() => deleteOrder(index)}>
              <MdDeleteOutline size={20} />
            </Button>
          )}
          <Button type="primary" onClick={() => showOrderDetails(row)}>
            <IoEyeOutline size={20} />
          </Button>{" "}
          {!!id && (
            <Select
              className={"w-52"}
              onChange={(value) => {
                if (value) {
                  changeOrderStatusHandler(row.id, value);
                }
              }}
              value={row.status}
              options={helpers.orderStatus.map((status) => ({
                label: t(status.label),
                value: status.value,
              }))}
            />
          )}
        </Flex>
      ),
    },
  ];

  const onFinish: FormProps<OrderDataType>["onFinish"] = async (
    formData: OrderDataType
  ) => {
    try {
      setIsLoading(true);
      if (id) {
        await putOrder<OrderDataType>(
          { ...formData, orderDetails: orders },
          id
        );
        openNotification("success", t("updatedSuccessfully"));
      } else {
        await postOrder<OrderDataType>({ ...formData, orderDetails: orders });
        openNotification("success", t("createdSuccessfully"));
      }
      navigate("../");
      window.scrollTo({ top: 0, behavior: "smooth" });
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
  const onFinishOrders: FormProps<OrderDetailsType>["onFinish"] = async (
    formData: OrderDetailsType
  ) => {
    if (editKey) {
      setOrders(
        orders.map((order) => (order.id === editKey ? formData : order))
      );
      setEditKey(null);
      orderForm.resetFields();
      return;
    }
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

  const onFinishChangeAmount: FormProps<ChangeDriverAmountFormType>["onFinish"] =
    async (formData: ChangeDriverAmountFormType) => {
      try {
        setIsLoading(true);
        await putDriverAmount<ChangeDriverAmountFormType>(
          formData,
          currentOrder?.id || ""
        );
        revalidator.revalidate();
        setOpenChangeDriverPrice(false);
      } catch (error) {
        const errors = helpers.getErrorObjectKeyValue(
          error.response.data.errors
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

  const onFinishFailedChangeAmount: FormProps<ChangeDriverAmountFormType>["onFinishFailed"] =
    (errorInfo) => {
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
  const fetchZones = async (signal: AbortSignal) => {
    try {
      setZones(await getZoneByCityId({ id: toId, signal }));
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
    if (toId) {
      fetchZones(abortController.signal);
    }
    return () => {
      abortController.abort();
    };
  }, [toId]);
  React.useEffect(() => {
    if (id) {
      setOrders(data?.orderDetails);
    }
  }, [data?.id]);

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
          <CSelect<OrderDataType>
            name="zoneId"
            className="flex-1"
            label={t("zones")}
            placeholder={t("select")}
            options={
              zones?.map((zone: ZoneDataType) => ({
                label: t(zone.name),
                value: zone.id,
              })) || []
            }
          />
        </Flex>
        <Flex justify="center" gap={"middle"} align="center">
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
      </FormWrapper>{" "}
      {((id && editKey) || !id) && (
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
              {!!id && (
                <CInput<OrderDetailsType>
                  name={"id"}
                  label={t("id")}
                  className="flex-1"
                  disabled
                />
              )}
              <CSelect<OrderDetailsType>
                name={"supplierId"}
                label={t("supplier")}
                placeholder={t("select")}
                className="flex-1"
                rules={[
                  {
                    required: true,
                    message: t("requiredField"),
                  },
                ]}
                options={
                  suppliers?.items?.map((supplier: SupplierDataType) => ({
                    label: `${supplier.name} - ( ${supplier.primaryPhone} )`,
                    value: supplier.id,
                    supplier,
                  })) || []
                }
                onSelect={(_, option) => {
                  orderForm.setFieldValue("supplierName", option.supplier.name);
                  orderForm.setFieldValue(
                    "supplierPhoneNumber",
                    option.supplier.primaryPhone
                  );
                }}
              />
              <CInput<OrderDetailsType>
                name={"supplierName"}
                label={t("supplierName")}
                className="flex-1"
                disabled
              />
              <CInput<OrderDetailsType>
                name={"supplierPhoneNumber"}
                label={t("supplierPhoneNumber")}
                className="flex-1"
                disabled
              />
            </Flex>
            <Flex justify="center" gap={"middle"} align="center">
              <CInput<OrderDetailsType>
                name={"productName"}
                label={t("productName")}
                className="flex-1"
              />

              <PhoneNumberInput
                name={"receiverNumberPhone"}
                label={t("receiverNumberPhone")}
                className="flex-1"
                rules={[{ required: true, message: t("requiredField") }]}
              />
              <CInput<OrderDetailsType>
                name={"invoiceNo"}
                label={t("invoiceNo")}
                className="flex-1"
                type="number"
              />
            </Flex>
            <Flex justify="center" gap={"middle"} align="center">
              <CInput<OrderDetailsType>
                name={"productAmount"}
                label={t("productAmount")}
                type="number"
                className="flex-1"
                rules={[{ required: true, message: t("requiredField") }]}
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
      <CModal
        open={openChangeDriverPrice}
        width={600}
        setOpen={setOpenChangeDriverPrice}
      >
        <div className="p-3">
          <FormWrapper<ChangeDriverAmountFormType>
            title={t("changeDriverAmount")}
            form={form}
            onFinish={onFinishChangeAmount}
            onFinishFailed={onFinishFailedChangeAmount}
            initialValues={data}
            isLoading={isLoading}
          >
            <p>
              <span className="font-bold">{t("name")} :</span>
              {currentOrder?.supplierName}
            </p>
            <p>
              <span className="font-bold">{t("productAmount")} :</span>
              {currentOrder?.productAmount} {t("iqd")}
            </p>
            <p>
              <span className="font-bold">{t("deliveryAmount")} :</span>
              {currentOrder?.deliveryAmount} {t("iqd")}
            </p>
            <p>
              <span className="font-bold">{t("driverAmount")} :</span>
              {currentOrder?.driverAmount} {t("iqd")}
            </p>
            <CInput<ChangeDriverAmountFormType>
              name="amount"
              label={t("newDriverAmount")}
              type="number"
              rules={[{ required: true, message: t("requiredField") }]}
            />
          </FormWrapper>
        </div>
      </CModal>
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
              <span className="font-semibold">{t(key)}</span>: {value}
            </p>
          ))}
        </div>
      </Modal>
    </Flex>
  );
};

export default Create;
