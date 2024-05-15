import React from "react";
import Routes from "./Routes.jsx";
import { LanguageProvider } from "./src/contexts/LanguageContext";
import { Styles } from "./src/styles/Styles.jsx";

const App = () => {
  return (
    <LanguageProvider>
      {/* <Styles> */}
        <Routes />
      {/* </Styles> */}
    </LanguageProvider>

  );
};

export default App;
