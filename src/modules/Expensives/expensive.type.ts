import type { gloabResponseType } from "../../gloabal.type";
import type { SafeDataType } from "../Safes/safe.type";

export type ExpensiveResType = gloabResponseType<ExpensiveResDataType>;

export type ExpensiveDataType = {
  id: string;
  amount: number;
  safeId: string;
  reason: string;
};
export type ExpensiveResDataType = {
  id: string;
  amount: number;
  reason: string;
  safe: SafeDataType;
};
