import React from "react";
import { usePlatform } from "@/hooks/usePlatform";
import CartWeb from "@/src/views/AppWeb/CartWeb";
import CartMovil from "@/src/views/AppMovil/CartMovil";

const CartRoute = () => {
  const platform = usePlatform();

  if (platform === 'movil') {
    return <CartMovil />;
  }

  return <CartWeb />;
};

export default CartRoute;
