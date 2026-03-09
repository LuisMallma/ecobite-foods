import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Alert, Platform, TextInput, View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { auth } from "../../firebaseConfig";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: nombre });
      Alert.alert("Éxito", "Cuenta creada correctamente");
      router.back(); // Regresa al Login
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Crear Cuenta</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        <Text style={styles.title}>Regístrate</Text>
        <Text style={styles.subtitle}>Crea tu cuenta para comenzar</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Nombre Completo</Text>
          <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />

          <Text style={styles.label}>Confirma Contraseña</Text>
          <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
        </View>

        <Pressable style={styles.btnRegistrar} onPress={handleRegister}>
          <Text style={styles.btnText}>Registrarse</Text>
        </Pressable>

        <Pressable onPress={() => router.back()} style={{ marginTop: 20, marginBottom: 40 }}>
          <Text style={styles.loginLink}>
            ¿Ya tienes una cuenta? <Text style={{ fontWeight: 'bold' }}>Inicia sesión aquí</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFEBE9' },
  header: { backgroundColor: '#2E7D32', paddingTop: 50, paddingBottom: 20, alignItems: 'center' },
  headerText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  formContainer: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#1B5E20' },
  subtitle: { textAlign: 'center', color: '#555', marginBottom: 20 },
  card: { backgroundColor: '#A8AAA9', padding: 20, borderRadius: 10, marginBottom: 20 },
  label: { fontWeight: 'bold', marginBottom: 5, color: '#333' },
  input: { backgroundColor: 'white', padding: 12, borderRadius: 5, marginBottom: 15 },
  btnRegistrar: { backgroundColor: '#388E3C', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  loginLink: { textAlign: 'center', color: '#333' }
});