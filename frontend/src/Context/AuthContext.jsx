import { createContext, useState } from "react";
export const AuthContext = createContext(null);

export default function AuthContextProvider ({children}){ 
    //setting the  initial value of isLoggedIn based on the expression return true or false
    const [isLoggedIn , setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === 'true');
    async function login(obj){
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(obj)
            }
        );
        const data = await response.json();
        if(!response.ok){
            return{
                success:false,
                message: data.message || "Login failed",
            }
        }
        // localStorage.setItem("isLoggedIn","true");
        setIsLoggedIn(true);

        return {
                success: true,
                data
            };
        // return response;
        } catch (error) {
            console.log("login error ->", error)
            return {
                success: false,
                message : "Server error is there."
            };
        }
        
    }

    async function signup(obj){
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(obj)
            }
        );
        const data = await response.json();
        if(!response.ok){
            return{
                success:false,
                message: data.message || "SignUp failed",
            }
        }
        // localStorage.setItem("isLoggedIn","true");
        // setIsLoggedIn(true);

        return {
                success: true,
                data
            };
        // return response;
        } catch (error) {
            console.log("SignUp error ->", error)
            return {
                success: false,
                message : "Server error is there."
            };
        }
        
    }

    //set the logged in value to false 
    function logout(){
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    }
    
    const value = {
        isLoggedIn,
        login,
        logout,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
