import type { gloabResponseType } from "../../gloabal.type";

export type DriverResType = gloabResponseType<DriverDataType>;

export type DriverDataType = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  driverLicense: string;
  primaryPhone: string;
  birthDay: string;
  secondaryPhone: string;
  emgFirstName: string;
  emgMiddleName: string;
  emgLastName: string;
  emgPrimaryPhone: string;
  emgSecondaryPhone: string;
  emgRelationShip: string;
  isToCustomer: boolean;
};
