import React, { createContext, useContext, useState } from 'react';

// Create the UserContext
export const UserContext = createContext();

// Define the UserProvider component (name should be PascalCase)
export const UserProvider = ({ children }) => {
  // Use useState to store the list of users
  const [users, setUsers] = useState([
    { name: 'poonam', email: 'poonam@example.com', hourlyRate: 30, role: 'worker' },
    { name: 'vishu', email: 'vishu@example.com', hourlyRate: 28, role: 'worker' },
    { name: 'laxmi', email: 'laxmi@example.com', hourlyRate: 25, role: 'worker' },
    { name: 'suraj', email: 'suraj@example.com', hourlyRate: 32, role: 'admin' }, // Suraj's role is 'admin'
    { name: 'revansh', email: 'revansh@example.com', hourlyRate: 29, role: 'worker' }
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
