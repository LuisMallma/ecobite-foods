import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Usaremos Ionicons para los iconos

// 1. IMPORTAMOS EL PROVIDER DEL CARRITO
import { CartProvider } from '../../cartContext';

export default function TabLayout() {
  return (
    // 2. ENVOLVEMOS TODA LA NAVEGACIÓN CON EL PROVIDER
    <CartProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#2E7D32', // Verde de Ecobite
          tabBarInactiveTintColor: '#888',
          headerShown: false, // Oculta la cabecera por defecto
          tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5 },
        }}>
        
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
            tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: 'Producto',
            tabBarIcon: ({ color }) => <Ionicons name="cube-outline" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Carrito',
            tabBarIcon: ({ color }) => <Ionicons name="cart-outline" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Cuenta',
            tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="info"
          options={{
            title: 'Info',
            tabBarIcon: ({ color }) => <Ionicons name="information-circle-outline" size={24} color={color} />,
          }}
        />
        
        {/* PANTALLA DE REGISTRO OCULTA DEL MENÚ */}
        <Tabs.Screen
          name="register"
          options={{
            href: null, // Esto evita que aparezca el botón en la barra inferior
          }}
        />
      </Tabs>
    </CartProvider>
  );
}