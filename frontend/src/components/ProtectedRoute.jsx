import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoute = () => {

    const { isLoggedIn } = useContext(AuthContext);


    return isLoggedIn
        ? <Outlet />
        : <Navigate to="/" replace />

}

export default ProtectedRoute;