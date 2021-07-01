import {StyleSheet, Text, View} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import React from 'react'
import moment from 'moment'

export default (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Icon name="home" />
        <Text style={styles.desc}>
          <Text style={styles.bold}>Local:</Text> {props.local}
        </Text>
      </View>
      <View style={styles.subcontainer}>
        <Icon name="volleyball-ball" />
        <Text style={styles.desc}>
          <Text style={styles.bold}>Tipo: </Text>
          {props.Tipo}
        </Text>
      </View>
      <View style={styles.subcontainer}>
        <Icon name="clock" />
        <Text style={styles.desc}>
          <Text style={styles.bold}>Hora:</Text>{' '}
          {moment.unix(props.ev_inicio).locale('pt').format('DD-MM-YYYY HH:mm')}
        </Text>
      </View>
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
    width: '90%',
    flexDirection: 'column',
  },
  subcontainer: {
    flexDirection: 'row',
    marginLeft: 15,
    alignItems: 'center',
  },
  desc: {
    color: '#000',
    marginLeft: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
})
