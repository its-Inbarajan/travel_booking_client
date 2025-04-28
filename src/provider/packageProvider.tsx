import React, { JSX } from "react";
import {
  Package,
  PackageContext,
  Pagination,
} from "../context/packagesContext";

export const PackageProvider = ({ children }: { children: JSX.Element }) => {
  const [packages, setPackage] = React.useState<Package[]>([]);
  const [params, setParams] = React.useState({
    search: "",
    status: "",
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = React.useState<Pagination>({
    limit: null,
    page: null,
    totalCount: null,
  });
  React.useEffect(() => {
    async function getPackages(): Promise<void> {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/package/getPackages?search=${
            params.search
          }&status${params.status}&page=${params.page}&limit=${params.limit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }
        setPackage(result.responses);
        setPagination(result.pagination);
      } catch (error) {
        if (error instanceof Error) {
          // toast.error(error.message);
          console.log(error.message);
        }
      }
    }
    getPackages();
  }, [params.limit, params.search, params.page, params.status]);

  return (
    <PackageContext.Provider
      value={{
        packages,
        setPackage,
        setParams,
        pagination,
        setPagination,
        params,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};
