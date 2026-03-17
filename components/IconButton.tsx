import React, { useState } from 'react'
import { Pressable } from 'react-native'

type IconButtonState = 'default' | 'active' | 'disabled' | 'dark'

interface IconButtonProps {
    icon: React.ReactNode
    state?: IconButtonState
    onPress?: () => void
    size?: number
}

const IconButton: React.FC<IconButtonProps> = ({
    icon,
    state = 'default',
    onPress,
    size = 40,
}) => {
    const [pressed, setPressed] = useState(false)

    const isDisabled = state === 'disabled'
    const isActive = state === 'active'
    const isDark = state === 'dark'

    const containerStyle = {
        width: size,
        height: size,
        borderRadius: size / 2,
        // Border
        borderWidth: isActive || isDark ? 2 : 0,
        borderColor: isActive ? '#FF9309' : isDark ? '#282828' : 'transparent',
        // Background
        backgroundColor: isDisabled ? '#C2C2C2' : isActive || isDark ? 'transparent' : pressed ? '#111111' : '#282828',
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        opacity: pressed && !isDisabled ? 0.85 : 1,
    }

    return (
        <Pressable
            onPress={onPress}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            disabled={isDisabled}
            style={containerStyle}
        >
            {icon}
        </Pressable>
    )
}

export default IconButton
