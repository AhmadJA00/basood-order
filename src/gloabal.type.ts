import type { ReactNode } from "react";

export type gloabResponseType<T> = {
  items: T[];
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
  totalCount: number;
  totalPage: number;
};

export type UserData = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  imageUrl: string;
  userType: "admin" | "supplier" | "driver";
};

export type LoginType = {
  username: string;
  password: string;
};

export type UserSeation = {
  refreshToken: string;
  token: string;
  expired: string;
  permissions: string;
};
export type AuthContextType = {
  userLoggedIn: boolean;
  currentUser: UserData | null;
  userSeation: UserSeation | null;
  signOut: () => Promise<void>;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserSeation: React.Dispatch<React.SetStateAction<UserSeation | null>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserData | null>>;
};
export type NotificationContextType = {
  openNotification: (
    type: "success" | "info" | "warning" | "error",
    message: string,
    description?: string
  ) => void;
};
export type QueryValidationType = {
  pageSize?: string;
  currentPage?: string;
  currentOrderBy?: string;
  isAscending?: string;
  search?: string;
  supplierId?: string;
  driverId?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
};
export type DataGridProps<T> = {
  children?: React.ReactNode;
  columns: ColumnsType<T>[];
  title: string;
  hasCreate?: boolean;
  data: {
    items: T[];
    totalCount: number;
  };
  loading: boolean;
  className?: string;
  size?: "small" | "middle" | "large";
};
export type ColumnsType<T> = {
  title: string;
  key: string;
  dataIndex: string;
  responsive: string[];
  sorter?: boolean;
  render?: (row: T) => React.ReactNode | React.ReactElement;
};
export type ActionsPropsType = {
  id: string;
  hasEdit?: boolean;
  hasShow?: boolean;
};

export type LoaderGetFuncType = {
  queryOBJ?: QueryValidationType;
  id?: string;
  signal?: AbortSignal;
};
export type CardProps = {
  title: string;
  children: ReactNode;
};
export type InputName<T> =
  | keyof T
  | {
      [K in keyof T]: T[K] extends Array<infer U>
        ? [K, keyof U]
        : T[K] extends object
        ? [K, keyof T[K]]
        : never;
    }[keyof T];

export type ModalProps = {
  children: React.ReactNode;
  title?: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  width?: number;
};
export type ShowDataProp = {
  label: string;
  data: React.ReactNode;
  vertical?: boolean;
};
export type OptionType = { value: number | string | boolean; label: string };
export type OrderStatus =
  | "OrderPending" // 1
  | "DriverReceived" // 2
  | "OfficeReceived" // 3
  | "DriverPending" // 4
  | "DriverPickUp" // 5
  | "PostPone" // 6
  | "PartiallyDelivered" // 7
  | "Delivered" // 8
  | "Cancelled" // 9
  | "CancelledOfficeReceived" // 10
  | "PartiallyCancelledOfficeReceived" // 11
  | "CancelledDriverReceived" // 12
  | "PartiallyCancelledDriverReceived" // 13
  | "PaymentProcessing" // 14
  | "PartiallyPaymentProcessing" // 15
  | "CancelledSupplierReceived" // 16
  | "PartiallyCancelledSupplierReceived" // 17
  | "PartiallyCompleted" // 18
  | "Completed"; // 19

type NestedFieldError = {
  [index: string]: string;
};

type ErrorFieldObject = {
  [fieldName: string]: (string | NestedFieldError)[];
};

export type ObjType = ErrorFieldObject;
export type HelperFunctionErrorType = { label: string; error: string };
