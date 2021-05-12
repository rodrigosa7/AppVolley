import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Exercice from '../../components/Exercice';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default ({ props, navigation }) => {
  const [gesto, setGesto] = useState('');
  const [exercicios, setExercicios] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    getExercicios();
  }, [count]);

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
    if (tipoGesto == "todos") {
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
    <SafeAreaView style={styles.container}>
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


      <View styles={styles.botoes}>
        <TouchableOpacity onPress={addExercise}>

          <View
            style={styles.button}>
            
            <Text>
              Adicionar Exercicio
            </Text>
            <Icon name="dumbbell"></Icon>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    
    backgroundColor: '#da581e',
    marginTop: 10,
    padding: 10,
 
    alignItems: 'center',
    borderRadius: 7,
    width: "50%",
    alignSelf: 'center',
  },

});
