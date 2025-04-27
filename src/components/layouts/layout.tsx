import React from "react";
import Navbar from "../ui/navbar/navbar";
import Sidebar from "../ui/sidebar/sidebar";
import { useLocation } from "react-router-dom";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const hiddenPath = ["/", "/sign-up"];

  const { pathname } = useLocation();

  return (
    <>
      <main
        className={`${
          hiddenPath.includes(pathname)
            ? "block dark:bg-gray-900 min-h-dvh"
            : "dark:bg-gray-900 grid grid-cols-1 md:grid-cols-12 min-h-dvh "
        }`}
      >
        {!hiddenPath.includes(pathname) && (
          <header className="col-span-1 md:col-span-12 fixed w-full">
            <Navbar />
          </header>
        )}

        {!hiddenPath.includes(pathname) && (
          <aside className="hidden md:block mt-14 md:col-span-4 lg:col-span-3 xl:col-span-2">
            <Sidebar />
          </aside>
        )}
        <section
          className={`col-span-1 overflow-auto  px-8 py-4 md:col-span-8 lg:col-span-9 xl:col-span-10`}
        >
          {children}
        </section>
      </main>
    </>
  );
};

export default Layout;
