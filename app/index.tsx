import React from 'react';
import { ScrollView, View } from 'react-native';
import { CardProduct } from '../components/CardProduct';
import Carrusel from '../components/Carrusel';
import CustomButton from '../components/CustomButton';
import Header from '../components/header';

const App = () => {

  const featuredProducts = [
    {
      id: '1',
      nombre: 'Pulsera volcánica',
      descripcion: 'Pulsera volcánica: diseño premium con piedras naturales.',
      precio: 45000,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: '2',
      nombre: 'Pulsera volcánica',
      descripcion: 'Pulsera volcánica: diseño premium con piedras naturales.',
      precio: 45000,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: '3',
     nombre: 'Pulsera volcánica',
      descripcion: 'Pulsera volcánica: diseño premium con piedras naturales.',
      precio: 45000,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: '4',
      nombre: 'Pulsera volcánica',
      descripcion: 'Pulsera volcánica: diseño premium con piedras naturales.',
      precio: 45000,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    },
    {
      id: '5',
      nombre: 'Pulsera volcánica',
      descripcion: 'Pulsera volcánica: diseño premium con piedras naturales.',
      precio: 45000,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: '6',
      nombre: 'Pulsera volcánica',
      descripcion: 'Pulsera volcánica: diseño premium con piedras naturales.',
      precio: 45000,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: '7',
    nombre: 'Pulsera volcánica',
      descripcion: 'Pulsera volcánica: diseño premium con piedras naturales.',
      precio: 45000,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
     {
      id: '8',
     nombre: 'Pulsera volcánica',
      descripcion: 'Pulsera volcánica: diseño premium con piedras naturales.',
      precio: 45000,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: '9',
     nombre: 'Pulsera volcánica',
      descripcion: 'Pulsera volcánica: diseño premium con piedras naturales.',
      precio: 45000,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: '10',
      nombre: 'Pulsera volcánica',
      descripcion: 'Pulsera volcánica: diseño premium con piedras naturales.',
      precio: 45000,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: '11',
      nombre: 'Pulsera volcánica',
      descripcion: 'Pulsera volcánica: diseño premium con piedras naturales.',
      precio: 45000,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: '12',
      nombre: 'Pulsera volcánica',
      descripcion: 'Pulsera volcánica: diseño premium con piedras naturales.',
      precio: 45000,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: '13',
      nombre: 'Pulsera volcánica',
      descripcion: 'Pulsera volcánica: diseño premium con piedras naturales.',
      precio: 45000,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: '14',
      nombre: 'Pulsera volcánica',
      descripcion: 'Pulsera volcánica: diseño premium con piedras naturales.',
      precio: 45000,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <ScrollView className='flex-1 bg-white'>
      <Header />
      <View className="items-center py-6">
        <CustomButton children="Botonzitoo" color="primary" className='w-1/2' />
      </View>
      <View className="items-center mt-8 mb-8">
        <CardProduct producto={featuredProducts[0]} />
      </View>
      <View className="mt-8">
        <Carrusel itemsPerPage={4} title="RECOMENDACIONES" products={featuredProducts} />
      </View>
    </ScrollView>
  )
}

export default App
