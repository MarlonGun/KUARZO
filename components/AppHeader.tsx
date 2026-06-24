import React from 'react';
import { View } from 'react-native';
import BarraBusquedaMovil from './BarraBusquedaMovil';
import Header from './header';

interface AppHeaderProps {
    platform: 'web' | 'movil';
}

/**
 * Header unificado con variantes por plataforma.
 * - web   → Header completo (logo + buscador + acciones de cuenta + carrito)
 * - movil → BarraBusquedaMovil (barra de búsqueda compacta con fondo amarillo)
 */
const AppHeader = ({ platform }: AppHeaderProps) => {
    if (platform === 'movil') {
        return (
            <View style={{ backgroundColor: '#FFFFFF', zIndex: 999 }}>
                <BarraBusquedaMovil />
            </View>
        );
    }

    return <Header />;
};

export default AppHeader;