import type { gloabResponseType } from "../../gloabal.type";
import type { CityDataType, CityResType } from "../Cities/city.type";
import type { DriverDataType } from "../Drivers/driver.type";
import type { SupplierResDataType } from "../Suppliers/supplier.type";
import type {
  NeighborhoodDataType,
  NeighborhoodResDataType,
} from "../Neighborhoods/neighborhood.type";
import type { SafeResDataType } from "../Safes/safe.type";

export type OrderResType = gloabResponseType<OrderResDataType>;

export type OrderDataType = {
  driverId: string;
  toCityId: number;
  neighborhoodId: number;
  address: string;
  orderNo: string;
  paymentTerm: "loan" | "prePaid";
  productChange: 1 | 2;
  safeId: number;
  productName?: string;
  productPrice: number;
  supplierId: string;
  receiverPrimaryNumber: string;
  receiverSecondaryNumber: string;
  deliveryPrice: number;
  driverPrice: number;
  isLikelyToBreak: boolean;
  note?: string;
};
export type OrderDetailsType = {
  id: string;
  supplierName: string;
  supplierPhoneNumber: string;
  address: string;
  invoiceNo: string;
  remark: string;
  status: number;
};
export type OrderResDetailsType = {
  productName?: string;
  productAmount: number;
  supplier: SupplierResDataType;
  receiverNumberPhone: string;
  address: string;
  deliveryAmount: number;
  driverAmount: number;
  invoiceNo: string;
  remark: string;
};
export type OrderResDataType = {
  id: "304ea309-94bb-4289-8d1d-08de14c65159";
  driver: DriverDataType;
  toCity: CityDataType;
  neighborhood: NeighborhoodResDataType;
  address: string;
  orderNo: string;
  totalOrder: number;
  paymentTerm: 1 | 2;
  productChange: 1 | 2;
  safe: SafeResDataType;
  productName: string;
  productPrice: number;
  oldProductPrice: number;
  isPriceChanged: boolean;
  supplier: SupplierResDataType;
  status: number;
  receiverPrimaryNumber: string;
  receiverSecondaryNumber?: string;
  deliveryPrice: number;
  driverPrice: number;
  receivedDate: number;
  payment: string;
  transaction: string;
  isLikelyToBreak: boolean;
  note: string;
};
