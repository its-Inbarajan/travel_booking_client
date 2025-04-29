import { Edit2, Trash2, X } from "lucide-react";
import { Inputs } from "../../components/ui/input/input";
import { usePackage } from "../../context/packagesContext";
import React, { ChangeEvent } from "react";
import Table from "../../components/ui/tables/table";
import { toast } from "sonner";

const Packages = () => {
  const { packages, pagination, setParams, params } = usePackage();
  const [toggle, setToggle] = React.useState<{
    update: boolean;
    delete: boolean;
  }>({
    delete: false,
    update: false,
  });
  const [travelpackage, setTravelPackage] = React.useState({
    accommondation: "",
    base_price: "",
    end_date: "",
    from: "",
    posted_by: "",
    start_date: "",
    to: "",
    package_name: "",
  });
  const toggleModal = (params: "update" | "delete", id: string) => {
    setToggle((preve) => ({
      ...preve,
      [params]: !preve[params],
    }));
    getById(id);
  };

  const getById = React.useCallback(async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL!}/package/getById/${id}`,
        // `http://localhost:4000/api/v1/package/getById/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  const handleUpdateInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTravelPackage((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  return (
    <>
      <section className="pb-2 mt-12">
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
                      <button
                        type="button"
                        onClick={() => toggleModal("update", items._id!)}
                        className="w-5 h-5 rounded-full cursor-pointer flex items-center justify-center"
                      >
                        <Edit2 className="size-5 mt-2 text-blue-500" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleModal("delete", items._id!)}
                        className="w-5 h-5 rounded-full cursor-pointer flex items-center justify-center"
                      >
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

      {/* update modal */}
      {toggle["update"] && (
        <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
          <div
            role="button"
            onClick={() => toggleModal("update", "")}
            aria-hidden="true"
            className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
          ></div>
          <div className="relative w-full transition my-auto p-4">
            <div className="w-full space-y-4 border-gray-100 py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-lg">
              <div className="flex px-6 w-full justify-between items-center ">
                <h1 className="pt-2 font-semibold text-xl leading-5 tracking-wide pb-4">
                  Update Package
                </h1>
                <button type="button" onClick={() => toggleModal("update", "")}>
                  <X className="size-5 dark:text-white cursor-pointer hover:rotate-180 transition-all dark:hover:bg-white dark:hover:text-black hover:bg-gray-500 duration-500 text-black" />
                </button>
              </div>
              <div className="px-6">
                <form noValidate className=" space-y-3">
                  <Inputs
                    type="text"
                    name="package_name"
                    id="package_name"
                    onChange={handleUpdateInputChange}
                    value={travelpackage.package_name}
                    placeholder="Package name"
                    className="w-full ring-1 ring-gray-500 rounded-md px-3 mt-1 py-2.5 font-poppins leading-5 tracking-wide text-sm"
                  />
                  <Inputs
                    type="text"
                    name="from"
                    id="from"
                    onChange={handleUpdateInputChange}
                    value={travelpackage.from}
                    placeholder="From"
                    className="w-full ring-1 ring-gray-500 rounded-md px-3 mt-1 py-2.5 font-poppins leading-5 tracking-wide text-sm"
                  />
                  <Inputs
                    type="text"
                    name="to"
                    id="to"
                    onChange={handleUpdateInputChange}
                    value={travelpackage.to}
                    placeholder="To"
                    className="w-full ring-1 ring-gray-500 rounded-md px-3 mt-1 py-2.5 font-poppins leading-5 tracking-wide text-sm"
                  />
                  <Inputs
                    type="date"
                    name="start_date"
                    id="start_date"
                    onChange={handleUpdateInputChange}
                    value={travelpackage.start_date}
                    placeholder="Start Date"
                    className="w-full ring-1 ring-gray-500 rounded-md px-3 mt-1 py-2.5 font-poppins leading-5 tracking-wide text-sm"
                  />
                  <Inputs
                    type="text"
                    name="end_date"
                    id="end_date"
                    onChange={handleUpdateInputChange}
                    value={travelpackage.end_date}
                    placeholder="End Date"
                    className="w-full ring-1 ring-gray-500 rounded-md px-3 mt-1 py-2.5 font-poppins leading-5 tracking-wide text-sm"
                  />
                  <Inputs
                    type="text"
                    name="base_price"
                    id="base_price"
                    onChange={handleUpdateInputChange}
                    value={travelpackage.base_price}
                    placeholder="Price"
                    className="w-full ring-1 ring-gray-500 rounded-md px-3 mt-1 py-2.5 font-poppins leading-5 tracking-wide text-sm"
                  />
                  <textarea
                    name="accommondation"
                    id="accommondation"
                    onChange={handleUpdateInputChange}
                    value={travelpackage.accommondation}
                    placeholder="Accommondation"
                    className="w-full ring-1 ring-gray-500 rounded-md px-3 mt-1 py-2.5 font-poppins leading-5 tracking-wide text-sm"
                  />

                  <div className="flex mt-1">
                    <button
                      className="flex-1 text-sm text-center  py-4 px-2 cursor-pointer"
                      type="reset"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 dark:bg-gray-100 dark:text-gray-800 text-white bg-gray-600 font-medium  rounded text-sm text-center py-4 px-2 cursor-pointer"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* delete modal */}
      {toggle["delete"] && (
        <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
          <div
            aria-hidden="true"
            role="button"
            onClick={() => toggleModal("delete", "")}
            className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
          ></div>

          <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
            <div className="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">
              <button
                tabIndex={-2}
                type="button"
                onClick={() => toggleModal("delete", "")}
                className="absolute top-2 right-2 rtl:right-auto rtl:left-2"
              >
                <svg
                  xlinkTitle="Close"
                  className="h-4 w-4 cursor-pointer text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close</span>
              </button>

              <div className="space-y-2 p-2">
                <div className="p-4 space-y-2 text-center dark:text-white">
                  <h2
                    className="text-xl font-bold tracking-tight"
                    id="page-action.heading"
                  >
                    Delete John Doe
                  </h2>

                  <p className="text-gray-500">
                    Are you sure you would like to do this?
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div
                  aria-hidden="true"
                  className="border-t dark:border-gray-700 px-2"
                ></div>

                <div className="px-6 py-2">
                  <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                    <button
                      type="button"
                      onClick={() => toggleModal("delete", "")}
                      className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800"
                    >
                      <span className="flex items-center gap-1">
                        <span className="">Cancel</span>
                      </span>
                    </button>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700"
                    >
                      <span className="flex items-center gap-1">
                        <span className="">Confirm</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Packages;
