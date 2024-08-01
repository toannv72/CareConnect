import React, { createContext, useContext, useState } from "react";
import { Ability } from "@casl/ability";
import { defineRulesFor } from "./ability";
import { useStorage } from "../src/hooks/useLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser, removeUser] = useStorage("user", null);
  const [role, setRole, removeRole] = useStorage("role", null);
  const [elders, setElders, removeElders] = useStorage("elders", []);
  const [contracts, setContracts, removeContracts] = useStorage("contracts", []);
  const [accessToken, setAccessToken, removeAccessToken] = useStorage("accessToken", null);
  const [expoPushToken, setExpoPushToken, removeExpoPushToken] = useStorage("expoPushToken", "");

  const login = (userData, expoPushToken) => {
    const ability = new Ability(defineRulesFor(userData));
    setUser({ ...userData })
    setElders(userData?.elders)
    setContracts(userData?.contracts)
    setRole(userData?.roles[0])
    setExpoPushToken(expoPushToken)
  };

  const update = (userData) => {
    const ability = new Ability(defineRulesFor(userData));
    setUser({ ...userData });
  };

  const logout = async () => {
    await removeUser();
    setUser(null);
    removeAccessToken();
    removeElders();
    removeContracts();
    removeRole();
    removeExpoPushToken();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, contracts, elders, accessToken, role, expoPushToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
