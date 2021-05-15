import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import {
  DropdownList,
  PickerDate,
  PickerDateTime,
} from 'react-native-ultimate-modal-picker';

export default ({props, route, navigation}) => {
  const [descricao, setDescricao] = useState('');
  const [nome, setNome] = useState('');
  const [gesto, setGesto] = useState('');
  const [imagem, setImagem] = useState('https://reactjs.org/logo-og.png');
  const [imagemsend, setImagemSend] = useState(null);

  const gestos = [
    {label: 'Passe', value: 'Passe'},
    {label: 'Remate', value: 'Remate'},
    {label: 'Serviço', value: 'Serviço'},
    {label: 'Bloco', value: 'Bloco'},
  ];

  uploadExercise = () => {
    var formData = new FormData();

    formData.append('nome', nome);
    formData.append('desc', descricao);
    formData.append('gesto', gesto);

    formData.append('foto', {
      name: 'upload',
      type: imagemsend.mime,
      uri: Platform.OS === 'android' ? imagemsend.path : imagemsend.path,
    });
    console.log(imagemsend.path.replace('file://', ''));

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
      <Text style={styles.title1}>Criar exercicios</Text>
      <Text style={[styles.text, {marginLeft: 15, marginBottom: 10}]}>
        Nome:{' '}
      </Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={setNome}
          value={nome}></TextInput>
      </View>
      <Text style={[styles.text, {marginLeft: 15, marginBottom: 10}]}>
        Descrição:{' '}
      </Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={setDescricao}
          value={descricao}></TextInput>
      </View>

      <DropdownList
        title="Gesto Técnico"
        items={gestos}
        onChange={(item) => setGesto(item)}
      />

      <View>
        <Text style={[styles.text, {marginLeft: 15, marginBottom: 10}]}>
          Imagem do Esquema
        </Text>

        <View style={styles.img}>
          <Image source={{uri: imagem}} style={{width: 250, height: 250}} />
        </View>
      </View>
      <Button title="Escolher Media" onPress={escolherFoto}></Button>
      <Button title="Confirm" onPress={uploadExercise}></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    marginBottom: 10,
  },
  input: {
    height: 40,
    marginLeft: 20,
    width: '50%',
  },
  title1: {
    fontWeight: 'bold',
    color: '#ff6600',
    fontSize: 30,
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 15,
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#333',
    fontSize: 18,
  },
});
