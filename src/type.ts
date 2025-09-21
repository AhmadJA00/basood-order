// export type BusinessType = {
//   id: string;
//   title: string;
//   sellPrice: number;
//   workingCapital: number;
//   annualRevenue: number;
//   buildingRent?: number;
//   establishYear?: string;
//   employeeNumber: number;
//   description?: string;
//   longDescription?: string;
//   stockAsset: string;
//   assetPrice: number;
//   officeType: string;
//   marketCompetition: string;
//   expandCapabilities: string;
//   activationPrice: number;
//   trainingSupport: string;
//   saleReason: string;
//   agent: string;
//   country: string;
//   city?: string;
//   address?: string;
// };
export type PrimumSliderType = {
  id: string;
  image?: string;
  value?: string;
};
export type BusinessType = {
  id: string;
  userId: string;
  businessNameEn: string;
  businessNameKu?: string;
  businessNameAr?: string;
  businessSize?:
    | "startup"
    | "small_business"
    | "medium_enterprise"
    | "large_corporation";
  businessSector: string;
  country: string;
  state?: string;
  city?: string;
  saleIncludes?: string;
  reasonForSaleEn?: string;
  reasonForSaleAr?: string;
  reasonForSaleKu?: string;
  phoneNumber: string;
  countryCode: string;
  saleType?: "sellWhole" | "sellPart" | "both";
  descriptionEn?: string;
  descriptionAr?: string;
  descriptionKu?: string;
  otherInformationEn?: string;
  otherInformationAr?: string;
  otherInformationKu?: string;
  evaluatedBy?: "byMastermind" | "byBusinessOwner" | "Others";
  processOfSaleBy?: "byMastermind" | "byBusinessOwner" | "Others";
  askingPrice: number;
  annualRevenue: number;
  annualProfit?: number;
  assetsValue?: number;
  yearEstablished?: number;
  realEstateIncluded?: boolean;
  opportunityToExpand?: boolean;
  ownerFranchise?: boolean;
  handoverTraining?: boolean;
  hasFranchise?: boolean;
  image?: string;
  isPremium?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  status: "pending" | "accepted" | "rejected";
};
export type BusinessConsultingType = {
  id: string;
  title?: string;
  description?: string;
  image?: string;
};

export type LookingForInvestorType = {
  id: string;
  userId?: string;
  titleEn: string;
  titleKu?: string;
  titleAr?: string;
  businessSize: string;
  businessSector: string;
  investmentType: string;
  country: string;
  city?: string;
  state?: string;
  allocatedBudget: number;

  descriptionEn?: string;
  descriptionKu?: string;
  descriptionAr?: string;
  phoneNumber: string;
  countryCode: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  status: "pending" | "accepted" | "rejected";
};

export type LookingForIdeaType = Omit<
  LookingForInvestorType,
  "allocatedBudget"
> & {
  estimatedBudget: number;
  revenueYear1?: number;
  revenueYear2?: number;
  revenueYear3?: number;
  revenueYear4?: number;
  revenueYear5?: number;
};

export type CommercialType = {
  id: string;
  userId?: string;
  propertyNameEn: string;
  propertyNameKu?: string;
  propertyNameAr?: string;
  askingPrice: number;
  country: string;
  city?: string;
  state?: string;
  annualRent?: number;
  size?: number;
  rentalIncome?: number;
  usageEn?: string;
  usageKu?: string;
  usageAr?: string;
  propertyType?: string;
  saleType?: string;
  developmentOpportunity?: boolean;
  tenanted?: boolean;
  auction?: boolean;
  investmentOpportunity?: boolean;
  phoneNumber: string;
  countryCode: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  status: "pending" | "accepted" | "rejected";
};
export type UserData = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  imageUrl: string;
};
export interface QueryCondition {
  field: string;
  operator:
    | "=="
    | "!="
    | "<"
    | "<="
    | ">"
    | ">="
    | "array-contains"
    | "in"
    | "not-in"
    | "array-contains-any";
  value: string | number | boolean | string[] | number[] | boolean[];
}

export interface GetOptions {
  id?: string;
  queries?: QueryCondition[];
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  limitation?: number;
  search?: string;
  searchField?: string;
}

export type SelectOption = {
  value: string;
  label: string;
};

export type CountryType = {
  value: string;
  label: string;
  code: string;
  states?: {
    value: string;
    label: string;
    cities?: { label: string; value: string }[];
  }[];
};

export type stateType = {
  label: string;
  value: string;
  cities?: { label: string; value: string }[];
};
export type CategoryType = {
  id: string;
  name: string;
  children?: CategoryType[];
};

export type cityType = {
  label: string;
  value: string;
};

type ApplyType = {
  id: string;
  userId: string;
  status: "pending" | "accepted" | "rejected";
};
export type AppliedBusinessesType = ApplyType & {
  businessId: string;
};
export type AppliedFranchise = ApplyType & {
  franchiseId: string;
};
export type AppliedCommercial = ApplyType & {
  commercialId: string;
};
export type AppliedInvestors = ApplyType & {
  investorId: string;
};
export type AppliedIdeas = ApplyType & {
  ideaId: string;
};

export type DeleteConditions = {
  collectionName: string;
  queries: QueryCondition[];
  message?: string;
}[];
export type CombinedBusinessTypes =
  | BusinessType
  | CommercialType
  | LookingForIdeaType
  | LookingForInvestorType;
export type CombinedBusinessesTypes =
  | BusinessType[]
  | CommercialType[]
  | LookingForIdeaType[]
  | LookingForInvestorType[];
export type BrokerType = {
  id: string;
  nameEn: string;
  nameKu?: string;
  nameAr?: string;

  country: string;
  city?: string;
  state?: string;

  descriptionEn?: string;
  descriptionKu?: string;
  descriptionAr?: string;

  phoneNumber1: string;
  countryCode1: string;
  phoneNumber2?: string;
  countryCode2?: string;
  image?: string;
  email?: string;

  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  status: "pending" | "accepted" | "rejected";
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
