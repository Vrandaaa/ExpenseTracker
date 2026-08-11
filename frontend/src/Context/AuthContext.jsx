import { createContext, useState } from "react";
export const AuthContext = createContext(null);

export default function AuthContextProvider ({children}){ 
    const [isLoggedIn , setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn")=== 'true');
    function login(){
        localStorage.setItem("isLoggedIn","true");
        setIsLoggedIn(true);
    }

    function logout(){

        localStorage.removeItem("isLoggedIn");

        setIsLoggedIn(false);
    }
    
    const value = {
        isLoggedIn,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
