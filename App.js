import React from "react";
import Routes from "./Routes.jsx";
import { LanguageProvider } from "./src/contexts/LanguageContext";
import { Styles } from "./src/styles/Styles.jsx";
import { AuthProvider } from "./auth/useAuth.jsx";

const App = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        {/* <Styles> */}
        <Routes />
        {/* </Styles> */}
      </AuthProvider>
    </LanguageProvider>

  );
};

export default App;
