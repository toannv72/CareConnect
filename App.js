import React, { useEffect, useRef } from "react";
import Routes from "./Routes.jsx";
import { LanguageProvider } from "./src/contexts/LanguageContext";
import { Styles } from "./src/styles/Styles.jsx";
import { AuthProvider } from "./auth/useAuth.jsx";
import { NotificationsProvider } from './src/contexts/NotificationsContext.jsx';
import { FavoriteProvider } from './src/contexts/FavoriteContext.jsx';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as Linking from 'expo-linking';
import BillHistory from "./src/page/Bills/BillHistory.jsx";

const App = () => {

  return (
    <LanguageProvider>
      <AuthProvider>
        <FavoriteProvider>
          <RootSiblingParent>
            <NotificationsProvider>
              <Routes />
            </NotificationsProvider>
          </RootSiblingParent>
        </FavoriteProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
