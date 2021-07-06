import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native'

import React from 'react'
import globalStyles from '../../styles'

export default ({props, route}) => {
  return (
    <SafeAreaView>
      <View style={{height: '100%'}}>
        <Text style={globalStyles.title}>{route.params.item.exnome}</Text>
        <View style={globalStyles.content}>
          <Image
            source={{
              uri:
                'https://sarapaiva.webtuga.net/uploadExercicios/' +
                route.params.item.exurl,
            }}
            style={{
              height: 300,
              width: 300,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />

          <Text style={styles.title2}>Descricao do exercicio: </Text>

          <Text style={styles.text}>{route.params.item.exdescricao}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title2: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff6600',
    lineHeight: 36,
  },
  text: {
    color: '#333',
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
  },
})
