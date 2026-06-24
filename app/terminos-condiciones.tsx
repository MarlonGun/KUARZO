import React from 'react';
import { usePlatform } from '@/hooks/usePlatform';
import TerminosCondicionesWeb from '@/src/views/AppWeb/Terminos_Condiciones';

const TerminosRoute = () => {
    const platform = usePlatform();

    if (platform === 'movil') {
        // La vista es responsiva, por lo que podemos usarla también en móvil por ahora
        return <TerminosCondicionesWeb />;
    }

    return <TerminosCondicionesWeb />;
};

export default TerminosRoute;
