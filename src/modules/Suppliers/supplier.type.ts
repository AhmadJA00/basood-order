import type { gloabResponseType } from "../../gloabal.type";

export type SupplierResType = gloabResponseType<SupplierResDataType>;

export type SupplierDataType = {
  id: string;
  name: string;
  address: string;
  primaryPhone: string;
  secondaryPhone?: string;
  description?: string;
};
export type SupplierResDataType = SupplierDataType & {
  accountId?: string;
};
