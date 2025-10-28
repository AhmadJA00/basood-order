import type { gloabResponseType } from "../../gloabal.type";
import type { DriverDataType } from "../Drivers/driver.type";
import type { SupplierDataType } from "../Suppliers/supplier.type";

export type SupplierOrderResType = gloabResponseType<SupplierOrderResDataType>;

export type SupplierOrderDataType = {
  id: string;
  toCityId: string;
  neighborhoodId: string;
  address: string;
  orderNo: string;
  productChange: 1 | 2;
  productName: string;
  productPrice: number;
  receiverPrimaryNumber: string;
  receiverSecondaryNumber: string;
  isLikelyToBreak: true;
  note: string;
};
export type SupplierOrderResDataType = SupplierOrderDataType & {
  receivedByDriver: DriverDataType;
  supplier: SupplierDataType;
  status: number;
};
