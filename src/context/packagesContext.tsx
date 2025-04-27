import React, { Dispatch, SetStateAction } from "react";

export interface Package {
  _id?: string;
  end_date?: string;
  from?: string;
  start_date?: string;
  to?: string;
  package_name?: string;
  base_price?: string;
  posterDetails?: {
    _id: string;
    email: string;
    profile: string;
    user_name: string;
  };
  bookedUsers?: [
    {
      _id: string;
      email: string;
      profile: string;
      user_name: string;
    }
  ];
}

export interface Pagination {
  limit?: number | null;
  page?: number | null;
  totalCount?: number | null;
}

interface URLParams {
  search: string;
  status: string;
  page: number;
  limit: number;
}
interface InitialState {
  packages: Package[];
  setPackage: Dispatch<SetStateAction<Package[]>>;
  setParams: Dispatch<SetStateAction<URLParams>>;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  pagination: Pagination;
  params: URLParams;
}

const InitialState: InitialState = {
  packages: [],
  setPackage: () => {},
  setParams: () => {},
  setPagination: () => {},
  pagination: {},
  params: {
    search: "",
    status: "",
    limit: 10,
    page: 1,
  },
};

export const PackageContext = React.createContext<InitialState>({
  ...InitialState,
});

export const usePackage = () => {
  const pack = React.useContext(PackageContext);

  if (!pack) {
    throw new Error("usePackage must be use within package Context");
  }
  return pack;
};
