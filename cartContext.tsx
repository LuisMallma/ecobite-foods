import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
export const CartContext = createContext<any>(null);

// Proveedor del contexto que envolverá nuestra app
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (producto: any, imagenLocal: any) => {
    setCart((prevCart) => {
      // Verificamos si el producto ya está en el carrito
      const itemExists = prevCart.find((item) => item.id === producto.id);
      if (itemExists) {
        // Si existe, le sumamos 1 a la cantidad
        return prevCart.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      // Si no existe, lo agregamos con cantidad 1
      return [...prevCart, { ...producto, cantidad: 1, imagenLocal }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el carrito fácilmente
export const useCart = () => useContext(CartContext);