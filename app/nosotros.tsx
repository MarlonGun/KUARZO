import React from 'react';
import { usePlatform } from '@/hooks/usePlatform';
import { View, Text } from 'react-native';
import NosotrosWeb from '@/src/views/AppWeb/NosotrosWeb';

export default function NosotrosRoute() {
    const platform = usePlatform();

    if (platform === 'movil') {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 }}>
                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: '#111827', textAlign: 'center' }}>
                    Esta sección está disponible únicamente a través del navegador web.
                </Text>
            </View>
        );
    }

    return <NosotrosWeb />;
}
