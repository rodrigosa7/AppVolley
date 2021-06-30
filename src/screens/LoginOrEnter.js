import {ActivityIndicator, StyleSheet, View} from 'react-native'
import React, {useEffect} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import {CommonActions} from '@react-navigation/native'
import axios from 'axios'

export default (props) => {
  useEffect(async () => {
    const userDataJson = await AsyncStorage.getItem('userData')
    let userData = null

    try {
      userData = JSON.parse(userDataJson)
      console.log(userData)
    } catch (e) {
      // userData está inválido
    }

    if (userData && userData.tipo == 1) {
 
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'HomeCoach',
            },
          ],
        }),
      )
    } else if (userData && userData.tipo == 0) {

      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'HomeParent',
            },
          ],
        }),
      )
    } else {

      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Auth',
            },
          ],
        }),
      )
    }
  })

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
})
