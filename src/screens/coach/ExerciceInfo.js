import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';

export default ({props, route}) => {
  return (
    <View>
      <Text>nome do exercicio: {route.params.item.exdescricao}</Text>
    </View>
  );
};
