import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoute = () => {

    const { loading, user } = useContext(AuthContext);


    if (loading) {
        return <div>Checking authentication...</div>;
    }

    return user
        ? <Outlet />
        : <Navigate to="/" replace />;

}

export default ProtectedRoute;