import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import Header from '../components/header';

const App = () => {
  return (
    <View className='flex-1 bg-white'>
      <Text>App</Text>
      <Header />
      <CustomButton children="Botonzitoo" color="primary" className='w-1/2' />
    </View>
  )
}

export default App
