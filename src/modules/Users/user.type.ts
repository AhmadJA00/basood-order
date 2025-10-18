import type { gloabResponseType } from "../../gloabal.type";

export type UserResType = gloabResponseType<UserDataType>;

export type UserDataType = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  roleId: number;
  password: string;
  confirmPassword: string;
  userType: number;
  driverId: number;
  supplierId: number;
  branchIds: number[];
};
export type UserResDataType = UserDataType;
