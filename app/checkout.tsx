import React from "react";
import { usePlatform } from "@/hooks/usePlatform";
import CheckoutWeb from "@/src/views/AppWeb/CheckoutWeb";
import CheckoutMovil from "@/src/views/AppMovil/CheckoutMovil";

const CheckoutRoute = () => {
  const platform = usePlatform();

  if (platform === 'movil') {
    return <CheckoutMovil />;
  }

  return <CheckoutWeb />;
};

export default CheckoutRoute;
