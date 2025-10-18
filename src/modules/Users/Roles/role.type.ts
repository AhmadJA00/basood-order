import type { gloabResponseType } from "../../../gloabal.type";

export type RoleResType = gloabResponseType<RoleDataType>;

export type RoleDataType = {
  id: string;
  title: string;
  permissions: string[];
};
export type RoleListDataType = Omit<RoleDataType, "permissions">;
export type Permission = {
  id: string;
  title: string;
  entity: string;
};
