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
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import globalStyles from '../../styles'
import {server} from '../../common'
import {useIsFocused} from '@react-navigation/native'

export default ({route, navigation}) => {
  const [avaliacao, setAvaliacao] = useState([])

  const isFocused = useIsFocused()
  const id = route.params.item.idAthlete
  useEffect(() => {
    isFocused && getAvaliacao()
  }, [isFocused])

  const getAvaliacao = async () => {
    try {
      const res = await axios.get(`${server}/avaliacao/${id}`)
      setAvaliacao(res.data)
    } catch (e) {
      console.warn(e)
    }
  }
  const addAvaliacao = () => {
    navigation.navigate('AddAvaliacao', {id})
  }
  const addVideo = () => {
    navigation.navigate('UploadVideo', {id})
  }

  return (
    <SafeAreaView>
      <View style={{flexDirection: 'column', height: '100%'}}>
        <Text style={globalStyles.title}>Lista de Avaliações</Text>
        <View style={globalStyles.content}>
          {avaliacao.length <= 0 ? (
            <Text>Não existem avaliações para este atleta </Text>
          ) : (
            <FlatList
              data={avaliacao}
              keyExtractor={(item) => `${item.idAthlete_Evaluation}`}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('InfoExercicio', {item})}>
                  <Avaliacao {...item} />
                </TouchableOpacity>
              )}
            />
          )}
          <View>
            <TouchableOpacity
              onPress={addAvaliacao}
              style={globalStyles.form.buttonSelect}>
              <Text style={globalStyles.form.buttonSelectText2}>
                Nova Avaliação
              </Text>
              <Icon
                name="calendar-check"
                style={globalStyles.form.icon2}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={addVideo}
              style={globalStyles.form.buttonSelect}>
              <Text style={globalStyles.form.buttonSelectText2}>
                Upload Vídeo
              </Text>
              <Icon name="video" style={globalStyles.form.icon2}></Icon>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  lista: {
    //flex: 2,
    height: '69%',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#da581e',
    margin: 10,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#da581e',
    marginTop: 10,
    padding: 10,
    width: 120,
    borderRadius: 7,
    //width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
  },
})
