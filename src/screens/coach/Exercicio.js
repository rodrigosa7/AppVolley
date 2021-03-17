import React, {useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default (props) => {
  const [gesto, setGesto] = useState('');
  
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={gesto}
        onValueChange={(itemValue) => setGesto(itemValue)}
        mode="dropdown">
        <Picker.Item label="Passe" value="passe" />
        <Picker.Item label="Remate" value="remate" />
        <Picker.Item label="Serviço" value="servico" />
      </Picker>
      <View style={styles.lista}>
        <Text style={{fontSize: 20, marginTop: 20, marginLeft: 15}}>
          Lista de Exercicios
        </Text>
        <FlatList></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
