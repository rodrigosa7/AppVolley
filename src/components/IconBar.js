import {Text, TouchableOpacity, View} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import React from 'react'

export default ({nav}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => nav.openDrawer()}
        style={localStyles.container}>
        <Text style={localStyles.text}>Menu</Text>
        <Icon name="bars" size={25} style={localStyles.icon} />
      </TouchableOpacity>
    </View>
  )
}

const localStyles = {
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 15,
    marginBottom: 0,
  },
  text: {
    fontSize: 20,
    marginRight: 10,
  },
  icon: {},
}
