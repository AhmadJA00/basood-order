import type { gloabResponseType } from "../../gloabal.type";

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
  productName: string;
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
};
