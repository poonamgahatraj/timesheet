import React, { createContext, useContext, useState } from 'react';

// Create the UserContext
export const UserContext = createContext();

// Define the UserProvider component (name should be PascalCase)
export const UserProvider = ({ children }) => {
  // Use useState to store the list of users
  const [users, setUsers] = useState([
    { name: 'poonam', email: 'poonam@example.com', hourlyRate: 30 },
    { name: 'vishu', email: 'vishu@example.com', hourlyRate: 28 },
    { name: 'laxmi', email: 'laxmi@example.com', hourlyRate: 25 },
    { name: 'suraj', email: 'suraj@example.com', hourlyRate: 32 },
    { name: 'revansh', email: 'revansh@example.com', hourlyRate: 29 }
  ]);

  return (
    // Provide both users and the function to update users (setUsers)
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the UserContext
export const useUserContext = () => useContext(UserContext);
