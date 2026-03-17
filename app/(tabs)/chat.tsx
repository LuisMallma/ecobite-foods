import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebaseConfig"; // Ruta corregida para (tabs)

export default function ChatScreen() {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState<any[]>([]);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Consulta a la colección 'mensajes' ordenada por fecha
    const q = query(
      collection(db, "mensajes"),
      orderBy("fecha", "asc")
    );

    // Escucha en tiempo real (onSnapshot)
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista:any = [];
      snapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });

      setMensajes(lista);

      // Hace scroll automático hacia abajo cuando llega un nuevo mensaje
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 200);
    });

    return unsubscribe;
  }, []);

  const enviarMensaje = async () => {
    if (mensaje.trim() === "") return;

    await addDoc(collection(db, "mensajes"), {
      texto: mensaje,
      usuario: auth.currentUser?.email || "Usuario Invitado",
      fecha: new Date()
    });

    setMensaje("");
  };

  const renderItem = ({ item }: any) => {
    const esMio = item.usuario === auth.currentUser?.email;

    return (
      <View style={[styles.mensajeContainer, esMio ? styles.mio : styles.otro]}>
        <Text style={styles.usuario}>{item.usuario}</Text>
        <Text style={styles.textoMensaje}>{item.texto}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Comunidad Ecobite</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={mensajes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Escribe un mensaje..."
          value={mensaje}
          onChangeText={setMensaje}
          style={styles.input}
        />
        <TouchableOpacity style={styles.boton} onPress={enviarMensaje}>
          <Text style={{color:"#fff", fontWeight: "bold"}}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF9F6" },
  header: { backgroundColor: '#388E3C', paddingTop: 50, paddingBottom: 15, alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  mensajeContainer: { padding: 12, marginVertical: 5, borderRadius: 15, maxWidth: "80%", elevation: 1 },
  mio: { backgroundColor: "#D4EFDF", alignSelf: "flex-end", borderBottomRightRadius: 0 },
  otro: { backgroundColor: "#ffffff", alignSelf: "flex-start", borderBottomLeftRadius: 0 },
  usuario: { fontSize: 10, color: "#388E3C", fontWeight: "bold", marginBottom: 3 },
  textoMensaje: { color: "#333", fontSize: 14 },
  inputContainer: { flexDirection: "row", padding: 10, backgroundColor: "white", elevation: 5 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 25, paddingHorizontal: 15, backgroundColor: "#f9f9f9" },
  boton: { backgroundColor: "#D68910", padding: 12, paddingHorizontal: 20, marginLeft: 10, borderRadius: 25, justifyContent: "center" }
});