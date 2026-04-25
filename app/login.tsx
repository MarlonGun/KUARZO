import React from "react";
import { usePlatform } from "@/hooks/usePlatform";
import LoginWeb from "@/src/views/AppWeb/LoginWeb";
import LoginMovil from "@/src/views/AppMovil/LoginMovil";

const LoginRoute = () => {
  const platform = usePlatform();

  if (platform === 'movil') {
    return <LoginMovil />;
  }

  return <LoginWeb />;
};

export default LoginRoute;