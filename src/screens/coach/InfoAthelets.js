import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Avaliacao from '../../components/Avaliacao';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {server} from '../../common';
import {useIsFocused} from '@react-navigation/native';

export default ({route, navigation}) => {
  const [avaliacao, setAvaliacao] = useState([]);

  const isFocused = useIsFocused();
  const id = route.params.item.idAthlete;
  useEffect(() => {
    isFocused && getAvaliacao();
  }, [isFocused]);

  const getAvaliacao = async () => {
    try {
      const res = await axios.get(`${server}/avaliacao/${id}`);
      setAvaliacao(res.data);
    } catch (e) {
      console.warn(e);
    }
  };
  const addAvaliacao = () => {
    navigation.navigate('AddAvaliacao', {id});
  };
  const addVideo = () => {
    navigation.navigate('UploadVideo');
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Lista de Avaliações</Text>
      <View style={styles.lista}>
        <FlatList
          data={avaliacao}
          keyExtractor={(item) => `${item.idAthlete_Evaluation}`}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('InfoExercicio', {item})}>
              <Avaliacao {...item} />
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.fim}>
        <TouchableOpacity onPress={addAvaliacao}>
          <View style={styles.button}>
            <Text style={[styles.texto, {marginBottom: 5}]}>
              Nova Avaliação
            </Text>
            <Icon name="calendar-check"></Icon>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={addVideo}>
          <View style={[styles.button, {marginLeft: 5}]}>
            <Text style={[styles.texto, {marginBottom: 5}]}>Upload Vídeo</Text>
            <Icon name="video"></Icon>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lista: {
    //flex: 2,
    height: '69%',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#da581e',
    margin: 10,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#da581e',
    marginTop: 10,
    padding: 10,
    width: 120,
    borderRadius: 7,
    //width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  fim: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
