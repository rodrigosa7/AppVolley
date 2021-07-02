import 'moment/locale/pt'

import {StyleSheet, Text, View} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import React from 'react'
import globalStyles from '../styles'

export default (props) => {
  return (
    <View style={globalStyles.content}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon style={{marginRight: 5}} name="user-alt" />
          <Text style={styles.title}>Nome: </Text>
          <Text>{props.NameAtl}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon style={{marginRight: 5}} name="users" />
          <Text style={styles.title}>Equipa: </Text>
          <Text>{props.NameT}</Text>
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
