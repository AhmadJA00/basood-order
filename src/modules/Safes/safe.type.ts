import type { gloabResponseType } from "../../gloabal.type";

export type SafeResType = gloabResponseType<SafeResDataType>;

export type SafeDataType = {
  id: string;
  name: string;
  initialBalance: number;
};
export type SafeResDataType = {
  id: string;
  name: string;
  initialBalance: number;
  credit: number;
  currentBalance: number;
  debit: number;
};
