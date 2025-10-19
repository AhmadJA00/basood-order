import type { gloabResponseType } from "../../../gloabal.type";

export type OrderPendingResType = gloabResponseType<OrderPendingDataType>;

export type OrderPendingDataType = {
  driverId: number;
  fromId: number;
  toId: number;
  zoneId: number;
  description: string;
  paymentTerm: "loan" | "prePaid";
  safeId: number;
  orderDetails: OrderPendingDetailsType[];
};
export type OrderPendingDetailsType = {
  id: string;
  deliveryAmount: number;
  driverAmount: number;
  productName?: string;
  supplierName?: string;
};
