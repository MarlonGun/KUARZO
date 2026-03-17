import AddToCartButton from '@/components/AddToCartButton'
import BottomNavBar from '@/components/BottomNavBar'
import IconButton from '@/components/IconButton'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const App = () => {
  return (
    <View className='flex-1 bg-white'>

      {/* Uso de ScrollView para poder hacer scroll detrás de la barra flotante */}
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View className='mt-10 mx-5 gap-8'>

          {/* AddToCartButton */}
          <View className='gap-4'>
            <Text className='text-tertiary-500 font-roboto-bold text-lg'>AddToCartButton</Text>
            <AddToCartButton variant='primary' onPress={() => console.log('primary')} />
            <AddToCartButton variant='secondary' onPress={() => console.log('secondary')} />
            <AddToCartButton variant='tertiary' onPress={() => console.log('tertiary')} />
          </View>

          {/* IconButtons */}
          <View className='gap-6'>
            <Text className='text-tertiary-500 font-roboto-bold text-lg'>IconButtons</Text>
            
            <Text className='text-quaternary font-roboto-medium text-xs mb-[-16px]'>default  -  active  -  disabled  -  dark</Text>

            {/* Home */}
            <View className='gap-2'>
              <Text className='text-tertiary font-roboto-medium text-sm'>Home</Text>
              <View className='flex-row gap-4 items-center'>
                <IconButton state='default' icon={<Ionicons name='home-outline' size={20} color='white' />} />
                <IconButton state='active' icon={<Ionicons name='home-outline' size={20} color='#FF9309' />} />
                <IconButton state='disabled' icon={<Ionicons name='home-outline' size={20} color='white' />} />
                <IconButton state='dark' icon={<Ionicons name='home-outline' size={20} color='#111111' />} />
              </View>
            </View>

            {/* Carrito */}
            <View className='gap-2'>
              <Text className='text-tertiary font-roboto-medium text-sm'>Carrito</Text>
              <View className='flex-row gap-4 items-center'>
                <IconButton state='default' icon={<Ionicons name='cart-outline' size={20} color='white' />} />
                <IconButton state='active' icon={<Ionicons name='cart-outline' size={20} color='#FF9309' />} />
                <IconButton state='disabled' icon={<Ionicons name='cart-outline' size={20} color='white' />} />
                <IconButton state='dark' icon={<Ionicons name='cart-outline' size={20} color='#111111' />} />
              </View>
            </View>

            {/* Catálogo */}
            <View className='gap-2'>
              <Text className='text-tertiary font-roboto-medium text-sm'>Catálogo</Text>
              <View className='flex-row gap-4 items-center'>
                <IconButton state='default' icon={<Ionicons name='grid-outline' size={20} color='white' />} />
                <IconButton state='active' icon={<Ionicons name='grid-outline' size={20} color='#FF9309' />} />
                <IconButton state='disabled' icon={<Ionicons name='grid-outline' size={20} color='white' />} />
                <IconButton state='dark' icon={<Ionicons name='grid-outline' size={20} color='#111111' />} />
              </View>
            </View>

            {/* Más */}
            <View className='gap-2'>
              <Text className='text-tertiary font-roboto-medium text-sm'>Más</Text>
              <View className='flex-row gap-4 items-center'>
                <IconButton state='default' icon={<Ionicons name='ellipsis-horizontal-circle-outline' size={20} color='white' />} />
                <IconButton state='active' icon={<Ionicons name='ellipsis-horizontal-circle-outline' size={20} color='#FF9309' />} />
                <IconButton state='disabled' icon={<Ionicons name='ellipsis-horizontal-circle-outline' size={20} color='white' />} />
                <IconButton state='dark' icon={<Ionicons name='ellipsis-horizontal-circle-outline' size={20} color='#111111' />} />
              </View>
            </View>

          </View>
        </View>
      </ScrollView>

      {/* Barra de navegación flotante */}
      <BottomNavBar onTabChange={(tab) => console.log('tab:', tab)} />

    </View>
  )
}

export default App
