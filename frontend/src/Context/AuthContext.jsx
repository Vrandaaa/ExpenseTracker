import { createContext, useState } from "react";
export const AuthContext = createContext(null);
import { useEffect } from 'react';


export default function AuthContextProvider({ children }) {
    //setting the  initial value of isLoggedIn based on the expression return true or false
    // const [isLoggedIn , setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === 'true');

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    //navigate to home page if isLoggedIn value is true.
    useEffect(() => {
        checkAuth();
    }, []);


    async function checkAuth() {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/me`,
                {
                    credentials: "include"
                }
            );
            const data = await response.json();
            if (data.success) {
                setUser(data.user);
                // toast.success(data.message);
                // navigate("/home");
            }
            else {
                setUser(null);
            }
        } catch (error) {
            console.log("Authentication check failed:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function login(obj) {
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
            if (!response.ok) {
                return {
                    success: false,
                    message: data.message || "Login failed",
                }
            }
            // localStorage.setItem("isLoggedIn","true");
            // setIsLoggedIn(true);
            checkAuth();
            return {
                success: true,
                data
            };
            // return response;
        } catch (error) {
            console.log("login error ->", error)
            return {
                success: false,
                message: "Server error is there."
            };
        }

    }

    async function signup(obj) {
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
            if (!response.ok) {
                return {
                    success: false,
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
                message: "Server error is there."
            };
        }

    }

    async function logout() {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );
            const data = await response.json();

            if (response.ok) {
                // setIsLoggedIn(false);
                return data;
            }
        } catch (error) {
            console.log("Logout error ->", error);
        }
    }

    const value = {
        loading,
        user,
        login,
        logout,
        signup,
        // checkAuth
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
