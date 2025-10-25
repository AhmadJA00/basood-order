import type { gloabResponseType } from "../../../gloabal.type";

export type PaymentResType = gloabResponseType<PaymentResDataType>;

export type PaymentDataType = {
  id: string;
  safeId: string;
  supplierId: string;
  payerType: number;
  senderId: string;
  orderDetailIds: string[];
};
export type PaymentResDataType = PaymentDataType & { amount: number };
