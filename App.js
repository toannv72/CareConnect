import React from "react";
import Routes from "./Routes.jsx";
import { LanguageProvider } from "./src/contexts/LanguageContext";

const App = () => {
  return (
    <LanguageProvider>
      <Routes />
    </LanguageProvider>

  );
};

export default App;
