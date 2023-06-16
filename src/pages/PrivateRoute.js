import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/useContext";

export function PrivateRouteLogin() {
  const [state] = useContext(UserContext)

  if (!state.isLogin) {
    return <Navigate to="/" />
  }
  return <Outlet/>
}

export function PrivateRouteUser() {
  const [state] = useContext(UserContext)

  if(state.user.role === "admin") {
    return <Navigate to="/transaction" />
  }

  return <Outlet/>
}

export function PrivateRouteAdmin() {
  const [state] = useContext(UserContext)

  if(state.user.isLogin !== "admin") {
    return <Navigate to="/" />
  }

  return <Outlet />
}