import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,  
  Text,    
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("jogos.db");

db.execSync(`


  CREATE TABLE IF NOT EXISTS jogos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255) NOT NULL,
    plataforma VARCHAR(255) NOT NULL,
    horas INTEGER NOT NULL
  );
`);

function listar() {
  return db.getAllSync("SELECT * FROM jogos ORDER BY id DESC");
}

function salvar(nome, plataforma, horas) {
  db.runSync(
    "INSERT INTO jogos (nome, plataforma, horas) VALUES (?, ?, ?)",
    [nome, plataforma, horas]
  );
}

function excluir(id) {
  db.runSync("DELETE FROM jogos WHERE id = ?", [id]);
}

function edita(nome, plataforma, horas, id) {
  db.runSync("UPDATE jogos SET nome = ?, plataforma = ?, horas = ? WHERE id = ?", [
    nome,
    plataforma,
    horas, 
    id,
  ]);
}

export default function ListaDb() {
  const [nome, setNome] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [horas, setHoras] = useState("");
  const [lista, setLista] = useState([]);
  const [idEditando, setIdEditando] = useState(0);

  function carregar() {
    setLista(listar());
  }

  useEffect(() => {
    carregar();
  }, []);

  function guardarOuEditar() {
    if (idEditando === 0) {
      salvar(nome, plataforma, horas);
    } else {
      edita(nome, plataforma, horas, idEditando);
    }
    setNome("");
    setPlataforma("");
    setHoras("");
    setIdEditando(0);
    carregar();
  }

  function remover(id) {
    excluir(id);
    carregar();
  }  

  function editar(jogos) {
    setIdEditando(jogos.id);
    setNome(jogos.nome);
    setPlataforma(jogos.plataforma);
    setHoras(jogos.horas);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "MEUS JOGOS" }} />

      <TextInput
        style={styles.campo}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome do jogo"
      />

      <TextInput
        style={styles.campo}
        value={plataforma}
        onChangeText={setPlataforma}
        placeholder="Digite a plataforma do jogo"
      />

      <TextInput
        style={styles.campo}
        value={horas}
        onChangeText={setHoras}
        placeholder="Digite as horas jogadas"
      />


      <Button title="Salvar" onPress={guardarOuEditar} />

      <FlatList
        style={styles.lista}
        data={lista}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.texto}>
                Nome: {item.nome}
              </Text>

              <Text style={styles.texto}>
                Plataforma: {item.plataforma}
              </Text>

            <Text style={styles.texto}>
                Horas: {item.horas}
              </Text>
            </View>

            <Button
              title="Editar"
              onPress={() => {editar(item);
              }}
            />

            <Button
              title="Excluir"
              onPress={() => remover(item.id)}
            />
          </View>
        )}
      />
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

  campo: {
    borderWidth: 1,
    borderColor: "#0352ca",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#fbfcff",
    marginBottom: 12,
  },

  lista: {
    flex: 1,
    marginTop: 16,
  },

  item: {
    backgroundColor: "#96b5e4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  texto: {
    fontSize: 15,
    color: "#f7eaea",
    marginBottom: 5,
  },
});