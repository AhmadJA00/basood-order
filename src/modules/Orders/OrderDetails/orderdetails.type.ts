import type { gloabResponseType } from "../../../gloabal.type";
import type { SupplierResDataType } from "../../Suppliers/supplier.type";
import type { OrderResDataType } from "../order.type";

export type OrderDetailsResType = gloabResponseType<OrderDetailsDataType>;

export type OrderDetailsDataType = {
  id: string;
  address: string;
  branchId: number;
  deliveryAmount: number;
  driverAmount: number;
  invoiceNo: string;
  isAmountChanged: boolean;
  oldProductAmount: number;
  orderId: string;
  order: OrderResDataType;

  productAmount: number;
  productName?: string;
  receiverNumberPhone: string;
  remark: string;
  status: number;
  supplier: SupplierResDataType;
};
