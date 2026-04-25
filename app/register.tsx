import React from "react";
import { usePlatform } from "@/hooks/usePlatform";
import RegisterWeb from "@/src/views/AppWeb/RegisterWeb";
import RegisterMovil from "@/src/views/AppMovil/RegisterMovil";

const RegisterRoute = () => {
  const platform = usePlatform();

  if (platform === 'movil') {
    return <RegisterMovil />;
  }

  return <RegisterWeb />;
};

export default RegisterRoute;