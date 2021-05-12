import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import server from '../../common';
import Exercice from '../../components/Exercice';
import ExerciceInfo from '../../screens/coach/ExerciceInfo';

export default ({ props, navigation }) => {
  const [gesto, setGesto] = useState('');
  const [exercicios, setExercicios] = useState([]);

  useEffect(() => {
    getExercicios();
  });

  getExercicios = async () => {
    try {
      const res = await axios.get(
        `http://volleyapi.sarapaiva.webtuga.net/exercise`,
      );
      setExercicios(res.data);
    } catch (e) {
      console.warn(e);
    }
  };

  addExercise = () => {
    navigation.navigate('AddExercise');
  };
  filterExercise = async (tipoGesto) => {
    setGesto(tipoGesto)
    if (tipoGesto == "all") {
      try {
        const res = await axios.get(
          `http://volleyapi.sarapaiva.webtuga.net/exercise`,
        );
        setExercicios(res.data);
      } catch (e) {
        console.warn(e);
      }
    } else {
      try {
        const res = await axios.get(`http://volleyapi.sarapaiva.webtuga.net/exercise/${tipoGesto}`);
        setExercicios(res.data);
      } catch (e) {
        console.warn(e)
      }
    }


  }

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={gesto}
        onValueChange={(itemValue) => filterExercise(itemValue)}
        mode="dropdown">
        <Picker.Item label="Todos" value="todos" />
        <Picker.Item label="Passe" value="passe" />
        <Picker.Item label="Remate" value="remate" />
        <Picker.Item label="Serviço" value="servico" />
      </Picker>
      <View style={styles.lista}>
        <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 15 }}>
          Lista de Exercicios
        </Text>
        <FlatList
          data={exercicios}
          keyExtractor={(item) => `${item.idExercicio}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('InfoExercicio', { item })}>
              <Exercice {...item} />
            </TouchableOpacity>
          )}
        />
      </View>
      <Button title="Get exercicios" onPress={getExercicios}></Button>
      <Button title="Add Exercise" onPress={addExercise}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
