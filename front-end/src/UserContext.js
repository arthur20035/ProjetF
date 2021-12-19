import { createContext } from "react";
import React, { useState } from "react";

const UserContext = React.createContext();

export default UserContext;

export const Provider = ({ children }) => {
  const [username, setUsername] = useState("");
  return (
    <UserContext.Provider
      value={{ username: username, setUsername: "Salut les boss" }}
    >
      {children}
    </UserContext.Provider>
  );
};
