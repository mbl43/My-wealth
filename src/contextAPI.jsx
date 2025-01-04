import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the UserContext
const UserContext = createContext();

// Define the UserProvider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const retrievedUser = JSON.parse(localStorage.getItem("user"));
            setUser(retrievedUser);
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            setUser(null);
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
