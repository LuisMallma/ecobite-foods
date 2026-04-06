import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Platform, TextInput, View, Text, Pressable, StyleSheet } from "react-native";
import { auth } from "../../firebaseConfig.js"; // <--- Ajustado
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    // 1. Validación rápida para no enviar datos vacíos
    if (!email || !password) {
      const msg = "Por favor, completa ambos campos.";
      Platform.OS === "web" ? alert(msg) : Alert.alert("Aviso", msg);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (Platform.OS === "web") {
        alert("Login correcto ✅");
        // Una vez que inicia sesión, lo mandamos a 'account' para que vea sus datos
        router.replace('/account'); 
      } else {
        Alert.alert("Éxito", "Login correcto ✅", [
          { 
            text: "OK", 
            onPress: () => router.replace('/account') // <--- Lo mandamos a su cuenta
          }
        ]);
      }
    } catch (error: any) {
      let mensajeAmigable = "Ocurrió un error al iniciar sesión.";

      if (error.code === 'auth/invalid-email') {
        mensajeAmigable = "El formato del correo electrónico no es válido.";
      } else if (
        error.code === 'auth/user-not-found' || 
        error.code === 'auth/wrong-password' || 
        error.code === 'auth/invalid-credential'
      ) {
        mensajeAmigable = "Usuario o contraseña errónea.";
      }

      Platform.OS === "web" 
        ? alert(mensajeAmigable) 
        : Alert.alert("Error de Acceso", mensajeAmigable);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Iniciar Sesión</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Ingresa tus credenciales</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            placeholder="ejemplo@correo.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            style={styles.input}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>

        <Pressable style={styles.btnIngresar} onPress={handleLogin}>
          <Text style={styles.btnText}>Ingresar</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/register')} style={{ marginTop: 20 }}>
          <Text style={styles.registerLink}>
            ¿No tienes una cuenta? <Text style={{ fontWeight: 'bold' }}>Regístrate aquí</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFEBE9' },
  header: { backgroundColor: '#2E7D32', paddingTop: 50, paddingBottom: 20, alignItems: 'center' },
  headerText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  formContainer: { flex: 1, padding: 20, marginTop: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#1B5E20' },
  subtitle: { textAlign: 'center', color: '#555', marginBottom: 20 },
  card: { backgroundColor: '#A8AAA9', padding: 20, borderRadius: 10, marginBottom: 20 },
  label: { fontWeight: 'bold', marginBottom: 5, color: '#333' },
  input: { backgroundColor: 'white', padding: 12, borderRadius: 5, marginBottom: 15 },
  btnIngresar: { backgroundColor: '#388E3C', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  registerLink: { textAlign: 'center', color: '#333' }
});