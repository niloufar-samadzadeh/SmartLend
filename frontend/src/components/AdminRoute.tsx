import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: JSX.Element;
}

export default function AdminRoute({
  children,
}: AdminRouteProps) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));

  if (
    payload[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ] !== "Admin"
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}