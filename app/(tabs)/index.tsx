import { View, Text, StyleSheet, ScrollView, Pressable, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.topBar}>
        <View style={styles.headerTop}>
          <View style={{ width: 28 }} /> 
          <Text style={styles.headerLogo}>ECOBITE FOODS</Text>
          <Ionicons name="person-circle" size={28} color="#F4D03F" />
        </View>
      </View>

  
      <ImageBackground 
        source={require('../../assets/images/descarga.jpg')} 
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>ECOBITE FOODS</Text>
            <Text style={styles.heroSubtitle}>Transformando superfoods andinos en snacks saludables</Text>
            
            <Pressable style={styles.btnPrimary} onPress={() => router.push('/products')}>
              <Text style={styles.btnPrimaryText}>Ver Productos →</Text>
            </Pressable>
            
            <Pressable style={styles.btnSecondary} onPress={() => router.push('/info')}>
              <Text style={styles.btnSecondaryText}>Conoce Más</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.benefitsSection}>
        <Text style={styles.benefitsTitle}>¿Por qué elegir ECOBITE?</Text>

        <View style={styles.benefitItem}>
          <Ionicons name="leaf-outline" size={32} color="#4CAF50" />
          <View style={styles.benefitTextContainer}>
            <Text style={styles.benefitItemTitle}>100% Natural</Text>
            <Text style={styles.benefitItemDesc}>Ingredientes orgánicos sin aditivos artificiales</Text>
          </View>
        </View>

        <View style={styles.benefitItem}>
          <Ionicons name="ribbon-outline" size={32} color="#D2691E" />
          <View style={styles.benefitTextContainer}>
            <Text style={styles.benefitItemTitle}>Superfoods Andinos</Text>
            <Text style={styles.benefitItemDesc}>Quinua, kiwicha y granos ancestrales ricos en nutrientes</Text>
          </View>
        </View>

        <View style={styles.benefitItem}>
          <Ionicons name="heart-outline" size={32} color="#D32F2F" />
          <View style={styles.benefitTextContainer}>
            <Text style={styles.benefitItemTitle}>Saludables y Deliciosos</Text>
            <Text style={styles.benefitItemDesc}>Ideales para cuidar tu alimentación y la de tu familia</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6', 
  },
 
  topBar: {
    backgroundColor: '#388E3C', 
    paddingTop: 50,
    paddingBottom: 15,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerLogo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  heroBackground: {
    width: '100%',
  },
 
  overlay: {
    backgroundColor: 'rgba(27, 94, 32, 0.7)', 
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: 'center',
  },
  heroContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F4D03F', 
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  btnPrimary: {
    backgroundColor: '#D68910', 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    marginBottom: 15,
  },
  btnPrimaryText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btnSecondary: {
    backgroundColor: '#388E3C', 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
  },
  btnSecondaryText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  benefitsSection: {
    padding: 20,
    paddingTop: 30,
  },
  benefitsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 30,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  benefitTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  benefitItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 2,
  },
  benefitItemDesc: {
    color: '#555',
    fontSize: 13,
  }
});