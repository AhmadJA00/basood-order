import type { gloabResponseType } from "../../gloabal.type";
import type { CityDataType } from "../Cities/city.type";

export type ZoneResType = gloabResponseType<ZoneResDataType>;

export type ZoneDataType = {
  id: string;
  name: string;
  description?: string;
  cityId: string;
};
export type ZoneResDataType = {
  id: string;
  name: string;
  description?: string;
  city: CityDataType;
};
