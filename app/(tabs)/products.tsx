import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable, ActivityIndicator, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebaseConfig';
import { useRouter } from 'expo-router';
import { useCart } from '../../cartContext';

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string; 
}

const imagenesLocales: Record<string, any> = {
  'prod1': require('../../assets/images/prod1.png'), 
  'prod2': require('../../assets/images/prod2.png'),
  'prod3': require('../../assets/images/prod3.png'),
  'prod4': require('../../assets/images/prod4.png'),
  'prod5': require('../../assets/images/prod5.png'),
  'prod6': require('../../assets/images/prod6.png'),
  'default': require('../../assets/images/icon.png') 
};

export default function ProductsScreen() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  

  const [modalVisible, setModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  const router = useRouter();
  const { addToCart } = useCart();
  const categorias = ['Todos', 'Barras', 'Chips', 'Snack'];

  useEffect(() => {
    const productosRef = ref(database, 'productos');
    
    const unsuscribe = onValue(productosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const listaProductos = Object.keys(data).map(key => ({
          ...data[key],
          id: key
        }));
        setProductos(listaProductos);
      } else {
        setProductos([]);
      }
      setCargando(false);
    });

    return () => unsuscribe();
  }, []);

  const productosFiltrados = categoriaActiva === 'Todos' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaActiva);

  const abrirDetalles = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setModalVisible(true);
  };

  const renderProducto = ({ item }: { item: Producto }) => {
    const imagenSource = imagenesLocales[item.id] || imagenesLocales['default'];

    return (
      <View style={styles.card}>
        <Pressable onPress={() => abrirDetalles(item)}>
          <View style={styles.imageContainer}>
            <Image source={imagenSource} style={styles.image} />
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>S/ {item.precio.toFixed(2)}</Text>
            </View>
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={2}>{item.nombre}</Text>
            <Text style={styles.description} numberOfLines={2}>{item.descripcion}</Text>
          </View>
        </Pressable>

        <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
          <Pressable 
            style={styles.btnAgregar} 
            onPress={() => {
              addToCart(item, imagenSource); 
              alert(`¡${item.nombre} agregado al carrito!`);
            }}
          >
            <Ionicons name="cart-outline" size={18} color="white" />
            <Text style={styles.btnAgregarText}>Agregar</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Productos</Text>
        <Pressable onPress={() => router.push('/cart')} style={styles.cartIcon}>
          <Ionicons name="cart-outline" size={28} color="white" />
        </Pressable>
      </View>

      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categorias}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable 
              style={[styles.filterBtn, categoriaActiva === item && styles.filterBtnActive]}
              onPress={() => setCategoriaActiva(item)}
            >
              <Text style={[styles.filterText, categoriaActiva === item && styles.filterTextActive]}>
                {item}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {cargando ? (
        <ActivityIndicator size="large" color="#388E3C" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={productosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={renderProducto}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} 
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
         
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="close-circle" size={36} color="#388E3C" />
            </Pressable>

            {productoSeleccionado && (
              <>
                <Image 
                  source={imagenesLocales[productoSeleccionado.id] || imagenesLocales['default']} 
                  style={styles.modalImage} 
                />
                
                <View style={styles.modalTag}>
                  <Text style={styles.modalTagText}>{productoSeleccionado.categoria}</Text>
                </View>

                <Text style={styles.modalTitle}>{productoSeleccionado.nombre}</Text>
                <Text style={styles.modalPrice}>S/ {productoSeleccionado.precio.toFixed(2)}</Text>
                
                <ScrollView style={styles.modalDescContainer}>
                  <Text style={styles.modalDescription}>{productoSeleccionado.descripcion}</Text>
                </ScrollView>

                <Pressable 
                  style={styles.btnAgregarModal} 
                  onPress={() => {
                    addToCart(productoSeleccionado, imagenesLocales[productoSeleccionado.id] || imagenesLocales['default']);
                    setModalVisible(false); 
                    alert(`¡${productoSeleccionado.nombre} agregado al carrito!`);
                  }}
                >
                  <Ionicons name="cart-outline" size={22} color="white" />
                  <Text style={styles.btnAgregarTextModal}>Agregar al pedido</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { 
    backgroundColor: '#388E3C', 
    paddingTop: 50, 
    paddingBottom: 20, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  cartIcon: { position: 'absolute', right: 20, bottom: 18 },
  
  filtersContainer: { paddingVertical: 12, paddingHorizontal: 10, backgroundColor: 'white' },
  filterBtn: { 
    paddingVertical: 6, 
    paddingHorizontal: 16, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#388E3C', 
    marginHorizontal: 5 
  },
  filterBtnActive: { backgroundColor: '#388E3C' },
  filterText: { color: '#388E3C', fontWeight: 'bold', fontSize: 13 },
  filterTextActive: { color: 'white' },

  listContainer: { padding: 10, paddingBottom: 80 },
  card: { 
    flex: 1, 
    backgroundColor: 'white', 
    margin: 6, 
    borderRadius: 10, 
    overflow: 'hidden', 
    elevation: 2 
  },
  imageContainer: { position: 'relative' },
  image: { width: '100%', height: 100, resizeMode: 'cover' },
  priceTag: { 
    position: 'absolute', 
    top: 8, 
    right: 8, 
    backgroundColor: '#407F43', 
    paddingVertical: 3, 
    paddingHorizontal: 6, 
    borderRadius: 6 
  },
  priceText: { color: 'white', fontWeight: 'bold', fontSize: 11 },
  infoContainer: { padding: 10, paddingBottom: 5 },
  title: { fontWeight: 'bold', fontSize: 12, color: '#333', marginBottom: 2, height: 34 },
  description: { fontSize: 10, color: '#666', marginBottom: 8, height: 28 },
  btnAgregar: { 
    backgroundColor: '#388E3C', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingVertical: 6, 
    borderRadius: 15 
  },
  btnAgregarText: { color: 'white', fontWeight: 'bold', marginLeft: 5, fontSize: 12 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FAF9F6',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: 'center',
    height: '75%', 
    elevation: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  modalTag: {
    backgroundColor: '#E6C229', // Tono dorado de Ecobite
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  modalTagText: {
    color: '#334E35', 
    fontWeight: 'bold',
    fontSize: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 15,
  },
  modalDescContainer: {
    width: '100%',
    marginBottom: 20,
  },
  modalDescription: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },
  btnAgregarModal: {
    backgroundColor: '#D68910', 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    elevation: 3,
  },
  btnAgregarTextModal: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  }
});