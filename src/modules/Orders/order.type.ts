import type { gloabResponseType } from "../../gloabal.type";
import type { CityDataType, CityResType } from "../Cities/city.type";
import type { DriverDataType } from "../Drivers/driver.type";
import type { SupplierResDataType } from "../Suppliers/supplier.type";
import type { ZoneDataType } from "../Zones/zone.type";

export type OrderResType = gloabResponseType<OrderDataType>;

export type OrderDataType = {
  driverId: number;
  fromId: number;
  toId: number;
  zoneId: number;
  description: string;
  paymentTerm: "loan" | "prePaid";
  safeId: number;
  orderDetails: OrderDetailsType[];
};
export type OrderDetailsType = {
  id: string;
  productName?: string;
  productAmount: number;
  supplierId: number;
  supplierName: string;
  supplierPhoneNumber: string;
  receiverNumberPhone: string;
  address: string;
  deliveryAmount: number;
  driverAmount: number;
  invoiceNo: string;
  remark: string;
  status: number;
};
export type OrderResDetailsType = {
  productName?: string;
  productAmount: number;
  supplier: SupplierResDataType;
  receiverNumberPhone: string;
  address: string;
  deliveryAmount: number;
  driverAmount: number;
  invoiceNo: string;
  remark: string;
};
export type OrderResDataType = {
  id: string;
  to: CityDataType;
  from: CityDataType;
  zone: ZoneDataType;
  description: string;
  orderDetail: OrderResDetailsType[];
  driver: DriverDataType;
  totalOrder: number;
  paymentTerm: 1 | 2;
};
export type ChangeDriverAmountFormType = { amount: number };
