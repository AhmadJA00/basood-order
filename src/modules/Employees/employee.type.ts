import type { gloabResponseType } from "../../gloabal.type";

export type EmployeeResType = gloabResponseType<EmployeeDataType>;

export type EmployeeDataType = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  birthDay: string;
  address: string;
  isMale: boolean;
  salary: number;
  emgFirstName: string;
  emgMiddleName: string;
  emgLastName: string;
  emgPrimaryPhone: string;
  emgSecondaryPhone: string;
  emgRelationShip: string;
};
export type SalaryFormUpdateType = {
  newSalary: number;
};
