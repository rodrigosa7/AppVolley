import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useEffect, useState} from 'react'

import VideoPlayer from 'react-native-video-player'
import globalStyles from '../../styles'
import {server} from '../../common'

export default ({navigator, route, navigation}) => {
  useEffect(() => {
    ;(async () => {})()
  }, [])

  console.log(`${server}/${route.params.url}`)
  return (
    <SafeAreaView>
      <Text style={globalStyles.title}>Video</Text>
      <View style={globalStyles.content}>
        <VideoPlayer
          style={styles.video}
          video={{
            uri: `https://sarapaiva.webtuga.net/uploadExercicios/${route.params.url}`,
          }}
          autoplay={true}
          disableFullscreen={false}
          fullScreenOnLongPress={true}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  video: {},
})
