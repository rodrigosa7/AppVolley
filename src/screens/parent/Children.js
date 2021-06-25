import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Atleta from '../../components/Atleta'
import axios from 'axios'

export default ({}) => {
  const [filhos, setFilhos] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const userDataJson = await AsyncStorage.getItem('userData')
        let userData = null
        userData = JSON.parse(userDataJson)
        console.log(userData)

        const req = await axios.get(
          `http://volleyapi.sarapaiva.webtuga.net/atleta/${userData.id}`,
        )

        setFilhos(req.data)
        console.log(req.data)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  return (
    <View>
      <Text>OLA</Text>
      <View style={styles.lista}>
        <FlatList
          data={filhos}
          keyExtractor={(item) => `${item.idAthlete}`}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => {}}>
              <Atleta {...item} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: '#da581e',
    margin: 10,
    fontWeight: 'bold',
  },
})
