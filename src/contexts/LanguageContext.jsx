import React, { createContext } from "react";
import { vn } from "./../language/vn";
import { en } from "./../language/en";
import { useStorage } from "./../hooks/useLocalStorage";

export const LanguageContext = createContext(null); // Fixed createContext usage

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useStorage("LANG", "vn"); // Fix useStorage syntax
  const text = language === "en" ? en : vn;
  // const routs = language === "en" ? routs_en : routs_vn; // Uncomment when routs_en and routs_vn are defined
  return (
    <LanguageContext.Provider value={{ language, setLanguage, text }}>
      {children}
    </LanguageContext.Provider>
  );
};
