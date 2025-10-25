import type { gloabResponseType } from "../../../gloabal.type";
import type { SafeDataType } from "../../Safes/safe.type";
import type { DriverDataType } from "../driver.type";

export type TransactionResType = gloabResponseType<TransactionDataType>;

export type TransactionDataType = {
  id: string;
  driverId: number;
  safeId: number;
  details: TransactionOrderDetailsType[];
};
export type TransactionOrderDetailsType = {
  id: string;
  isPartiallyDelivery: boolean;
  driverAmount: number;
};

export type TransactionResDataType = {
  id: string;
  driver: DriverDataType;
  safe: SafeDataType;
  orderDetails: TransactionOrderDetailsType[];
  amount: number;
  driverAmount: number;
  totalAmount: number;
};
