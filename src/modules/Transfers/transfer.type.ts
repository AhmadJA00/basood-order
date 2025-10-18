import type { gloabResponseType } from "../../gloabal.type";

export type TransferResType = gloabResponseType<TransferResDataType>;

export type TransferDataType = {
  id: string;
  amount: number;
  fromId: number;
  toId: number;
  driverAmount: number;
  description: string;
};
export type TransferResDataType = {
  id: string;
  amount: number;
  reason: string;
  safeId: string;
  safe: string;
};
