import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../cartContext';
import { ref, push } from 'firebase/database';
import { database, auth } from '../../firebaseConfig';

export default function CartScreen() {
  const router = useRouter();
  // Traemos los datos y funciones de nuestro Contexto global
  const { cart, removeFromCart, clearCart } = useCart();

  // Calculamos el total de la compra
  const total = cart.reduce((suma: number, item: any) => suma + (item.precio * item.cantidad), 0);

  // FUNCIÓN PARA REGISTRAR EL PEDIDO EN FIREBASE (RF05)
  const registrarPedido = async () => {
    try {
      // Referencia a un nuevo nodo "pedidos" en Firebase
      const pedidoRef = ref(database, 'pedidos');
      
      // Enviamos el pedido a la nube
      await push(pedidoRef, {
        usuario: auth.currentUser?.email || 'Usuario Invitado',
        productos: cart.map((p: any) => ({ nombre: p.nombre, cantidad: p.cantidad, precio: p.precio })),
        total: total,
        fecha: new Date().toISOString()
      });

      // Mostramos éxito, limpiamos el carrito y regresamos al inicio
      Alert.alert("¡Pedido Exitoso! 🎉", "Tu pedido ha sido registrado correctamente.", [
        { 
          text: "Genial", 
          onPress: () => {
            clearCart();
            router.push('/');
          } 
        }
      ]);
    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema al registrar el pedido.");
    }
  };

  // DISEÑO SI EL CARRITO ESTÁ VACÍO
  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Carrito</Text>
        </View>
        <View style={styles.emptyContent}>
          <Ionicons name="cart-outline" size={80} color="#ccc" style={{ marginBottom: 20 }} />
          <Text style={styles.emptyTitle}>Carrito vacío</Text>
          <Text style={styles.emptySubtitle}>Agrega productos para comenzar</Text>
          <Pressable style={styles.btnVerProductos} onPress={() => router.push('/products')}>
            <Text style={styles.btnText}>Ver Productos</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // DISEÑO SI EL CARRITO TIENE PRODUCTOS
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tu Pedido</Text>
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.imagenLocal} style={styles.itemImage} />
            
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>{item.nombre}</Text>
              <Text style={styles.itemPrice}>S/ {item.precio.toFixed(2)} x {item.cantidad}</Text>
              <Text style={styles.itemSubtotal}>Subtotal: S/ {(item.precio * item.cantidad).toFixed(2)}</Text>
            </View>

            <Pressable onPress={() => removeFromCart(item.id)} style={styles.btnDelete}>
              <Ionicons name="trash-outline" size={24} color="#D32F2F" />
            </Pressable>
          </View>
        )}
      />

      {/* BARRA INFERIOR DE TOTAL Y BOTÓN REGISTRAR */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>S/ {total.toFixed(2)}</Text>
        </View>
        
        <Pressable style={styles.btnRegistrar} onPress={registrarPedido}>
          <Text style={styles.btnRegistrarText}>Registrar Pedido</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { backgroundColor: '#388E3C', paddingTop: 50, paddingBottom: 20, alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  
  // Estilos vacíos
  emptyContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 50 },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 5 },
  emptySubtitle: { fontSize: 14, color: '#555', marginBottom: 30 },
  btnVerProductos: { backgroundColor: '#407F43', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8, elevation: 2 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 15 },

  // Estilos con productos
  listContainer: { padding: 15 },
  cartItem: { flexDirection: 'row', backgroundColor: 'white', padding: 10, borderRadius: 10, marginBottom: 15, elevation: 2, alignItems: 'center' },
  itemImage: { width: 60, height: 60, borderRadius: 8, resizeMode: 'cover' },
  itemInfo: { flex: 1, marginLeft: 15 },
  itemName: { fontWeight: 'bold', fontSize: 14, color: '#333', marginBottom: 4 },
  itemPrice: { fontSize: 13, color: '#666' },
  itemSubtotal: { fontSize: 13, fontWeight: 'bold', color: '#2E7D32', marginTop: 4 },
  btnDelete: { padding: 10 },

  // Footer
  footer: { backgroundColor: 'white', padding: 20, borderTopWidth: 1, borderColor: '#eee', elevation: 10 },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#555' },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: '#1B5E20' },
  btnRegistrar: { backgroundColor: '#D68910', paddingVertical: 15, borderRadius: 8, alignItems: 'center' },
  btnRegistrarText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});