import React, {useEffect, useState} from 'react'
import {SafeAreaView, StyleSheet, Text, View} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Event from '../../components/Event'
import {FlatList} from 'react-native-gesture-handler'
import IconBar from '../../components/IconBar'
import axios from 'axios'
import globalStyles from '../../styles'
import {server} from '../../common'
import {useIsFocused} from '@react-navigation/native'

export default ({navigation}) => {
  const [user, setUser] = useState([])
  const [events, setEvents] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    isFocused &&
      (async () => {
        try {
          const userDataJson = await AsyncStorage.getItem('userData')
          let userData = null
          setUser(JSON.parse(userDataJson))

          const recentEvents = await axios.get(`${server}/getRecentEvent`)
          setEvents(recentEvents.data)
        } catch (e) {
          console.log(e)
        }
      })()
  }, [isFocused])
  return (
    <SafeAreaView>
      <IconBar nav={navigation} />
      <View style={globalStyles.content}>
        <View>
          <Text style={styles.title}>Bem-vindo Treinador,</Text>
          <Text style={{fontSize: 24, marginLeft: 10}}>{user.nome}</Text>
        </View>
        <View style={styles.eventos}>
          <Text style={styles.events}>Próximos Eventos:</Text>
          {events.length <= 0 ? (
            <Text style={styles.eventsnull}>
              Não existem eventos brevemente{' '}
            </Text>
          ) : (
            <FlatList
              data={events}
              keyExtractor={(event) => `${event.idevents}`}
              renderItem={({item}) => <Event {...item} />}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    marginTop: 20,
    marginLeft: 10,
  },
  events: {fontSize: 20, marginLeft: 10, marginTop: 30, marginBottom: 15},
  eventsnull: {
    fontSize: 15,
    marginLeft: 15,
    marginTop: 10,
  },
})
