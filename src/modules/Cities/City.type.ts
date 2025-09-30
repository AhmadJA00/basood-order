import type { gloabResponseType } from "../../gloabal.type";

export type CityResType = gloabResponseType<CityDataType>;

export type CityDataType = {
  id: string;
  name: string;
  description?: string;
};
