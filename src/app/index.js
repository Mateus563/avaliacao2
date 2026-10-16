import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Inicio() {
  return (

    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "TELA INICIAL" }} />



      <View style={styles.cartao}>
        <Text style={styles.titulo}>Meus Jogos</Text>
        <Text style={styles.detalhe}>Venha registrar seus jogos conosco.</Text>
        <Link href="/meusjogos" style={styles.link}>
          Abrir meus jogos →
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#6d6565",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  cartao: {
    backgroundColor: "#96b5e4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 6,
  },

  titulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  link: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2354D6",
    marginTop: 4,
  },
});
