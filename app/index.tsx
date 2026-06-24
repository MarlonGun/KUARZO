import React from "react";
import { usePlatform } from "@/hooks/usePlatform";
import HomeWeb from "@/src/views/AppWeb/HomeWeb";
import CatalogoMovil from "@/src/views/AppMovil/CatalogoMovil";

import { Redirect } from "expo-router";
import { useAuthStore } from "@/src/store/useAuthStore";

const App = () => {
  const platform = usePlatform();
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);

  if (platform === 'movil') {
    if (!isAuthenticated) {
      return <Redirect href="/login" />;
    }
    return <CatalogoMovil />;
  }

  return <HomeWeb />;
};

export default App;
