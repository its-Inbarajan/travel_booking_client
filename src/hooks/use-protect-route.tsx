import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/auth-context";

const ProdectedRoute = ({ allowedRole }: { allowedRole: string[] }) => {
  //   const { user, check } = useAuth();
  const check = false;
  const user = {
    user_type: "admin",
  };
  if (!check || !allowedRole.includes(user?.user_type as string)) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

export default ProdectedRoute;
