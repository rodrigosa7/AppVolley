import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default (props) => {
  const data = [
    {
      title: 'Lunch Appointment',
      subtitle: 'With Harry',
      start: new Date(2021, 2, 3, 13, 20),
      end: new Date(2021, 2, 3, 14, 20),
      color: 'red',
    },
  ];
  return (
    <View>
      <Text style={styles.titulo}>Hórario</Text>
      <Calendar></Calendar>
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center',
  },
});
