import {Agenda, Calendar, CalendarList} from 'react-native-calendars'
import React, {useEffect, useState} from 'react'
import {SafeAreaView, StyleSheet, Text, View} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Event from '../../components/Event'
import {FlatList} from 'react-native-gesture-handler'
import axios from 'axios'
import {server} from '../../common'

export default (props) => {
  const [user, setUser] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const userDataJson = await AsyncStorage.getItem('userData')
        let userData = null
        setUser(JSON.parse(userDataJson))

        const recentEvents = await axios.get(`${server}/getRecentEvent`)
        setEvents(recentEvents.data)
        console.log(recentEvents.data)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <View stlye={styles.home}>
        <Text style={{fontSize: 32, marginTop: 20, marginLeft: 10}}>
          Bem-vindo Treinador,
        </Text>
        <Text style={{fontSize: 24, marginLeft: 10}}>{user.nome}</Text>
      </View>
      <View style={styles.eventos}>
        <Text style={{fontSize: 20, marginTop: 50, marginLeft: 10}}>
          Próximos Eventos:
        </Text>
        <FlatList
          data={events}
          keyExtractor={(event) => `${event.idevents}`}
          renderItem={({item}) => <Event {...item} />}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  home: {
    flex: 3,
  },
  eventos: {
    flex: 7,
  },
  container: {
    flex: 1,
  },
})
