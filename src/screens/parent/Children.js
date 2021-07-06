import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useEffect, useState} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Atleta from '../../components/Atleta'
import IconBar from '../../components/IconBar'
import axios from 'axios'
import globalStyles from '../../styles'

export default ({navigation}) => {
  const [filhos, setFilhos] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const userDataJson = await AsyncStorage.getItem('userData')
        let userData = null
        userData = JSON.parse(userDataJson)

        const req = await axios.get(
          `http://volleyapi.sarapaiva.webtuga.net/atleta/${userData.id}`,
        )

        setFilhos(req.data)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  return (
    <SafeAreaView>
      <IconBar nav={navigation} />
      <Text style={globalStyles.title}>Educandos</Text>
      <View globalStyles={globalStyles.content}>
        <FlatList
          data={filhos}
          keyExtractor={(item) => `${item.idAthlete}`}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('InfoChild', {item})}>
              <Atleta {...item} />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
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
