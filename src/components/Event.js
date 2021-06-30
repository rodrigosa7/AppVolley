import {StyleSheet, Text, View} from 'react-native'

import React from 'react'
import moment from 'moment'

export default (props) => {
  console.log('pROPPIES', props)
  return (
    <View style={styles.container}>
      <Text style={styles.desc}>Local: {props.local}</Text>
      <Text style={styles.desc}>Tipo: {props.Tipo}</Text>
      <Text style={styles.desc}>
        Hora:
        {moment.unix(props.ev_inicio).locale('pt').format('DD-MM-YYYY HH:mm')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 7,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#da581e',
    display: 'flex',
    width: '90%',
    flexDirection: 'column',
  },
  desc: {
    color: '#000',
  },
})
