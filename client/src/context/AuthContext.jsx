import React, { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
    return () => {
      localStorage.setItem("token", token);
    };
  }, []);

  let value = {
    token,
    username,
    name,
    email,
    setToken,
    setUsername,
    setName,
    setEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function setUser(
  { tokenToSet, usernameToSet, nameToSet, emailToSet },
  { setToken, setUsername, setName, setEmail },
) {
  setToken(tokenToSet);
  setUsername(usernameToSet);
  setName(nameToSet);
  setEmail(emailToSet);
}

export function logOutUser() {
  setToken("");
  setUsername("");
  setName("");
  setEmail("");
}
