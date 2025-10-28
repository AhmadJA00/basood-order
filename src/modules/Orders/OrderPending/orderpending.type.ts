import type { gloabResponseType } from "../../../gloabal.type";

export type OrderPendingResType = gloabResponseType<OrderPendingDataType>;

export type OrderPendingDataType = {
  driverId: string;
  supplierId: string;
  paymentTerm: 1 | 2;
  safeId: string;
  toCityId: string;
  neighborhoodId: string;
  deliveryPrice: number;
  driverPrice: number;
};
