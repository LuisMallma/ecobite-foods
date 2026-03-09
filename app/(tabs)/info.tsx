import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function InfoScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabecera verde superior */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nosotros</Text>
      </View>

      {/* Sección Hero (Título y subtítulo) */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>ECOBITE FOODS</Text>
        <Text style={styles.heroSubtitle}>
          Transformando superfoods andinos en snacks saludables desde el corazón del Perú
        </Text>
      </View>

      {/* Sección de Misión, Visión y Valores */}
      <View style={styles.infoSection}>
        
        {/* Misión */}
        <View style={styles.infoBlock}>
          <View style={styles.iconContainer}>
            <Ionicons name="compass-outline" size={40} color="#334E35" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.blockTitle}>Misión</Text>
            <Text style={styles.blockText}>
              Transformar superfoods andinos en snacks saludables y deliciosos, promoviendo una alimentación consciente y apoyando a los productores locales del Perú.
            </Text>
          </View>
        </View>

        {/* Visión */}
        <View style={styles.infoBlock}>
          <View style={styles.iconContainer}>
             {/* Espacio vacío para mantener la alineación del texto */}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.blockTitle}>Visión</Text>
            <Text style={styles.blockText}>
              Ser la marca líder en snacks saludables del Perú y llevar nuestros superfoods andinos a los mercados internacionales, promoviendo una vida más saludable.
            </Text>
          </View>
        </View>

        {/* Valores */}
        <View style={styles.infoBlock}>
          <View style={styles.iconContainer}>
            <Ionicons name="heart-outline" size={40} color="#D32F2F" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.blockTitle}>Valores</Text>
            <Text style={styles.blockText}>
              Calidad, sostenibilidad, innovación y compromiso social. Trabajamos con comunidades andinas respetando el medio ambiente y las tradiciones ancestrales.
            </Text>
          </View>
        </View>
      </View>

      {/* Sección de Contacto (Fondo oscuro) */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Contáctanos</Text>

        <View style={styles.contactItem}>
          <Ionicons name="mail-outline" size={24} color="white" />
          <View style={styles.contactTextContainer}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>contacto@ecobitefoods.pe</Text>
            <Text style={styles.contactValue}>ventas@ecobitefoods.pe</Text>
          </View>
        </View>

        <View style={styles.contactItem}>
          <Ionicons name="call-outline" size={24} color="white" />
          <View style={styles.contactTextContainer}>
            <Text style={styles.contactLabel}>Teléfono</Text>
            <Text style={styles.contactValue}>+51 1 234 5678</Text>
            <Text style={styles.contactValue}>+51 987 654 321</Text>
          </View>
        </View>

        <View style={styles.contactItem}>
          <Ionicons name="location-outline" size={24} color="white" />
          <View style={styles.contactTextContainer}>
            <Text style={styles.contactLabel}>Dirección</Text>
            <Text style={styles.contactValue}>Av. Los Incas 1234</Text>
            <Text style={styles.contactValue}>Lima, Perú</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#388E3C', 
    paddingTop: 50,
    paddingBottom: 15,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  heroSection: {
    backgroundColor: '#334E35', 
    padding: 30,
    paddingHorizontal: 20, // Centra mejor el contenido
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E6C229', 
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    paddingHorizontal: 10, // Evita que toque los bordes laterales
  },
  infoSection: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: 'white',
  },
  infoBlock: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  iconContainer: {
    width: 50, 
    alignItems: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 1, // Permite que el texto se adapte al espacio restante
    paddingRight: 10, // Un poco de respiro a la derecha
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C', 
    marginBottom: 5,
  },
  blockText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22, // Mejor lectura
    textAlign: 'left', // Solución al error de espaciado en Android
  },
  contactSection: {
    backgroundColor: '#334E35',
    padding: 25,
    paddingBottom: 40,
  },
  contactTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  contactItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  contactTextContainer: {
    marginLeft: 15,
    flex: 1, // Evita que textos largos (como correos) empujen la pantalla
  },
  contactLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  contactValue: {
    color: '#E0E0E0',
    fontSize: 14,
    marginBottom: 2,
  }
});