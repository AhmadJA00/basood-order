import type { gloabResponseType } from "../../gloabal.type";

export type BranchResType = gloabResponseType<BranchDataType>;

export type BranchDataType = {
  id: string;
  location: string;
  name: string;
  description?: string;
};
