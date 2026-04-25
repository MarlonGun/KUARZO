import React from "react";
import { usePlatform } from "@/hooks/usePlatform";
import CatalogoWeb from "@/src/views/AppWeb/CatalogoWeb";
import CatalogoMovil from "@/src/views/AppMovil/CatalogoMovil";

const CatalogoRoute = () => {
  const platform = usePlatform();

  if (platform === 'movil') {
    return <CatalogoMovil />;
  }

  return <CatalogoWeb />;
};

export default CatalogoRoute;
