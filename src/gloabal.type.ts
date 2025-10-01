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
export type QueryValidationType = {
  pageSize?: string;
  currentPage?: string;
  currentOrderBy?: string;
  isAscending?: string;
  search?: string;
  status?: string;
  customerId?: string;
  supplierId?: string;
  forCompare?: string;
};
export type DataGridProps<T> = {
  columns: ColumnsType<T>[];
  title: string;
  hasCreate?: boolean;
  data: {
    items: T[];
    totalCount: number;
  };
  loading: boolean;
  className?: string;
};
export type ColumnsType<T> = {
  title: string;
  key: string;
  dataIndex: string;
  sorter?: boolean;
  render?: (row: T) => React.ReactNode | React.ReactElement;
};
export type ActionsPropsType = {
  id: string;
  hasEdit?: boolean;
  hasShow?: boolean;
};
