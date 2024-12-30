import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth/sign-in" state={{ from: location }} replace />
  );
};
export default RequireAuth;
