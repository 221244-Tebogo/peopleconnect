// context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // This effect should check for user authentication and role
    const storedUserRole = localStorage.getItem("userRole"); // Example, replace with your logic
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
