import React from 'react';
import { ScrollView, Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

const TerminosCondicionesWeb = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppHeader platform="web" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 0 }}>
        <View style={[styles.container, isMobile && styles.containerMobile]}>
          <Text style={styles.title}>Términos y Condiciones de Uso – Kuarzo</Text>
          <Text style={styles.date}>Última actualización: 01/06/2026</Text>

          <Text style={styles.paragraph}>
            Bienvenido a Kuarzo, una plataforma de comercio electrónico dedicada a la promoción y comercialización de joyería colombiana. Al acceder, navegar o realizar compras en nuestro sitio web, el usuario acepta los presentes Términos y Condiciones. Si no está de acuerdo con ellos, deberá abstenerse de utilizar la plataforma.
          </Text>

          <Text style={styles.heading}>1. Identificación de la Plataforma</Text>
          <Text style={styles.paragraph}>
            Kuarzo es una tienda virtual destinada a la venta de joyería elaborada por joyeros colombianos, ofreciendo productos auténticos y representativos de la cultura nacional.{'\n\n'}
            Para efectos de estos términos:
          </Text>
          <Text style={styles.listItem}>• Plataforma: Sitio web Kuarzo.</Text>
          <Text style={styles.listItem}>• Usuario: Persona que navega, se registra o realiza compras.</Text>
          <Text style={styles.listItem}>• Cliente: Usuario que adquiere productos mediante la plataforma.</Text>
          <Text style={styles.listItem}>• Productos: Joyería y artículos ofrecidos a través de Kuarzo.</Text>

          <Text style={styles.heading}>2. Aceptación de los Términos</Text>
          <Text style={styles.paragraph}>
            El uso de Kuarzo implica la aceptación plena y sin reservas de estos Términos y Condiciones.{'\n\n'}
            Kuarzo podrá modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en la plataforma.
          </Text>

          <Text style={styles.heading}>3. Registro de Usuarios</Text>
          <Text style={styles.paragraph}>Para realizar compras, el usuario podrá registrarse proporcionando información veraz, actualizada y completa.{'\n\n'}El usuario se compromete a:</Text>
          <Text style={styles.listItem}>• Mantener la confidencialidad de sus credenciales de acceso.</Text>
          <Text style={styles.listItem}>• No compartir su cuenta con terceros.</Text>
          <Text style={styles.listItem}>• Notificar inmediatamente cualquier uso no autorizado de su cuenta.</Text>
          <Text style={styles.paragraph}>Kuarzo no será responsable por pérdidas derivadas del uso indebido de las credenciales del usuario.</Text>

          <Text style={styles.heading}>4. Productos y Disponibilidad</Text>
          <Text style={styles.paragraph}>Los productos publicados en Kuarzo incluyen descripciones, fotografías y precios con fines informativos.{'\n\n'}Debido a la naturaleza de los productos:</Text>
          <Text style={styles.listItem}>• Pueden existir pequeñas variaciones en colores, tamaños, texturas o acabados.</Text>
          <Text style={styles.listItem}>• Las imágenes son ilustrativas y pueden diferir ligeramente del producto recibido.</Text>
          <Text style={styles.listItem}>• La disponibilidad está sujeta al inventario existente.</Text>
          <Text style={styles.paragraph}>Kuarzo se reserva el derecho de modificar, actualizar o retirar productos sin previo aviso.</Text>

          <Text style={styles.heading}>5. Precios y Pagos</Text>
          <Text style={styles.paragraph}>
            Todos los precios publicados se expresan en pesos colombianos (COP) e incluyen los impuestos aplicables según la legislación colombiana.{'\n\n'}
            Los pagos podrán realizarse mediante los medios electrónicos habilitados por la plataforma.{'\n\n'}
            Una compra se considerará confirmada una vez el pago haya sido aprobado por la entidad financiera correspondiente.{'\n\n'}
            Kuarzo se reserva el derecho de cancelar pedidos en caso de:
          </Text>
          <Text style={styles.listItem}>• Errores evidentes en precios.</Text>
          <Text style={styles.listItem}>• Actividades sospechosas o fraudulentas.</Text>
          <Text style={styles.listItem}>• Problemas de disponibilidad del producto.</Text>

          <Text style={styles.heading}>6. Envíos y Entregas</Text>
          <Text style={styles.paragraph}>
            Los pedidos serán enviados a la dirección proporcionada por el cliente durante el proceso de compra.{'\n\n'}
            Los tiempos de entrega son estimados y pueden variar debido a:
          </Text>
          <Text style={styles.listItem}>• Ubicación geográfica.</Text>
          <Text style={styles.listItem}>• Disponibilidad del producto.</Text>
          <Text style={styles.listItem}>• Condiciones logísticas externas.</Text>
          <Text style={styles.paragraph}>Kuarzo no será responsable por retrasos atribuibles a terceros transportadores, eventos de fuerza mayor o situaciones fuera de su control.</Text>

          <Text style={styles.heading}>7. Derecho de Retracto</Text>
          <Text style={styles.paragraph}>
            De conformidad con la legislación colombiana y la Ley 1480 de 2011 (Estatuto del Consumidor), el cliente podrá ejercer el derecho de retracto dentro de los cinco (5) días hábiles siguientes a la entrega del producto.{'\n\n'}
            Para aplicar:
          </Text>
          <Text style={styles.listItem}>• El producto debe encontrarse en perfecto estado.</Text>
          <Text style={styles.listItem}>• Debe conservar empaques y accesorios originales.</Text>
          <Text style={styles.listItem}>• No debe presentar señales de uso.</Text>
          <Text style={styles.paragraph}>Los costos de devolución serán asumidos por el consumidor, salvo disposición legal diferente.</Text>

          <Text style={styles.heading}>8. Cambios y Devoluciones</Text>
          <Text style={styles.paragraph}>Se aceptarán cambios o devoluciones en los siguientes casos:</Text>
          <Text style={styles.listItem}>• Producto defectuoso.</Text>
          <Text style={styles.listItem}>• Producto incorrecto.</Text>
          <Text style={styles.listItem}>• Daños ocasionados durante el transporte.</Text>
          <Text style={styles.paragraph}>
            El cliente deberá reportar la novedad dentro de los cinco (5) días hábiles posteriores a la recepción del pedido.{'\n\n'}
            Kuarzo evaluará cada caso y determinará la procedencia del cambio, reposición o reembolso.
          </Text>

          <Text style={styles.heading}>9. Propiedad Intelectual</Text>
          <Text style={styles.paragraph}>Todo el contenido de la plataforma, incluyendo:</Text>
          <Text style={styles.listItem}>• Nombre comercial Kuarzo.</Text>
          <Text style={styles.listItem}>• Logotipos.</Text>
          <Text style={styles.listItem}>• Diseños.</Text>
          <Text style={styles.listItem}>• Fotografías.</Text>
          <Text style={styles.listItem}>• Textos.</Text>
          <Text style={styles.listItem}>• Bases de datos.</Text>
          <Text style={styles.listItem}>• Código fuente.</Text>
          <Text style={styles.paragraph}>se encuentra protegido por las normas de propiedad intelectual y derechos de autor aplicables.{'\n\n'}Queda prohibida su reproducción, distribución o utilización sin autorización previa y escrita del titular correspondiente.</Text>

          <Text style={styles.heading}>10. Obligaciones del Usuario</Text>
          <Text style={styles.paragraph}>El usuario se compromete a:</Text>
          <Text style={styles.listItem}>• Utilizar la plataforma de forma lícita.</Text>
          <Text style={styles.listItem}>• No realizar actividades fraudulentas.</Text>
          <Text style={styles.listItem}>• No intentar vulnerar la seguridad del sistema.</Text>
          <Text style={styles.listItem}>• No utilizar información falsa o engañosa.</Text>
          <Text style={styles.paragraph}>Cualquier incumplimiento podrá dar lugar a la suspensión o cancelación de la cuenta.</Text>

          <Text style={styles.heading}>11. Protección de Datos Personales</Text>
          <Text style={styles.paragraph}>
            Kuarzo tratará los datos personales de los usuarios conforme a la legislación colombiana vigente en materia de protección de datos personales, especialmente la Ley 1581 de 2012.{'\n\n'}
            La información recopilada será utilizada para:
          </Text>
          <Text style={styles.listItem}>• Gestión de pedidos.</Text>
          <Text style={styles.listItem}>• Facturación.</Text>
          <Text style={styles.listItem}>• Atención al cliente.</Text>
          <Text style={styles.listItem}>• Comunicaciones relacionadas con el servicio.</Text>
          <Text style={styles.paragraph}>El usuario podrá ejercer sus derechos de acceso, actualización, rectificación y supresión de datos conforme a la Política de Tratamiento de Datos Personales de Kuarzo.</Text>

          <Text style={styles.heading}>12. Limitación de Responsabilidad</Text>
          <Text style={styles.paragraph}>Kuarzo no garantiza que la plataforma opere de manera ininterrumpida o libre de errores.{'\n\n'}La empresa no será responsable por:</Text>
          <Text style={styles.listItem}>• Fallas tecnológicas ajenas.</Text>
          <Text style={styles.listItem}>• Interrupciones de internet.</Text>
          <Text style={styles.listItem}>• Ataques informáticos de terceros.</Text>
          <Text style={styles.listItem}>• Daños indirectos derivados del uso de la plataforma.</Text>

          <Text style={styles.heading}>13. Legislación Aplicable</Text>
          <Text style={styles.paragraph}>
            Los presentes Términos y Condiciones se regirán por las leyes de la República de Colombia.{'\n\n'}
            Cualquier controversia será resuelta por las autoridades competentes colombianas.
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

export default TerminosCondicionesWeb;
