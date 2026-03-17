import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; 

import { CartProvider } from '../../cartContext';

export default function TabLayout() {
  return (

    <CartProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#2E7D32', 
          tabBarInactiveTintColor: '#888',
          headerShown: false, 
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
        
      
        <Tabs.Screen
          name="register"
          options={{
            href: null, 
          }}
        />

        <Tabs.Screen
          name="chat"
          options={{
            title: 'Chat',
            tabBarIcon: ({ color }) => <Ionicons name="chatbubbles-outline" size={24} color={color} />,
          }}
        />
      </Tabs>
    </CartProvider>
  );
}