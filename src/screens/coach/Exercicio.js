import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, SafeAreaView} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import Exercice from '../../components/Exercice';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DropdownList, PickerDate, PickerDateTime} from 'react-native-ultimate-modal-picker'

export default ({props, navigation}) => {
  const [gesto, setGesto] = useState('');
  const [exercicios, setExercicios] = useState([]);
  const [count, setCount] = useState(0);
  const [state, setState] = useState({});

  const gestos = [
    { label: 'Todos', value: 'Todos' },
    { label: 'Passe', value: 'Passe' },
    { label: 'Remate', value: 'Remate' },
    { label: 'Serviço', value: 'Serviço' },
    { label: 'Bloco', value: 'Bloco' },
  ];

  useEffect(() => {
    getExercicios();
    
  });

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
      <View style={styles.item1}>
     
        <Text
          style={{
            fontSize: 40,
            marginTop: 20,
            marginLeft: 15,
            marginBottom: 15,
          }}>
          Lista de Exercicios
        </Text>
        <DropdownList
          title="Gesto Técnico"
          items={gestos}
          onChange={(item) => filterExercise(item)}
          
        /> 
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

        <View>
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
  
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
