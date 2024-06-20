import React, { createContext, useContext, useState } from "react";
import { Ability } from "@casl/ability";
import { defineRulesFor } from "./ability";
import { useStorage } from "../src/hooks/useLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useStorage("user", null);
  const [elders, setElders] = useStorage("elders", []);
  const [accessToken, setAccessToken] = useStorage("accessToken", null);

  const login = (userData) => {
    const ability = new Ability(defineRulesFor(userData));
    setUser({ ...userData});
    setElders(userData?.elders)
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
