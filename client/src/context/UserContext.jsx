import React, { createContext, useState, useContext } from 'react';
import AuthContext from './AuthContext';

// Create context
const UserContext = createContext();

// UserContext provider
export const UserProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const [userProfile, setUserProfile] = useState(user);

  // Optionally, you can fetch additional user data here if needed.

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
