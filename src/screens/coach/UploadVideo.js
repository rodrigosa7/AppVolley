import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

const GESTOS = [
  {label: 'Passe', value: 'Passe'},
  {label: 'Remate', value: 'Remate'},
  {label: 'Serviço', value: 'Serviço'},
  {label: 'Bloco', value: 'Bloco'},
];

export default (props, {navigation}) => {
  const [gesto, setGesto] = useState('Todos');
  const [exercicio, setExercicio] = useState(0);
  const [exercicios, setExercicios] = useState([]);
  const [imagem, setImagem] = useState(null);
  
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `http://volleyapi.sarapaiva.webtuga.net/exercise`,
        );
        console.log('Exerciciso definidos');
        setExercicios(res.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  filterExercise = async (tipoGesto) => {
    if (!tipoGesto) return;
    try {
      const res = await axios.get(
        `http://volleyapi.sarapaiva.webtuga.net/exercise/${tipoGesto}`,
      );
      setExercicios(res.data);
    } catch (e) {
      console.warn(e);
    }
  };
  escolherFoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      //cropping: true,
    })
      .then((image) => {
        setImagem(image.path);
        setImagemSend(image);
      })
      .catch((err) => {
        setImagem(null);
        //console.log(err);
        Alert.alert('Erro', 'Nenhuma Imagem Selecionada', [
          {
            text: 'Confirmar',
            style: 'cancel',
          },
        ]);
      });
  };
  return (
    <SafeAreaView>
      <Text style={styles.title}>Upload Vídeo</Text>
      {Platform.OS === 'ios' && (
        <DropdownList
          title="Gesto Técnico"
          items={GESTOS}
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
      {Platform.OS === 'android' && (
        <>
          <Text style={[styles.text, {marginLeft: 15}]}>Exercicio:</Text>
          <Picker
            selectedValue={exercicio}
            style={{height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex) => setExercicio(itemValue)}>
            {exercicios.map((item) => (
              <Picker.Item
                key={item.idExercicio}
                label={item.exnome}
                value={item.idExercicio}
              />
            ))}
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
