import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useEffect, useState} from 'react'

import Atleta from './../../components/Atleta'
import IconBar from '../../components/IconBar'
import axios from 'axios'
import globalStyles from '../../styles'
import {server} from '../../common'
import {useIsFocused} from '@react-navigation/native'

export default ({navigation}) => {
  const [atletas, setAtletas] = useState([])

  const isFocused = useIsFocused()

  useEffect(() => {
    isFocused && getAtletas()
  }, [isFocused])

  const getAtletas = async () => {
    try {
      const res = await axios.get(`${server}/atleta`)
      setAtletas(res.data)
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <SafeAreaView>
      <IconBar nav={navigation} />
      <Text style={globalStyles.title}>Atletas</Text>
      <View style={{height: '100%', flexDirection: 'column'}}>
        <View style={globalStyles.content}>
          <FlatList
            data={atletas}
            keyExtractor={(item) => `${item.idAthlete}`}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('InfoAthelets', {item})}>
                <Atleta {...item} />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
