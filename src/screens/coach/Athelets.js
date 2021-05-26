import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Atleta from './../../components/Atleta';
import axios from 'axios';
import {server} from '../../common';
//import server from '../../common';
import {useIsFocused} from '@react-navigation/native';

export default () => {
  const [atletas, setAtletas] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && getAtletas();
  }, [isFocused]);

  const getAtletas = async () => {
    console.log(`${server}/atleta`);
    try {
      const res = await axios.get(`${server}/atleta`);
      setAtletas(res.data);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Atletas</Text>
      <View style={styles.lista}>
        <FlatList
          data={atletas}
          keyExtractor={(item) => `${item.idAthlete}`}
          renderItem={({item}) => (
            <TouchableOpacity
            /*onPress={() => navigation.navigate('InfoExercicio', {item})}*/
            >
              <Atleta {...item} />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: '#da581e',
    margin: 10,
    fontWeight: 'bold',
  },
});
