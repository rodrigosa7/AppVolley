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

export default ({props, route}) => {
  return (
    <SafeAreaView>
      <Text>nome do exercicio: {route.params.item.exnome}</Text>
      <Text>descricao do exercicio: {route.params.item.exdescricao}</Text>
      <Image
        source={{
          uri:
            'https://sarapaiva.webtuga.net/uploadExercicios/' +
            route.params.item.exurl,
        }}
        style={{width: 250, height: 250}}
      />
    </SafeAreaView>
  );
};