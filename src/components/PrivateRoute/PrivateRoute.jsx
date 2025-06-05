import { Navigate, Outlet } from "react-router-dom";
import authStore from "../../stores/authStores";

const PrivateRoute = () => {
  const user = authStore((state) => state.user);
  return user ? <Outlet /> : <Navigate to="/auth?mode=login" />;
};

export default PrivateRoute;

