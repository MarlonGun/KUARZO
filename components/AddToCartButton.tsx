import React, { useState } from 'react'
import { Pressable, Text } from 'react-native'

type Variant = 'primary' | 'secondary' | 'tertiary'

interface AddToCartButtonProps {
    label?: string
    variant?: Variant
    onPress?: () => void
    disabled?: boolean
}

const variantStyles: Record<
    Variant,
    {
        base: string
        pressed: string
        textBase: string
        textPressed: string
    }
> = {
    primary: {
        base: 'bg-primary',
        pressed: 'bg-primary-500',
        textBase: 'text-tertiary font-roboto-bold',
        textPressed: 'text-tertiary font-roboto-bold',
    },
    secondary: {
        base: 'bg-secondary',
        pressed: 'bg-secondary-500',
        textBase: 'text-white font-roboto-bold',
        textPressed: 'text-white font-roboto-bold',
    },
    tertiary: {
        base: 'bg-transparent border-2 border-secondary',
        pressed: 'bg-secondary-500 border-2 border-secondary-500',
        textBase: 'text-secondary font-roboto-bold',
        textPressed: 'text-white font-roboto-bold',
    },
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
    label = 'Agregar al carrito',
    variant = 'primary',
    onPress,
    disabled = false,
}) => {
    const styles = variantStyles[variant]

    const [pressed, setPressed] = useState(false)

    return (
        <Pressable
            onPress={onPress}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            disabled={disabled}
            className={`rounded-lg px-6 py-3 items-center justify-center active:opacity-90 ${pressed ? styles.pressed : styles.base
                }`}
        >
            <Text
                className={`text-base ${pressed ? styles.textPressed : styles.textBase
                    }`}
            >
                {label}
            </Text>
        </Pressable>
    )
}

export default AddToCartButton
