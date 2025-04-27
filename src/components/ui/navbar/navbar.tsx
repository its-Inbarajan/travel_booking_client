import React from "react";
import { useAuth } from "../../../context/authContext";
import { useTheme } from "../../../context/themeContext";
import { Link } from "react-router-dom";
import { LocateFixedIcon } from "lucide-react";

const Navbar = () => {
  const [toggle, setToggle] = React.useState(false);
  const handleDropToggle = () => {
    setToggle((preve) => !preve);
  };
  const { logout, user } = useAuth();
  const { setTheme } = useTheme();

  const handlelogout = () => {
    logout();
  };
  return (
    <div className=" font-poppins inset-0">
      <div className="flex md:px-8 px-6 items-center w-full justify-between h-16 dark:bg-gray-900 border-b-[1px] dark:border-b-white border-b-gray-800 bg-white">
        <Link
          to={"/"}
          className="flex items-center gap-2 justify-center bg-white dark:bg-gray-900"
        >
          <LocateFixedIcon className="size-7 dark:text-white text-black" />
          <span className="dark:text-white text-black font-bold uppercase">
            TRAVELS
          </span>
        </Link>

        <div className="flex gap-3 relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div role="radiogroup" className="theme-switcher">
            <button
              type="button"
              role="radio"
              data-theme-switcher="true"
              data-active="false"
              className="theme-switcher_switch"
              aria-label="Switch to light theme"
              aria-checked="false"
              onClick={() => setTheme("light")}
            >
              <svg
                style={{ color: "currentcolor", width: "16px", height: "16px" }}
                width="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke="currentColor"
                shape-rendering="geometricPrecision"
                height="24"
                fill="none"
                data-testid="geist-icon"
                className="icon"
              >
                <circle r="5" cy="12" cx="12"></circle>
                <path d="M12 1v2"></path>
                <path d="M12 21v2"></path>
                <path d="M4.22 4.22l1.42 1.42"></path>
                <path d="M18.36 18.36l1.42 1.42"></path>
                <path d="M1 12h2"></path>
                <path d="M21 12h2"></path>
                <path d="M4.22 19.78l1.42-1.42"></path>
                <path d="M18.36 5.64l1.42-1.42"></path>
              </svg>
            </button>
            <button
              type="button"
              role="radio"
              data-theme-switcher="true"
              data-active="false"
              className="theme-switcher_switch"
              aria-label="Switch to system theme"
              aria-checked="false"
              onClick={() => setTheme("system")}
            >
              <svg
                style={{ color: "currentcolor", width: "16px", height: "16px" }}
                width="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke="currentColor"
                shape-rendering="geometricPrecision"
                height="24"
                fill="none"
                data-testid="geist-icon"
                className="icon"
              >
                <rect ry="2" rx="2" height="14" width="20" y="3" x="2"></rect>
                <path d="M8 21h8"></path>
                <path d="M12 17v4"></path>
              </svg>
            </button>
            <button
              type="button"
              role="radio"
              data-theme-switcher="true"
              data-active="true"
              className="theme-switcher_switch"
              aria-label="Switch to dark theme"
              aria-checked="true"
              onClick={() => setTheme("dark")}
            >
              <svg
                style={{ color: "currentcolor", width: "16px", height: "16px" }}
                width="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke="currentColor"
                shape-rendering="geometricPrecision"
                height="24"
                fill="none"
                data-testid="geist-icon"
                className="icon"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            </button>
          </div>

          <button
            type="button"
            onClick={handleDropToggle}
            className="flex text-sm bg-gray-800 cursor-pointer rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            {user?.user_name && (
              <div className="h-10 w-10 rounded-full flex items-center justify-center capitalize text-base">
                {user?.user_name?.toString()[0] ?? "T"}
              </div>
            )}
          </button>
          {toggle && (
            <div
              className="z-50 my-4 absolute w-full  -left-4 top-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <Link to={"/#"}>
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {user?.user_name ?? "Bonnie Green"}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                    {user?.email ?? "name@flowbite.com"}
                  </span>
                </Link>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li className="border-b-[0.2px] border-gray-100">
                  <Link
                    to={`/profile/${user.userId}`}
                    className="block px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    name="Sign out"
                    onClick={handlelogout}
                    className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
