import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase'; 
import { signOut } from "firebase/auth";
// Create context with initial values
const UserContext = createContext({
  user: null,
  loading: true,
  error: null,
  updateUser: () => {},
  clearUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to safely store user data in localStorage
  const saveUserToStorage = (userData) => {
    try {
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        localStorage.removeItem('user');
      }
    } catch (err) {
      console.error('Error saving user to localStorage:', err);
      setError(err instanceof Error ? err : new Error('Failed to save user data'));
    }
  };


  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);
  
  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
    saveUserToStorage(userData);
  };

  // Function to clear user data
  const clearUser = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      setUser(null);
      localStorage.removeItem("user");
        } catch (err) {
      console.error("Error signing out:", err);
    }
  };
  useEffect(() => {
    // First, try to get user from localStorage
    const initializeUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Error reading from localStorage:', err);
        localStorage.removeItem('user'); // Clear potentially corrupted data
      }
    };

    // Then, set up Firebase auth listener
    const unsubscribe = onAuthStateChanged(
      auth, 
      (firebaseUser) => {
        if (firebaseUser) {
          // Transform Firebase user into your user object
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            // Add other properties you need
          };
          updateUser(userData);
        } else {
          clearUser();
        }
        setLoading(false);
      },
      (err) => {
        console.error('Auth state change error:', err);
        setError(err);
        setLoading(false);
      }
    );

    // Initialize from storage immediately
    initializeUserFromStorage();

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Memoize context value to prevent unnecessary rerenders
  const contextValue = React.useMemo(
    () => ({
      user,
      loading,
      error,
      updateUser,
      clearUser,
    }),
    [user, loading, error]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook with error boundary
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Simple hook that only returns user data
export const useUserData = () => {
  const { user } = useUser();
  return user;
};