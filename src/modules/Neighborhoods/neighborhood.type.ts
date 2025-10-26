import type { gloabResponseType } from "../../gloabal.type";
import type { CityDataType } from "../Cities/city.type";

export type NeighborhoodResType = gloabResponseType<NeighborhoodResDataType>;

export type NeighborhoodDataType = {
  id: string;
  name: string;
  description?: string;
  cityId: string;
};
export type NeighborhoodResDataType = {
  id: string;
  name: string;
  description?: string;
  city: CityDataType;
};
