import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import IconButton from './IconButton'

type TabKey = 'home' | 'cart' | 'catalog' | 'more'

interface Tab {
    key: TabKey
    iconDefault: keyof typeof Ionicons.glyphMap
    iconActive: keyof typeof Ionicons.glyphMap
    onPress?: () => void
}

const TABS: Tab[] = [
    {
        key: 'home',
        iconDefault: 'home-outline',
        iconActive: 'home-outline',
    },
    {
        key: 'catalog',
        iconDefault: 'grid-outline',
        iconActive: 'grid-outline',
    },
    {
        key: 'cart',
        iconDefault: 'cart-outline',
        iconActive: 'cart-outline',
    },
    {
        key: 'more',
        iconDefault: 'ellipsis-horizontal-circle-outline',
        iconActive: 'ellipsis-horizontal-circle-outline',
    },
]

interface BottomNavBarProps {
    initialTab?: TabKey
    onTabChange?: (tab: TabKey) => void
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({
    initialTab = 'home',
    onTabChange,
}) => {
    const [activeTab, setActiveTab] = useState<TabKey>(initialTab)

    const handlePress = (key: TabKey) => {
        setActiveTab(key)
        onTabChange?.(key)
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.key
                    return (
                        <IconButton
                            key={tab.key}
                            state={isActive ? 'active' : 'dark'}
                            icon={
                                <Ionicons
                                    name={isActive ? tab.iconActive : tab.iconDefault}
                                    size={22}
                                    color={isActive ? '#FF9309' : '#282828'}
                                />
                            }
                            onPress={() => handlePress(tab.key)}
                        />
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 28,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#111111',
        paddingVertical: 10,
        paddingHorizontal: 16,
        width: '100%',
        // Shadow iOS
        shadowColor: '#111111',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        // Shadow Android
        elevation: 12,
    },
})

export default BottomNavBar
