import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import CustomButton from "@/components/CustomButton";
import api from "@/src/services/api";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ContactoWeb: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { width: windowWidth } = useWindowDimensions();
  const isSmallScreen = windowWidth < 900;

  const handleSend = async () => {
    if (!nombre || !apellido || !correo || !telefono) {
      alert("Por favor, completa todos los campos del formulario.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/contacto', { nombre, apellido, correo, telefono });
      if (response.status === 201 || response.status === 200) {
        setIsSuccess(true);
        setNombre("");
        setApellido("");
        setCorreo("");
        setTelefono("");
      } else {
        alert("Hubo un problema enviando tu mensaje. Intenta de nuevo.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión. Asegúrate de estar conectado a internet.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <AppHeader platform="web" />

        {/* CONTAINER */}
        <View style={styles.mainContainer}>
          <View
            style={{
              flexDirection: isSmallScreen ? "column" : "row",
              width: "100%",
              maxWidth: 1100,
              alignSelf: "center",
              backgroundColor: "#ffffff",
              borderRadius: 20,
              overflow: "hidden",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.08,
              shadowRadius: 20,
              elevation: 10,
              marginVertical: isSmallScreen ? 20 : 60,
            }}
          >
            {/* LEFT COLUMN: Info & Styling */}
            <View style={[styles.infoCol, isSmallScreen && { width: "100%", paddingVertical: 40 }]}>
              <View style={{ gap: 8 }}>
                <Text style={styles.infoSubtitle}>KUARZO ATENCIÓN</Text>
                <Text style={styles.infoTitle}>Ponte en contacto con nosotros</Text>
                <Text style={styles.infoDescription}>
                  ¿Tienes alguna duda sobre nuestros productos, envíos o pedidos personalizados? Déjanos tus datos y un asesor se comunicará contigo lo antes posible.
                </Text>
              </View>

              {/* Info Items */}
              <View style={{ gap: 24, marginTop: 40 }}>
                <View style={styles.infoItem}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name="local-phone" size={20} color="#FFD700" />
                  </View>
                  <View>
                    <Text style={styles.infoItemLabel}>Llámanos</Text>
                    <Text style={styles.infoItemValue}>+57 321 456 7890</Text>
                  </View>
                </View>

                <View style={styles.infoItem}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name="email" size={20} color="#FFD700" />
                  </View>
                  <View>
                    <Text style={styles.infoItemLabel}>Escríbenos</Text>
                    <Text style={styles.infoItemValue}>contacto@kuarzo.com</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* RIGHT COLUMN: Form */}
            <View style={[styles.formCol, isSmallScreen && { width: "100%" }]}>
              {isSuccess ? (
                <View style={styles.successContainer}>
                  <View style={styles.successIconWrapper}>
                    <MaterialIcons name="check-circle" size={60} color="#10B981" />
                  </View>
                  <Text style={styles.successTitle}>¡Mensaje Enviado!</Text>
                  <Text style={styles.successMessage}>
                    Hemos recibido tus datos con éxito. Nuestro equipo se pondrá en contacto contigo en las próximas horas.
                  </Text>
                  <CustomButton
                    className="bg-primary rounded-lg font-roboto-bold px-6 py-3 mt-4"
                    onPress={() => setIsSuccess(false)}
                  >
                    Enviar otro mensaje
                  </CustomButton>
                </View>
              ) : (
                <View>
                  <Text style={styles.formTitle}>Déjanos tus datos</Text>
                  <Text style={styles.formSubtitle}>Responderemos en menos de 24 horas hábiles.</Text>

                  {/* Campo: Nombre */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Escribe tu nombre"
                      placeholderTextColor="#9CA3AF"
                      value={nombre}
                      onChangeText={setNombre}
                      editable={!isLoading}
                    />
                  </View>

                  {/* Campo: Apellido */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Apellido</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Escribe tu apellido"
                      placeholderTextColor="#9CA3AF"
                      value={apellido}
                      onChangeText={setApellido}
                      editable={!isLoading}
                    />
                  </View>

                  {/* Campo: Correo */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Correo electrónico</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="ejemplo@correo.com"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="email-address"
                      value={correo}
                      onChangeText={setCorreo}
                      editable={!isLoading}
                    />
                  </View>

                  {/* Campo: Teléfono */}
                  <View style={styles.inputGroup} className="mb-4">
                    <Text style={styles.label}>Número de teléfono</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Ej: 3001234567"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="phone-pad"
                      value={telefono}
                      onChangeText={setTelefono}
                      editable={!isLoading}
                    />
                  </View>

                  <CustomButton
                    className="bg-primary rounded-lg font-roboto-bold w-full h-12 mt-8 justify-center items-center"
                    onPress={handleSend}
                    disabled={isLoading}
                  >
                    {isLoading ? "ENVIANDO..." : "ENVIAR FORMULARIO"}
                  </CustomButton>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* FOOTER */}
        <AppFooter platform="web" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactoWeb;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  infoCol: {
    width: "45%",
    backgroundColor: "#111827",
    padding: 40,
    justifyContent: "space-between",
  },
  infoSubtitle: {
    color: "#FFD700",
    fontFamily: "Roboto-Bold",
    fontSize: 12,
    letterSpacing: 1.5,
  },
  infoTitle: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Bold",
    fontSize: 28,
    lineHeight: 34,
    marginTop: 4,
  },
  infoDescription: {
    color: "#D1D5DB",
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1F2937",
    justifyContent: "center",
    alignItems: "center",
  },
  infoItemLabel: {
    color: "#9CA3AF",
    fontFamily: "OpenSans-Regular",
    fontSize: 12,
  },
  infoItemValue: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Medium",
    fontSize: 15,
  },
  formCol: {
    width: "55%",
    padding: 40,
    backgroundColor: "#ffffff",
  },
  formTitle: {
    color: "#111827",
    fontFamily: "Roboto-Bold",
    fontSize: 24,
  },
  formSubtitle: {
    color: "#6B7280",
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 16,
  },
  inputGroup: {
    marginTop: 16,
  },
  label: {
    color: "#374151",
    fontFamily: "Roboto-Medium",
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: "OpenSans-Regular",
    color: "#111827",
    backgroundColor: "#F9FAFB",
  },
  successContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    textAlign: "center",
  },
  successIconWrapper: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontFamily: "Roboto-Bold",
    color: "#111827",
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
    maxWidth: 320,
  },
});
