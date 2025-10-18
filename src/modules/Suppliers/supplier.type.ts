import type { gloabResponseType } from "../../gloabal.type";

export type SupplierResType = gloabResponseType<SupplierDataType>;

export type SupplierDataType = {
  id: string;
  name: string;
  address: string;
  primaryPhone: string;
  secondaryPhone?: string;
  description?: string;
};
