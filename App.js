import React, {useEffect, useRef } from "react";
import Routes from "./Routes.jsx";
import { LanguageProvider } from "./src/contexts/LanguageContext";
import { Styles } from "./src/styles/Styles.jsx";
import { AuthProvider } from "./auth/useAuth.jsx";
import { CartProvider } from './src/contexts/CartContext.jsx';
import { FavoriteProvider } from './src/contexts/FavoriteContext.jsx';
import Toast from 'react-native-toast-message';
import * as Linking from 'expo-linking';
import BillHistory from "./src/page/Bills/BillHistory.jsx";

const App = () => {

  return (
    <LanguageProvider>
      <AuthProvider>
        <FavoriteProvider>
          {/* <Styles> */}
          <Routes />
          <Toast />
          {/* </Styles> */}
        </FavoriteProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
