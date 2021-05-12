import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {SizedBox} from 'sizedbox';

export default ({props, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <SizedBox vertical={10} />
      <Text
        style={{
          fontSize: 30,
          marginTop: 20,
          marginLeft: 15,
          marginBottom: 15,
        }}>
        {route.params.item.exnome}
      </Text>

      <SizedBox vertical={20} />
      <View style={styles.img}>
        <Image
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={{
            uri:
              'https://sarapaiva.webtuga.net/uploadExercicios/' +
              route.params.item.exurl,
          }}
          style={{width: 250, height: 250}}
        />
      </View>
      <SizedBox vertical={10} />

      <Text style={styles.title}>Descricao do exercicio: </Text>
      <SizedBox horizontal={10} />
      <Text style={styles.text}>{route.params.item.exdescricao}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
  text: {
    marginLeft: 20,
  },
});
