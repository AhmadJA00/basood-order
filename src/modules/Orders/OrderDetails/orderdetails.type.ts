import type { gloabResponseType } from "../../../gloabal.type";
import type { CityDataType } from "../../Cities/city.type";
import type { DriverDataType } from "../../Drivers/driver.type";
import type { NeighborhoodResDataType } from "../../Neighborhoods/neighborhood.type";
import type { SupplierResDataType } from "../../Suppliers/supplier.type";

export type OrderDetailsResType = gloabResponseType<OrderDetailsDataType>;

export type OrderDetailsDataType = {
  id: string;
  address: string;
  branchId: number;
  deliveryPrice: number;
  driverPrice: number;
  invoiceNo: string;
  driver: DriverDataType;
  isPriceChanged: boolean;
  oldProductPrice: number;
  orderId: string;
  toCity: CityDataType;
  neighborhood: NeighborhoodResDataType;
  productPrice: number;
  productName?: string;
  receiverNumberPhone: string;
  remark: string;
  status: number;
  supplier: SupplierResDataType;
};
