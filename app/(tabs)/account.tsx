import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// Importamos herramientas de Firebase que ya conoces
import { auth } from '../../firebaseConfig'; 
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default function AccountScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // Este "efecto" vigila si alguien inició sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioActual) => {
      setUser(usuarioActual); // Si hay usuario, guarda sus datos. Si no, lo deja en null.
    });
    return unsubscribe;
  }, []);

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Hasta pronto", "Has cerrado sesión correctamente.");
      router.replace('/'); // Lo regresamos al inicio
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar la sesión.");
    }
  };

  // PANTALLA 1: Si el usuario NO ha iniciado sesión (Visitante)
  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="person-circle-outline" size={100} color="#A8AAA9" />
        <Text style={styles.title}>Aún no has iniciado sesión</Text>
        <Text style={styles.subtitle}>Inicia sesión para ver tus datos de Ecobite.</Text>
        
        {/* Asegúrate de que la ruta '/login' sea donde está tu pantalla de LoginScreen */}
        <Pressable style={styles.btnIngresar} onPress={() => router.push('/login')}>
          <Text style={styles.btnText}>Ir a Iniciar Sesión</Text>
        </Pressable>
      </View>
    );
  }

  // PANTALLA 2: Si el usuario SÍ ha iniciado sesión (Cliente de Ecobite)
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Ionicons name="person-circle" size={120} color="#2E7D32" />
        <Text style={styles.welcomeText}>¡Hola, Ecobiter!</Text>
        {/* Aquí extraemos el correo directamente de la base de datos de Firebase */}
        <Text style={styles.emailText}>{user.email}</Text> 
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Mis Datos</Text>
        <Text style={styles.cardLabel}>Correo registrado:</Text>
        <Text style={styles.cardValue}>{user.email}</Text>
        <Text style={styles.cardLabel}>Estado de cuenta:</Text>
        <Text style={[styles.cardValue, {color: '#2E7D32', fontWeight: 'bold'}]}>Activo</Text>
      </View>

      <Pressable style={styles.btnLogout} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="white" style={{marginRight: 10}} />
        <Text style={styles.btnText}>Cerrar Sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6', padding: 20 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAF9F6', padding: 20 },
  profileHeader: { alignItems: 'center', marginTop: 30, marginBottom: 30 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1B5E20', marginTop: 15 },
  subtitle: { color: '#555', textAlign: 'center', marginTop: 10, marginBottom: 30 },
  welcomeText: { fontSize: 28, fontWeight: 'bold', color: '#1B5E20', marginTop: 10 },
  emailText: { fontSize: 16, color: '#555', marginTop: 5 },
  infoCard: { backgroundColor: 'white', padding: 20, borderRadius: 15, elevation: 3, marginBottom: 30 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
  cardLabel: { fontSize: 14, color: '#888', marginBottom: 5 },
  cardValue: { fontSize: 16, color: '#333', marginBottom: 15 },
  btnIngresar: { backgroundColor: '#388E3C', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center' },
  btnLogout: { backgroundColor: '#D32F2F', flexDirection: 'row', padding: 15, borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: '100%' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});