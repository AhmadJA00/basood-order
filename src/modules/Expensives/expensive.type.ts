import type { gloabResponseType } from "../../gloabal.type";

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
  safeId: string;
  safe: string;
};
