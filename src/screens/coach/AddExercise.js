import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, Image, Button, StyleSheet, SafeAreaView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import {DropdownList, PickerDate, PickerDateTime} from 'react-native-ultimate-modal-picker'

export default ({props, route, navigation}) => {
  const [descricao, setDescricao] = useState('');
  const [nome, setNome] = useState('');
  const [gesto, setGesto] = useState('');
  const [imagem, setImagem] = useState('https://reactjs.org/logo-og.png');
  const [imagemsend, setImagemSend] = useState(null);
  
  const gestos = [
    { label: 'Todos', value: 'Todos' },
    { label: 'Passe', value: 'Passe' },
    { label: 'Remate', value: 'Remate' },
    { label: 'Serviço', value: 'Serviço' },
    { label: 'Bloco', value: 'Bloco' },
  ];
  

  uploadExercise = () => {
    var formData = new FormData();

    formData.append('nome', nome);
    formData.append('desc', descricao);
    formData.append('gesto', gesto);

    formData.append('foto', {
      name: 'upload',
      type: imagemsend.mime,
      uri:
        Platform.OS === 'android'
          ? imagemsend.path
          : imagemsend.path.replace('file://', ''),
    });

    axios({
      method: 'post',
      url: 'http://volleyapi.sarapaiva.webtuga.net/exercise',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
    navigation.goBack();
  };
  escolherFoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      //cropping: true,
    }).then((image) => {
      setImagem(image.path);
      setImagemSend(image);
    });
  };

  return (
    <SafeAreaView>
      <Text style={{fontSize: 20}}>Vamos adicionar exercicios</Text>
      <View style={styles.container}>
        <Text>Nome: </Text>
        <TextInput
          style={styles.inputsss}
          onChangeText={setNome}
          value={nome}></TextInput>
      </View>
      <View style={styles.container}>
        <Text>Descrição: </Text>
        <TextInput
          style={styles.inputsss}
          onChangeText={setDescricao}
          value={descricao}></TextInput>
      </View>
      <DropdownList
          title="Gesto Técnico"
          items={gestos}
          onChange={(item) => setGesto(item)}
          
        /> 
      
      <View>
        <Text>Esquema: </Text>
        <Image source={{uri: imagem}} style={{width: 250, height: 250}} />
      </View>
      <Button title="Escolher Fotografia" onPress={escolherFoto}></Button>
      <Button title="Confirm" onPress={uploadExercise}></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    backgroundColor: '#EEE',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputsss: {
    width: '70%',
    backgroundColor: '#FFF',
  },
});
