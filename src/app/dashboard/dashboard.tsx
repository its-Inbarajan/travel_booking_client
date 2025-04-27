import React, { ChangeEvent } from "react";
import Table from "../../components/ui/tables/table";
import { useBooking } from "../../context/bookingContext";
import { usePackage } from "../../context/packagesContext";
import { Edit2, Trash2 } from "lucide-react";
import { Inputs } from "../../components/ui/input/input";

export const Dashboard: React.FC = () => {
  const { data } = useBooking();
  const { packages, pagination, setParams, params } = usePackage();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  return (
    <>
      <section
        aria-labelledby="ticket-statistics-tabs-label"
        className="pb-2 mt-14"
      >
        <h1
          id="ticket-statistics-tabs-h1"
          className="font-semibold text-xl block my-2 font-poppins leading-5 tracking-wide"
        >
          Ticket Statistics
        </h1>
        <ul className="flex mt-3">
          <li>
            <button className="p-2 rounded-l-md border border-r-0 dark:bg-gray-500  flex flex-col items-center w-24">
              <p className="font-semibold text-lg">16</p>
              <p className="uppercase text-gray-950 dark:text-gray-200 text-sm">
                Bookings
              </p>
            </button>
          </li>
          <li>
            <button className="p-2 border border-r-0 dark:bg-gray-500  flex flex-col items-center w-24">
              <p className="font-semibold text-lg">2</p>
              <p className="uppercase text-gray-950 dark:text-gray-200 text-sm">
                Current
              </p>
            </button>
          </li>

          <li>
            <button className="p-2 border rounded-r-md dark:bg-gray-500  flex flex-col items-center w-24">
              <p className="font-semibold text-lg">32</p>
              <p className="uppercase text-gray-950 dark:text-gray-200 text-sm">
                Expired
              </p>
            </button>
          </li>
        </ul>
      </section>

      <section className="pb-2 mt-3">
        <h1 className="font-semibold mb-4 text-xl block font-poppins leading-5 tracking-wide">
          Analytics & Reports
        </h1>
        <div className="overflow-x-auto">
          <Table className="dark:bg-gray-800 bg-gray-500">
            <thead className="dark:bg-gray-800 bg-gray-500">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium dark:text-gray-100 text-black capitalize font-poppins tracking-wider"
                >
                  User Details
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium dark:text-gray-100 text-black capitalize font-poppins tracking-wider"
                >
                  Package Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium dark:text-gray-100 text-black capitalize font-poppins tracking-wider"
                >
                  From-To
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium dark:text-gray-100 text-black capitalize font-poppins tracking-wider"
                >
                  Base price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium dark:text-gray-100 text-black capitalize font-poppins tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium dark:text-gray-100 text-black capitalize font-poppins tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="dark:bg-gray-800 bg-gray-200 rounded-b-sm divide-y dark:divide-gray-200 divide-gray-800">
              {data &&
                data.length > 0 &&
                data.map((items) => (
                  <tr
                    key={items._id}
                    className="dark:hover:bg-gray-700 hover:bg-gray-500 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {items.userId?.profile && (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={items.userId?.profile}
                              alt=""
                              loading="lazy"
                            />
                          )}
                          {!items.userId?.profile && (
                            <div className="h-10 w-10 rounded-full dark:bg-gray-500 bg-gray-300 flex justify-center items-center capitalize font-semibold text-xl">
                              {items.userId?.user_name.toString()[0]}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-950 dark:text-gray-200">
                            {items.userId?.user_name}
                          </div>
                          <div className="text-sm text-gray-950 dark:text-gray-200">
                            {items.userId?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-950 dark:text-gray-200">
                        {items.packageId?.package_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-950 dark:text-gray-200">
                        {items.packageId?.from} - {items.packageId?.to}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-950 dark:text-gray-200">
                        {items.packageId?.base_price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-950 dark:text-gray-200">
                        {items.packageId?.start_date} -{" "}
                        {items.packageId?.end_date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* {(items.packageId?.start_date as string) >
                        new Date().getDate().toString() && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                        )} */}
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}

              {data.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center">
                    Data Not found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </section>

      <section className="pb-2">
        <div className="flex justify-between mb-4 items-center gap-4">
          <h1 className="font-semibold  text-xl block font-poppins leading-5 tracking-wide">
            Packages
          </h1>

          <Inputs
            type="search"
            id="search"
            name="search"
            autoCapitalize="off"
            value={params.search}
            onChange={handleSearch}
            placeholder="Search package name"
            className="w-full ring-1 ring-gray-500 max-w-2xs rounded-md px-3 mt-2 py-2.5 font-poppins leading-5 tracking-wide text-sm"
          />
        </div>
        <div className="overflow-x-auto">
          <Table className="dark:bg-gray-800 bg-gray-500">
            <thead className="dark:bg-gray-800 bg-gray-500">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium dark:text-gray-100 text-black capitalize font-poppins tracking-wider"
                >
                  Created By
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium dark:text-gray-100 text-black capitalize font-poppins tracking-wider"
                >
                  Package Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium dark:text-gray-100 text-black capitalize font-poppins tracking-wider"
                >
                  From-To
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium dark:text-gray-100 text-black capitalize font-poppins tracking-wider"
                >
                  Base price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium dark:text-gray-100 text-black capitalize font-poppins tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium dark:text-gray-100 text-black capitalize font-poppins tracking-wider"
                >
                  actions
                </th>
              </tr>
            </thead>
            <tbody className="dark:bg-gray-800 bg-gray-200 rounded-b-sm divide-y dark:divide-gray-200 divide-gray-800">
              {packages &&
                packages.length > 0 &&
                packages.map((items) => (
                  <tr
                    key={items._id}
                    className="dark:hover:bg-gray-700 hover:bg-gray-500 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {items.posterDetails?.profile && (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={items.posterDetails?.profile}
                              alt=""
                              loading="lazy"
                            />
                          )}
                          {!items.posterDetails?.profile && (
                            <div className="h-10 w-10 rounded-full dark:bg-gray-500 bg-gray-300 flex justify-center items-center capitalize font-semibold text-xl">
                              {items.posterDetails?.user_name?.toString()[0]}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-950 dark:text-gray-200">
                            {items.posterDetails?.user_name}
                          </div>
                          <div className="text-sm text-gray-950 dark:text-gray-200">
                            {items.posterDetails?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-950 dark:text-gray-200">
                        {items?.package_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-950 dark:text-gray-200">
                        {items?.from} - {items?.to}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-950 dark:text-gray-200">
                        {items?.base_price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-950 dark:text-gray-200">
                        {items?.start_date} - {items?.end_date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-4 items-center">
                      <button className="w-5 h-5 rounded-full cursor-pointer flex items-center justify-center">
                        <Edit2 className="size-5 mt-2 text-blue-500" />
                      </button>
                      <button className="w-5 h-5 rounded-full cursor-pointer flex items-center justify-center">
                        <Trash2 className="size-5 mt-2 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}

              {packages.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center">
                    Data Not found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className="dark:bg-gray-800 bg-gray-500 px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between flex-col sm:flex-row">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm">
                Showing <span className="font-medium">{pagination.page}</span>{" "}
                to <span className="font-medium">{pagination.limit}</span> of{" "}
                <span className="font-medium">{pagination.totalCount}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-indigo-100"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  8
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  9
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
