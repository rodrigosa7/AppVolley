import 'moment/locale/pt'

import {StyleSheet, Text, View} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import React from 'react'
import globalStyles from '../styles'
import moment from 'moment'

export default (props) => {
  return (
    <View style={globalStyles.content}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{width: 40, alignItems: 'center'}}>
            <Icon style={{marginRight: 5}} name="graduation-cap" size={20} />
          </View>
          <Text style={styles.title}>Nota final: </Text>
          <Text>{props.Score}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{width: 40, alignItems: 'center'}}>
            <Icon style={{marginRight: 5}} name="calendar-alt" size={20} />
          </View>
          <Text style={styles.title}>Data de Avaliação: </Text>
          <Text>{moment.unix(props.date).format('DD/MM/YYYY')}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingLeft: 20,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 7,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#da581e',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  title: {
    fontWeight: 'bold',
  },
  desc: {
    marginLeft: 20,
    color: '#000',
  },
})
