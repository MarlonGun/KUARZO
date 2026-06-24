import React from 'react';
import { ScrollView, Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

const PoliticasPrivacidadWeb = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppHeader platform="web" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 0 }}>
        <View style={[styles.container, isMobile && styles.containerMobile]}>
          <Text style={styles.title}>Política de Privacidad de Kuarzo</Text>
          <Text style={styles.date}>Última actualización: 01-06-2026</Text>

          <Text style={styles.heading}>1. Introducción</Text>
          <Text style={styles.paragraph}>
            En Kuarzo, nos comprometemos a proteger la privacidad y seguridad de la información personal de nuestros usuarios. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos los datos personales de quienes acceden y realizan compras en nuestra plataforma de comercio electrónico especializada en joyería colombiana.{'\n\n'}
            Al utilizar nuestro sitio web, el usuario acepta las prácticas descritas en esta política.
          </Text>

          <Text style={styles.heading}>2. Responsable del Tratamiento de Datos</Text>
          <Text style={styles.paragraph}>
            Razón social: KUARZO{'\n'}
            Ciudad: Medellín, Colombia{'\n'}
            Correo electrónico: contacto@kuarzo.com{'\n'}
            Teléfono: 321 456 7890{'\n\n'}
            Kuarzo actúa como responsable del tratamiento de los datos personales recopilados a través de la plataforma.
          </Text>

          <Text style={styles.heading}>3. Información que Recopilamos</Text>
          <Text style={styles.paragraph}>Podemos recopilar los siguientes datos personales:</Text>
          
          <Text style={styles.subHeading}>Información de identificación</Text>
          <Text style={styles.listItem}>• Nombre y apellidos.</Text>
          <Text style={styles.listItem}>• Número de identificación (cuando sea requerido para facturación).</Text>
          <Text style={styles.listItem}>• Fecha de nacimiento (opcional).</Text>
          
          <Text style={styles.subHeading}>Información de contacto</Text>
          <Text style={styles.listItem}>• Correo electrónico.</Text>
          <Text style={styles.listItem}>• Número telefónico.</Text>
          <Text style={styles.listItem}>• Dirección de envío y facturación.</Text>
          
          <Text style={styles.subHeading}>Información de compra</Text>
          <Text style={styles.listItem}>• Historial de pedidos.</Text>
          <Text style={styles.listItem}>• Productos adquiridos.</Text>
          <Text style={styles.listItem}>• Métodos de pago utilizados.</Text>
          
          <Text style={styles.subHeading}>Información técnica</Text>
          <Text style={styles.listItem}>• Dirección IP.</Text>
          <Text style={styles.listItem}>• Tipo de navegador.</Text>
          <Text style={styles.listItem}>• Sistema operativo.</Text>
          <Text style={styles.listItem}>• Dispositivo utilizado.</Text>
          <Text style={styles.listItem}>• Fecha y hora de acceso.</Text>

          <Text style={styles.subHeading}>Información recopilada mediante cookies</Text>
          <Text style={styles.listItem}>• Preferencias de navegación.</Text>
          <Text style={styles.listItem}>• Productos visualizados.</Text>
          <Text style={styles.listItem}>• Datos estadísticos sobre el uso del sitio web.</Text>

          <Text style={styles.heading}>4. Finalidad del Tratamiento de Datos</Text>
          <Text style={styles.paragraph}>Los datos personales serán utilizados para:</Text>
          <Text style={styles.listItem}>• Procesar y gestionar pedidos.</Text>
          <Text style={styles.listItem}>• Realizar entregas de productos.</Text>
          <Text style={styles.listItem}>• Gestionar pagos y facturación.</Text>
          <Text style={styles.listItem}>• Brindar atención al cliente.</Text>
          <Text style={styles.listItem}>• Resolver solicitudes, quejas y reclamos.</Text>
          <Text style={styles.listItem}>• Enviar información relacionada con compras realizadas.</Text>
          <Text style={styles.listItem}>• Mejorar la experiencia de navegación.</Text>
          <Text style={styles.listItem}>• Realizar análisis estadísticos y comerciales.</Text>
          <Text style={styles.listItem}>• Cumplir obligaciones legales y regulatorias.</Text>
          
          <Text style={styles.paragraph}>Cuando exista autorización expresa del usuario, también podrán utilizarse para:</Text>
          <Text style={styles.listItem}>• Envío de promociones.</Text>
          <Text style={styles.listItem}>• Campañas publicitarias.</Text>
          <Text style={styles.listItem}>• Novedades y lanzamientos de productos.</Text>

          <Text style={styles.heading}>5. Base Legal para el Tratamiento</Text>
          <Text style={styles.paragraph}>Kuarzo tratará los datos personales conforme a:</Text>
          <Text style={styles.listItem}>• La autorización otorgada por el titular.</Text>
          <Text style={styles.listItem}>• La ejecución de contratos de compraventa.</Text>
          <Text style={styles.listItem}>• El cumplimiento de obligaciones legales.</Text>
          <Text style={styles.listItem}>• Los intereses legítimos relacionados con la operación de la plataforma.</Text>

          <Text style={styles.heading}>6. Protección y Seguridad de la Información</Text>
          <Text style={styles.paragraph}>Kuarzo implementa medidas técnicas, administrativas y organizacionales razonables para proteger la información personal contra:</Text>
          <Text style={styles.listItem}>• Accesos no autorizados.</Text>
          <Text style={styles.listItem}>• Alteración de datos.</Text>
          <Text style={styles.listItem}>• Divulgación indebida.</Text>
          <Text style={styles.listItem}>• Pérdida o destrucción de información.</Text>
          <Text style={styles.paragraph}>Sin embargo, ningún sistema tecnológico puede garantizar seguridad absoluta.</Text>

          <Text style={styles.heading}>7. Compartición de Información</Text>
          <Text style={styles.paragraph}>Kuarzo podrá compartir información personal únicamente cuando sea necesario con:</Text>
          <Text style={styles.listItem}>• Empresas de mensajería y transporte.</Text>
          <Text style={styles.listItem}>• Pasarelas de pago.</Text>
          <Text style={styles.listItem}>• Proveedores tecnológicos.</Text>
          <Text style={styles.listItem}>• Autoridades administrativas o judiciales cuando la ley lo exija.</Text>
          <Text style={styles.paragraph}>En ningún caso venderemos o comercializaremos los datos personales de nuestros usuarios.</Text>

          <Text style={styles.heading}>8. Derechos de los Titulares de los Datos</Text>
          <Text style={styles.paragraph}>De acuerdo con la Ley 1581 de 2012, los usuarios tienen derecho a:</Text>
          <Text style={styles.listItem}>• Conocer los datos personales almacenados.</Text>
          <Text style={styles.listItem}>• Actualizar su información.</Text>
          <Text style={styles.listItem}>• Rectificar datos incorrectos.</Text>
          <Text style={styles.listItem}>• Solicitar la eliminación de sus datos cuando proceda.</Text>
          <Text style={styles.listItem}>• Revocar la autorización otorgada.</Text>
          <Text style={styles.listItem}>• Presentar consultas o reclamos relacionados con el tratamiento de sus datos.</Text>

          <Text style={styles.heading}>9. Procedimiento para Ejercer sus Derechos</Text>
          <Text style={styles.paragraph}>
            Los usuarios podrán presentar solicitudes relacionadas con sus datos personales mediante:{'\n'}
            Correo electrónico: privacidad@kuarzo.com{'\n\n'}
            La solicitud deberá incluir:
          </Text>
          <Text style={styles.listItem}>• Nombre completo.</Text>
          <Text style={styles.listItem}>• Documento de identidad.</Text>
          <Text style={styles.listItem}>• Descripción de la solicitud.</Text>
          <Text style={styles.listItem}>• Información de contacto.</Text>
          <Text style={styles.paragraph}>Kuarzo responderá dentro de los plazos establecidos por la legislación colombiana vigente.</Text>

          <Text style={styles.heading}>10. Uso de Cookies</Text>
          <Text style={styles.paragraph}>Nuestro sitio web utiliza cookies para:</Text>
          <Text style={styles.listItem}>• Recordar preferencias de usuario.</Text>
          <Text style={styles.listItem}>• Facilitar la navegación.</Text>
          <Text style={styles.listItem}>• Analizar el comportamiento dentro de la plataforma.</Text>
          <Text style={styles.listItem}>• Mejorar la experiencia de compra.</Text>
          <Text style={styles.paragraph}>El usuario puede configurar su navegador para rechazar o eliminar cookies; sin embargo, algunas funcionalidades podrían verse afectadas.</Text>

          <Text style={styles.heading}>11. Conservación de los Datos</Text>
          <Text style={styles.paragraph}>
            Los datos personales serán conservados únicamente durante el tiempo necesario para cumplir las finalidades descritas en esta política o durante el período exigido por la legislación aplicable.{'\n\n'}
            Una vez finalizado dicho período, la información será eliminada o anonimizada de manera segura.
          </Text>

          <Text style={styles.heading}>12. Protección de Datos de Menores de Edad</Text>
          <Text style={styles.paragraph}>
            Kuarzo no recopila intencionalmente información de menores de edad sin la autorización de sus padres o representantes legales.{'\n\n'}
            Si se detecta información proporcionada por un menor sin autorización, será eliminada tan pronto como sea posible.
          </Text>

          <Text style={styles.heading}>13. Modificaciones de la Política de Privacidad</Text>
          <Text style={styles.paragraph}>
            Kuarzo podrá actualizar esta Política de Privacidad cuando sea necesario para adaptarse a cambios legales, tecnológicos o comerciales.{'\n\n'}
            Las modificaciones serán publicadas en el sitio web y entrarán en vigor desde su publicación.
          </Text>

          <Text style={styles.heading}>14. Legislación Aplicable</Text>
          <Text style={styles.paragraph}>
            Esta Política de Privacidad se rige por las leyes de la República de Colombia, especialmente:{'\n'}
            Ley 1581 de 2012.{'\n'}
            Decreto 1377 de 2013.{'\n'}
            Demás normas relacionadas con la protección de datos personales.
          </Text>

          <Text style={styles.heading}>15. Contacto</Text>
          <Text style={styles.paragraph}>
            Para cualquier consulta relacionada con esta Política de Privacidad o el tratamiento de datos personales, puede comunicarse con:{'\n\n'}
            Kuarzo – Joyería Colombiana{'\n'}
            Correo: contacto@kuarzo.com{'\n'}
            Ciudad: Medellín, Colombia{'\n'}
            Teléfono: 321 456 7890
          </Text>
        </View>
        <AppFooter platform="web" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 800,
    alignSelf: 'center',
    paddingHorizontal: 40,
    paddingVertical: 40,
    width: '100%',
  },
  containerMobile: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Roboto-Bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: '#6b7280',
    marginBottom: 40,
    textAlign: 'center',
  },
  heading: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: '#111827',
    marginTop: 24,
    marginBottom: 12,
  },
  subHeading: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    fontFamily: 'OpenSans-Regular',
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 12,
  },
  listItem: {
    fontSize: 15,
    fontFamily: 'OpenSans-Regular',
    color: '#4b5563',
    lineHeight: 24,
    marginLeft: 16,
    marginBottom: 4,
  },
});

export default PoliticasPrivacidadWeb;
