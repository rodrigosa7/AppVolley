import {FlatList, View} from 'react-native'
import {useEffect, useState} from 'react'

export default () => {
  const [child, setChild] = useState(null)

  useEffect(() => {
    ;(async () => {})()
  }, [])
  return (
    <View>
      <Text>AVALIACAO</Text>
      <FlatList></FlatList>
      <Text>EXERCICIOS</Text>
    </View>
  )
}
