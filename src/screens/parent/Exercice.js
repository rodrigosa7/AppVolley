import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useEffect, useState} from 'react'

import Avaliacao from '../../components/Avaliacao'
import Exercicio from '../../components/Exercice'
import Video from 'react-native-video'
import VideoPlayer from 'react-native-video-player'
import axios from 'axios'
import {server} from '../../common'

export default ({navigator, route, navigation}) => {
  useEffect(() => {
    ;(async () => {})()
  }, [])

  console.log(`${server}/${route.params.url}`)
  return (
    <SafeAreaView>
      <Text>Video</Text>

      <VideoPlayer
        style={styles.video}
        video={{
          uri: `https://sarapaiva.webtuga.net/uploadExercicios/${route.params.url}`,
        }}
        autoplay={true}
        disableFullscreen={false}
        fullScreenOnLongPress={true}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  video: {},
})
