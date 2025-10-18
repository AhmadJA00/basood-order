import type { gloabResponseType } from "../../gloabal.type";
import type { DriverDataType } from "../Drivers/driver.type";

export type SupplierOrderResType = gloabResponseType<SupplierOrderDataType>;

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
  status: number;
};

export type SupplierOrderDetailsType = {
  id: string;
  deliveryAmount: number;
  driverAmount: number;
};
