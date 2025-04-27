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
        className={`dark:bg-gray-900 grid grid-cols-1 md:grid-cols-12 min-h-dvh ${
          hiddenPath.includes(pathname) && "hidden"
        }`}
      >
        <header className="col-span-1 md:col-span-12 fixed w-full">
          <Navbar />
        </header>

        <aside className="hidden md:block mt-14 md:col-span-4 lg:col-span-3 xl:col-span-2">
          <Sidebar />
        </aside>
      </main>
      <section
        className={` ${
          hiddenPath.includes(pathname) ? "mt-0" : "mt-14"
        } col-span-1 overflow-auto px-8 py-4 md:col-span-8 lg:col-span-9 xl:col-span-10`}
      >
        {children}
      </section>
    </>
  );
};

export default Layout;
