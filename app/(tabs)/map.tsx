import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');

// ⚠️ REEMPLAZA ESTO CON TU CLAVE LARGA DE GOOGLE CLOUD
const GOOGLE_MAPS_APIKEY = 'AIzaSyAZuaw3mwmGwOdsoUh9RxbxvQm2QuUACo0';

export default function MapScreen() {
  // PUNTO A: La tienda Ecobite (Fijo)
  const tiendaEcobite = { latitude: -12.046374, longitude: -77.042793 };

  // PUNTO B: La casa del cliente (Móvil) - Lo ponemos cerquita para que se vea la ruta
  const [clienteCoords, setClienteCoords] = useState({
    latitude: -12.050000,
    longitude: -77.045000,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ruta de Delivery Ecobite</Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: tiendaEcobite.latitude,
          longitude: tiendaEcobite.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {/* 📍 Marcador de la Tienda Ecobite (Origen) */}
        <Marker 
          coordinate={tiendaEcobite} 
          title="Tienda Ecobite" 
          description="De aquí salen tus snacks"
          pinColor="green" // Le ponemos un color verde a la tienda
        />

        {/* 📍 Marcador del Cliente (Destino) */}
        <Marker
          coordinate={clienteCoords}
          title="Tu Ubicación"
          description="Arrastra para indicar tu casa"
          draggable
          onDragEnd={(e) => {
            console.log("Nueva ubicación del cliente:", e.nativeEvent.coordinate);
            setClienteCoords(e.nativeEvent.coordinate);
          }}
        />

        {/* 🛣️ Trazo de la Ruta (La Magia) */}
        <MapViewDirections
          origin={tiendaEcobite}
          destination={clienteCoords}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="#D68910" // Color naranja/dorado estilo Ecobite
          optimizeWaypoints={true}
          onReady={result => {
            // Esto imprime en tu terminal cuánto falta para llegar
            console.log(`Distancia de delivery: ${result.distance} km`);
            console.log(`Tiempo estimado: ${result.duration} min.`);
          }}
          onError={(errorMessage) => {
            console.error("Error en la ruta: ", errorMessage);
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { backgroundColor: '#388E3C', paddingTop: 50, paddingBottom: 15, alignItems: 'center', elevation: 5 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  map: { width: width, height: height },
});