import {
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {DropdownList} from 'react-native-ultimate-modal-picker';
import Exercice from '../../components/Exercice';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

export default ({props, navigation}) => {
  const [gesto, setGesto] = useState('');
  const [exercicios, setExercicios] = useState([]);
  const [count, setCount] = useState(0);
  const [state, setState] = useState({});

  const gestos = [
    {label: 'Todos', value: 'Todos'},
    {label: 'Passe', value: 'Passe'},
    {label: 'Remate', value: 'Remate'},
    {label: 'Serviço', value: 'Serviço'},
    {label: 'Bloco', value: 'Bloco'},
  ];
  /*
  useEffect(() => {
    getExercicios();
  }, []);
*/
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && getExercicios();
  }, [isFocused]);

  //Verificar leak de memória!
  /*
  useEffect(() => {
    getExercicios();
    return () => {
      setState({}); 
    };
  }, [count]);
  */
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
    if (tipoGesto == 'Todos') {
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
      <View>
        <Text
          style={{
            fontSize: 40,
            marginTop: 20,
            marginLeft: 15,
            marginBottom: 15,
          }}>
          Lista de Exercicíos
        </Text>
        {Platform.OS === 'ios' && (
          <DropdownList
            title="Gesto Técnico"
            items={gestos}
            onChange={(item) => filterExercise(item)}
          />
        )}
        {Platform.OS === 'android' && (
          <>
            <Text style={[styles.text, {marginLeft: 15}]}>Gesto:</Text>
            <Picker
              selectedValue={gesto}
              style={{height: 50, width: 150}}
              onValueChange={(itemValue, itemIndex) =>
                filterExercise(itemValue)
              }>
              <Picker.Item label="Todos" value="Todos" />
              <Picker.Item label="Passe" value="Passe" />
              <Picker.Item label="Remate" value="Remate" />
              <Picker.Item label="Serviço" value="Serviço" />
              <Picker.Item label="Bloco" value="Bloco" />
            </Picker>
          </>
        )}
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

        <View style={styles.fim}>
          <TouchableOpacity onPress={addExercise}>
            <View style={styles.button}>
              <Text style={styles.texto}>Adicionar Exercicio</Text>
              <Icon name="volleyball-ball"></Icon>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#da581e',
    marginTop: 10,
    padding: 10,

    borderRadius: 7,
    //width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  fim: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lista: {
    //flex: 2,
    height: Dimensions.get('window').height * 0.5,
    marginBottom: 10,
  },

  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#d8dce3',
    height: '100%',
  },
});
