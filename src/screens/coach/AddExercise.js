import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  Button,
  ImagePickerIOS,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';

export default ({props, route}) => {
  const [descricao, setDescricao] = useState('');
  const [nome, setNome] = useState('');
  const [gesto, setGesto] = useState('');
  const [gestos, setGestos] = useState([]);
  const [imagem, setImagem] = useState('https://reactjs.org/logo-og.png');
  useEffect(() => {
    getGestos();
  });

  getGestos = async () => {
    try {
      const res = await axios.get(`http://10.0.2.2:3001/GestoTecnico`);
      setGestos(res.data);
    } catch (e) {
      console.warn(e);
    }
  };

  uploadExercise = () => {
    console.warn('HELLO');
    console.warn(nome);
    console.warn(descricao);
    console.warn(gesto);
    console.warn(imagem);
  };
  escolherFoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      //cropping: true,
    }).then((image) => {
      console.log(image);
      setImagem(image.path);
    });
  };

  return (
    <View>
      <Text style={{fontSize: 20}}>Vamos adicionar exercicios</Text>
      <Text>Nome: </Text>
      <TextInput onChangeText={setNome} value={nome}></TextInput>
      <Text>Descrição: </Text>
      <TextInput onChangeText={setDescricao} value={descricao}></TextInput>
      <Text>Gesto: </Text>
      <Picker
        selectedValue={gesto}
        onValueChange={(itemValue) => setGesto(itemValue)}
        mode="dropdown">
        {gestos.map((item, index) => {
          return (
            <Picker.Item
              key={index}
              value={item.idGesto}
              label={item.NomeGesto}
            />
          );
        })}
      </Picker>
      <Text>Esquema: </Text>
      <Image source={{uri: imagem}} style={{width: 250, height: 250}} />
      <Button title="Escolher Fotografia" onPress={escolherFoto}></Button>
      <Button title="Confirm" onPress={uploadExercise}></Button>
    </View>
  );
};
