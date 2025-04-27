import { NotebookPen } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

const Sidebar = () => {
  const { user } = useAuth()!;
  const sidebars = [
    {
      id: 0,
      title: "dashboard",
      svg: "",
      path: `dashboard/${user?.userId}`,
    },
    {
      id: 1,
      title: "Manage Packages",
      svg: "",
      path: `packages/${user?.userId}`,
    },
    {
      id: 2,
      title: "Analytics & Reports",
      svg: "",
      path: `analytics-reports/${user?.userId}`,
    },
  ];
  return (
    <div className="hidden md:flex h-full flex-col w-56 dark:bg-slate-800 bg-white">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <aside className="flex-1 py-4 space-y-5 dark:bg-gray-900 border-r-[1px] border-r-gray-800 dark:border-r-white bg-white">
          {sidebars &&
            sidebars.map((items) => (
              <Link
                key={items.id}
                to={items.path}
                className="flex items-center capitalize px-4 py-2 text-black dark:text-white hover:bg-gray-700"
              >
                <NotebookPen className="size-5 mr-1.5" />
                <span className="font-poppins font-semibold leading-6 tracking-wide inline-block">
                  {items.title}
                </span>
              </Link>
            ))}
        </aside>
      </div>
    </div>
  );
};
export default Sidebar;
