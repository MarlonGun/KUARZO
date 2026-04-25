import React from "react";
import { usePlatform } from "@/hooks/usePlatform";
import HomeWeb from "@/src/views/AppWeb/HomeWeb";
import HomeMovil from "@/src/views/AppMovil/HomeMovil";

const App = () => {
  const platform = usePlatform();

  if (platform === 'movil') {
    return <HomeMovil />;
  }

  return <HomeWeb />;
};

export default App;
