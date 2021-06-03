import 'moment/locale/pt';

import {StyleSheet, Text, View} from 'react-native';

import React from 'react';

export default (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.desc}>{props.Score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 7,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#da581e',
    width: '90%',
  },
  desc: {
    marginLeft: 20,
    color: '#000',
  },
});
