import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import server from '../../common';

export default (props) => {
  const [gesto, setGesto] = useState('');
  const [exercicios, setExercicios] = useState([]);

  useEffect(() => {
    getExercicios();
    console.warn('OLA');
  }, []);

  getExercicios = async () => {
    console.log(exercicios);
    try {
      const res = await axios.get(`http://10.0.2.2:3001/exercise`);
      console.warn('ola' + res.data[0].descricao);
      setExercicios(res.data);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={gesto}
        onValueChange={(itemValue) => setGesto(itemValue)}
        mode="dropdown">
        <Picker.Item label="Passe" value="passe" />
        <Picker.Item label="Remate" value="remate" />
        <Picker.Item label="Serviço" value="servico" />
      </Picker>
      <View style={styles.lista}>
        <Text style={{fontSize: 20, marginTop: 20, marginLeft: 15}}>
          Lista de Exercicios
        </Text>
        <FlatList></FlatList>
      </View>
      <Button title="Get exercicios" onPress={getExercicios}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
