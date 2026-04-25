import React from "react";
import { usePlatform } from "@/hooks/usePlatform";
import DetalleProdWeb from "@/src/views/AppWeb/DetalleProdWeb";
import DetalleProdMovil from "@/src/views/AppMovil/DetalleProdMovil";

const DetalleProdRoute = () => {
  const platform = usePlatform();

  if (platform === 'movil') {
    return <DetalleProdMovil />;
  }

  return <DetalleProdWeb />;
};

export default DetalleProdRoute;
