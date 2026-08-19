import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () =>{
    const {loading , user} = useContext(AuthContext);

    if(loading){
        return <div>Loading....</div>
    }
    return user ? <Navigate  to="/home" replace/> : <Outlet/>
};

export default PublicRoute;