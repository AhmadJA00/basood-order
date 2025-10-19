import type { gloabResponseType } from "../../gloabal.type";
import type { DriverDataType } from "../Drivers/driver.type";
import type { SupplierDataType } from "../Suppliers/supplier.type";

export type SupplierOrderResType = gloabResponseType<SupplierOrderResDataType>;

export type SupplierOrderDataType = {
  id: string;
  productName: string;
  productAmount: number;
  receiverNumberPhone: string;
  address: string;
  invoiceNo: string;
  remark: string;
};
export type SupplierOrderResDataType = SupplierOrderDataType & {
  receivedByDriver: DriverDataType;
  supplier: SupplierDataType;
  status: number;
};

export type SupplierOrderDetailsType = {
  id: string;
  deliveryAmount: number;
  driverAmount: number;
};
