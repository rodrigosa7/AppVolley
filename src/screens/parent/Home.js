import React, {useEffect, useState} from 'react'
import {SafeAreaView, Text, View} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import IconBar from '../../components/IconBar'
import globalStyles from '../../styles'

export default ({navigation}) => {
  const [user, setUser] = useState([])
  useEffect(() => {
    ;(async () => {
      try {
        const userDataJson = await AsyncStorage.getItem('userData')
        let userData = null
        setUser(JSON.parse(userDataJson))
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])
  return (
    <SafeAreaView>
      <IconBar nav={navigation} />
      <View style={globalStyles.content}>
        <Text style={{fontSize: 28}}> Bem-Vindo (a), </Text>
        <Text style={{fontSize: 24, marginLeft: 10}}>{user.nome}</Text>
        <Text style={{fontSize: 20, marginTop: 20}}>
          Nesta aplicação poderá acompanhar o trajeto do seu filho.
        </Text>
        <Text style={{fontSize: 20, marginTop: 20}}>
          Selecione o menu lateral para percorrer a aplicação.
        </Text>
      </View>
    </SafeAreaView>
  )
}
