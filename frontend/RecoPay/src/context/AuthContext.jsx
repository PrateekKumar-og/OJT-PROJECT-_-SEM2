import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("recopay_user");
        return saved ? JSON.parse(saved) : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("recopay_user", JSON.stringify(userData));
    };

    const signup = (userData) => {
        // Save to registered users list
        const users = JSON.parse(localStorage.getItem("recopay_users") || "[]");
        users.push(userData);
        localStorage.setItem("recopay_users", JSON.stringify(users));

        // Auto login
        login(userData);
    };

    const loginWithGoogle = (email) => {
        const userData = {
            name: email.split("@")[0],
            email: email,
            method: "google",
            avatar: email.charAt(0).toUpperCase()
        };
        login(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("recopay_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};
