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
  const [nurseSchedules, setNurseSchedules, removeNurseSchedules] = useStorage("nurseSchedules", []);
  const [accessToken, setAccessToken, removeAccessToken] = useStorage("accessToken", null);

  const login = (userData) => {
    const ability = new Ability(defineRulesFor(userData));
    setUser({ ...userData })
    setElders(userData?.elders)
    setContracts(userData?.contracts)
    setNurseSchedules(userData?.nurseSchedules)
    setRole(userData?.roles[0])
  };

  const update = (userData) => {
    const ability = new Ability(defineRulesFor(userData));
    setUser({ ...userData });
  };

  const logout = () => {
    // setUser(null);
    // setAccessToken(null);
    removeUser();
    removeAccessToken();
    removeElders();
    removeContracts();
    removeNurseSchedules();
    removeRole();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, contracts, elders, accessToken, nurseSchedules, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
