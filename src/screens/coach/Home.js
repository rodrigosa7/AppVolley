import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {FlatList} from 'react-native-gesture-handler';

export default (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View stlye={styles.home}>
        <Text style={{fontSize: 32, marginTop: 20, marginLeft: 10}}>
          Bem-vindo Treinador,
        </Text>
        <Text style={{fontSize: 24, marginLeft: 10}}>Ricardo Lima</Text>
      </View>
      <View style={styles.eventos}>
        <Text style={{fontSize: 20, marginTop: 50, marginLeft: 10}}>
          Próximos Eventos:
        </Text>
        <FlatList></FlatList>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 3,
  },
  eventos: {
    flex: 7,
  },
  container: {
    flex: 1,
  },
});
