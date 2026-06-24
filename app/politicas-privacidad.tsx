import React from 'react';
import { usePlatform } from '@/hooks/usePlatform';
import PoliticasPrivacidadWeb from '@/src/views/AppWeb/Politicas_Privacidad';
// Importa la vista móvil si la tienes, por ahora usamos la web en ambos o dejamos espacio
import { Text, View } from 'react-native';

const PoliticasRoute = () => {
    const platform = usePlatform();

    if (platform === 'movil') {
        // Si más adelante hay versión móvil específica, se importa aquí. 
        // Por ahora, la versión web es responsiva.
        return <PoliticasPrivacidadWeb />;
    }

    return <PoliticasPrivacidadWeb />;
};

export default PoliticasRoute;
