import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';

import { DropdownList } from 'react-native-ultimate-modal-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

export default ({props, route, navigation}) => {
  const [descricao, setDescricao] = useState('');
  const [nome, setNome] = useState('');
  const [gesto, setGesto] = useState('');
  const [imagem, setImagem] = useState(null);
  const [imagemsend, setImagemSend] = useState(null);

  const gestos = [
    {label: 'Passe', value: 'Passe'},
    {label: 'Remate', value: 'Remate'},
    {label: 'Serviço', value: 'Serviço'},
    {label: 'Bloco', value: 'Bloco'},
  ];

  uploadExercise = () => {
    var formData = new FormData();
    if (!descricao || !gesto || !nome || imagemsend == null) {
      Alert.alert('Erro', 'Existem campos em branco', [
        {
          text: 'Confirmar',
          style: 'cancel',
        },
      ]);
    } else {
      formData.append('nome', nome);
      formData.append('desc', descricao);
      formData.append('gesto', gesto);

      formData.append('foto', {
        name: 'upload',
        type: imagemsend.mime,
        uri: Platform.OS === 'android' ? imagemsend.path : imagemsend.path,
      });

      axios({
        method: 'post',
        url: 'http://volleyapi.sarapaiva.webtuga.net/exercise',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      }).then(() => {
        navigation.goBack();
      });
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
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.title1}>Criar exercicios</Text>
      <Text style={[styles.text, {marginLeft: 15, marginBottom: 10}]}>
        Nome:{''}
      </Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={'Nome'}
          onChangeText={setNome}
          value={nome}></TextInput>
      </View>
      <Text style={[styles.text, {marginLeft: 15, marginBottom: 10}]}>
        Descrição:{''}
      </Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={'Descrição'}
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
        {imagem != null && (
          <View style={styles.img}>
            <Image source={{uri: imagem}} style={{width: 250, height: 250}} />
          </View>
        )}
      </View>
      <View style={styles.fim}>
        <TouchableOpacity onPress={escolherFoto}>
          <View style={styles.buttonImage}>
            <Text style={styles.texto}>Escolher Imagem</Text>
            <Icon style={styles.icone} name="image"></Icon>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.fim}>
        <TouchableOpacity style={styles.botoes} onPress={uploadExercise}>
          <View style={styles.button}>
            <Text style={styles.texto}>Adicionar</Text>
            <Icon style={styles.icone} name="check"></Icon>
          </View>
        </TouchableOpacity>
      </View>
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
  botoes: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    width: '40%',
    borderRadius: 7,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    backgroundColor: '#da581e',
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 7,
    alignSelf: 'center',
    alignItems: 'center',
  },
  fim: {
    flex: 1,
  },
  icone: {
    marginLeft: 10,
  },
});
