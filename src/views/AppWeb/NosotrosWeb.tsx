import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NosotrosWeb: React.FC = () => {
  const { width: windowWidth } = useWindowDimensions();
  const isSmallScreen = windowWidth < 900;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
        <AppHeader platform="web" />

        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <View style={styles.heroOverlay}>
            <Text style={styles.heroSubtitle}>CONOCE A KUARZO</Text>
            <Text style={styles.heroTitle}>Transformando la experiencia de compra</Text>
            <Text style={styles.heroText}>
              En KUARZO, creemos en el poder de conectar a las personas con los productos que aman. 
              Nuestra pasión es ofrecerte no solo artículos de la más alta calidad, sino una experiencia 
              excepcional en cada paso de tu compra.
            </Text>
          </View>
        </View>

        {/* Main Content Container */}
        <View style={styles.mainContainer}>
          <View
            style={{
              flexDirection: isSmallScreen ? "column" : "row",
              width: "100%",
              maxWidth: 1200,
              alignSelf: "center",
              gap: 40,
              marginVertical: 60,
            }}
          >
            {/* Card: Quiénes Somos */}
            <View style={[styles.card, isSmallScreen && { width: "100%" }]}>
              <View style={styles.iconWrapper}>
                <MaterialIcons name="group" size={32} color="#F59E0B" />
              </View>
              <Text style={styles.cardTitle}>¿Quiénes Somos?</Text>
              <Text style={styles.cardDescription}>
                Somos un equipo multidisciplinario apasionado por el comercio digital y la satisfacción del cliente. 
                Nacimos con la vocación de simplificar la manera en que adquieres tus productos favoritos, fusionando 
                tecnología avanzada con un servicio cálido y personalizado. Cuidamos cada detalle para que tu 
                experiencia sea siempre segura, rápida y transparente.
              </Text>
            </View>

            {/* Card: Misión */}
            <View style={[styles.card, isSmallScreen && { width: "100%" }]}>
              <View style={styles.iconWrapper}>
                <MaterialIcons name="track-changes" size={32} color="#10B981" />
              </View>
              <Text style={styles.cardTitle}>Nuestra Misión</Text>
              <Text style={styles.cardDescription}>
                Brindar a nuestros clientes una plataforma de comercio electrónico rápida, segura y confiable, 
                ofreciendo productos excepcionales y destacando siempre por nuestro impecable servicio al cliente. 
                Trabajamos día a día para superar tus expectativas y entregar valor real en cada compra que realizas 
                con nosotros.
              </Text>
            </View>

            {/* Card: Visión */}
            <View style={[styles.card, isSmallScreen && { width: "100%" }]}>
              <View style={styles.iconWrapper}>
                <MaterialIcons name="visibility" size={32} color="#3B82F6" />
              </View>
              <Text style={styles.cardTitle}>Nuestra Visión</Text>
              <Text style={styles.cardDescription}>
                Ser la plataforma líder y referente de e-commerce preferida por nuestra comunidad, reconocida a 
                nivel nacional por nuestra innovación constante, la excelente curaduría de nuestro catálogo y 
                nuestro firme compromiso con la excelencia y el desarrollo tecnológico responsable.
              </Text>
            </View>
          </View>
          
          {/* Values Section */}
          <View style={styles.valuesSection}>
            <Text style={styles.valuesTitle}>Nuestros Pilares</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20, marginTop: 30 }}>
                {['Calidad', 'Transparencia', 'Innovación', 'Compromiso'].map((value, index) => (
                    <View key={index} style={styles.valueChip}>
                        <MaterialIcons name="check-circle" size={20} color="#FFD700" />
                        <Text style={styles.valueText}>{value}</Text>
                    </View>
                ))}
            </View>
          </View>
        </View>

        <AppFooter platform="web" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NosotrosWeb;

const styles = StyleSheet.create({
  heroContainer: {
    width: "100%",
    backgroundColor: "#111827",
    paddingVertical: 80,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  heroOverlay: {
    maxWidth: 800,
    alignItems: "center",
  },
  heroSubtitle: {
    color: "#FFD700",
    fontFamily: "Roboto-Bold",
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 16,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Bold",
    fontSize: 40,
    textAlign: "center",
    lineHeight: 48,
    marginBottom: 24,
  },
  heroText: {
    color: "#D1D5DB",
    fontFamily: "OpenSans-Regular",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 28,
  },
  mainContainer: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
    borderTopWidth: 4,
    borderTopColor: "#111827",
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  cardTitle: {
    color: "#111827",
    fontFamily: "Roboto-Bold",
    fontSize: 22,
    marginBottom: 16,
  },
  cardDescription: {
    color: "#4B5563",
    fontFamily: "OpenSans-Regular",
    fontSize: 15,
    lineHeight: 26,
  },
  valuesSection: {
    width: "100%",
    maxWidth: 1000,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  valuesTitle: {
    color: "#111827",
    fontFamily: "Roboto-Bold",
    fontSize: 28,
  },
  valueChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#1F2937",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 8,
  },
  valueText: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  }
});
