import { Tabs, useRouter } from 'expo-router'; // <-- Agregamos useRouter
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { Pressable } from 'react-native'; // <-- Agregamos Pressable

import { CartProvider } from '../../cartContext';

export default function TabLayout() {
  const router = useRouter();

  return (
    <CartProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#2E7D32', 
          tabBarInactiveTintColor: '#888',
          // 1. ENCENDEMOS EL HEADER GLOBAL:
          headerShown: true, 
          // 2. LE DAMOS EL ESTILO ECOBITE:
          headerStyle: { backgroundColor: '#388E3C' },
          headerTintColor: '#fff',
          headerTitle: 'ECOBITE FOODS',
          headerTitleAlign: 'left',
          // 3. PONEMOS EL ÍCONO A LA DERECHA QUE LLEVA A "CUENTA":
          headerRight: () => (
            <Pressable onPress={() => router.push('/account')} style={{ marginRight: 15 }}>
              <Ionicons name="person-circle" size={32} color="#F4D03F" />
            </Pressable>
          ),
          tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5 },
        }}>
        
        <Tabs.Screen name="index" options={{ title: 'Inicio', tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} /> }} />
        <Tabs.Screen name="products" options={{ title: 'Producto', tabBarIcon: ({ color }) => <Ionicons name="cube-outline" size={24} color={color} /> }} />
        <Tabs.Screen name="cart" options={{ title: 'Carrito', tabBarIcon: ({ color }) => <Ionicons name="cart-outline" size={24} color={color} /> }} />
        <Tabs.Screen name="account" options={{ title: 'Cuenta', tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} /> }} />
        <Tabs.Screen name="info" options={{ title: 'Info', tabBarIcon: ({ color }) => <Ionicons name="information-circle-outline" size={24} color={color} /> }} />
        <Tabs.Screen name="register" options={{ href: null }} />
        <Tabs.Screen name="login" options={{ href: null }} />
        <Tabs.Screen name="chat" options={{ title: 'Chat', tabBarIcon: ({ color }) => <Ionicons name="chatbubbles-outline" size={24} color={color} /> }} />
        <Tabs.Screen name="map" options={{ title: 'Ubicación', tabBarIcon: ({ color }) => <Ionicons name="map-outline" size={24} color={color} /> }} />
      </Tabs>
    </CartProvider>
  );
}