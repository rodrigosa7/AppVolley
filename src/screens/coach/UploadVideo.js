import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

export default (props, {navigation}) => {
  const [gesto, setGesto] = useState('');
  const [exercicios, setExercicios] = useState([]);
  const gestos = [
    {label: 'Passe', value: 'Passe'},
    {label: 'Remate', value: 'Remate'},
    {label: 'Serviço', value: 'Serviço'},
    {label: 'Bloco', value: 'Bloco'},
  ];

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
    <SafeAreaView>
      <Text style={styles.title}>Upload Vídeo</Text>
      {Platform.OS === 'ios' && (
        <DropdownList
          title="Gesto Técnico"
          items={gestos}
          onChange={(item) => {
            console.log(item);
            filterExercise(item);
          }}
        />
      )}
      {Platform.OS === 'android' && (
        <>
          <Text style={[styles.text, {marginLeft: 15}]}>Gesto:</Text>
          <Picker
            selectedValue={gesto}
            style={{height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex) => filterExercise(itemValue)}>
            <Picker.Item label="Passe" value="Passe" />
            <Picker.Item label="Remate" value="Remate" />
            <Picker.Item label="Serviço" value="Serviço" />
            <Picker.Item label="Bloco" value="Bloco" />
          </Picker>
        </>
      )}
      <Text> textInComponent </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#333',
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    color: '#da581e',
    margin: 10,
    fontWeight: 'bold',
  },
});
