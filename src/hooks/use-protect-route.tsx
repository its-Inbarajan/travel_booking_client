import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProdectedRoute = ({ allowedRole }: { allowedRole: string[] }) => {
  const { user, check } = useAuth()!;
  if (!check || !allowedRole.includes(user?.user_type as string)) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

export default ProdectedRoute;
