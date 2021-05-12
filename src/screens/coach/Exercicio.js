import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {SizedBox} from 'sizedbox';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import Exercice from '../../components/Exercice';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default ({props, navigation}) => {
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
    setGesto(tipoGesto);
    if (tipoGesto == 'todos') {
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
        const res = await axios.get(
          `http://volleyapi.sarapaiva.webtuga.net/exercise/${tipoGesto}`,
        );
        setExercicios(res.data);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.item1}>
        <Text style={{fontSize: 40, marginTop: 20, marginLeft: 15}}>
          Lista de Exercicios
        </Text>

        <View style={styles.lista}>
          <FlatList
            data={exercicios}
            keyExtractor={(item) => `${item.idExercicio}`}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('InfoExercicio', {item})}>
                <Exercice {...item} />
              </TouchableOpacity>
            )}
          />
        </View>

        <View styles={styles.button}>
          <TouchableOpacity onPress={addExercise}>
            <View style={styles.button}>
              <Text>Adicionar Exercicio</Text>
              <Icon name="volleyball-ball"></Icon>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.item2}>
        <Text style={{fontSize: 20, marginTop: 20, marginLeft: 15}}>
          Filtro:
        </Text>
        <Picker
          selectedValue={gesto}
          onValueChange={(itemValue) => filterExercise(itemValue)}
          mode="dropdown">
          <Picker.Item label="Todos" value="todos" />
          <Picker.Item label="Passe" value="passe" />
          <Picker.Item label="Remate" value="remate" />
          <Picker.Item label="Serviço" value="servico" />
        </Picker>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#da581e',
    marginTop: 10,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 7,
    width: '50%',
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  item1: {
    height: '70%',
  },
  item2: {
    height: '30%',
  },
});
