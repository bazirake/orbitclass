import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  //Check if user is logged in
  const userinfo = JSON.parse(localStorage.getItem('auth')!); // or "token", depending on your login logic
  //If not logged in,redirect to login page
  if(!userinfo) {
    return <Navigate to="/" replace />;
  }
  //Otherwise, render the child route content
  return <Outlet />;
};

export default ProtectedRoute;