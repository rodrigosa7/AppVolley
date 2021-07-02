import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useEffect, useState} from 'react'

import Icon from 'react-native-vector-icons/FontAwesome5'
import ImagePicker from 'react-native-image-crop-picker'
import {Picker} from '@react-native-picker/picker'
import Video from 'react-native-video'
import axios from 'axios'
import globalStyles from '../../styles'

const GESTOS = [
  {label: 'Passe', value: 'Passe'},
  {label: 'Remate', value: 'Remate'},
  {label: 'Serviço', value: 'Serviço'},
  {label: 'Bloco', value: 'Bloco'},
]

export default ({route, navigation}, props) => {
  const [gesto, setGesto] = useState('Todos')
  const [exercicio, setExercicio] = useState(0)
  const [exercicios, setExercicios] = useState([])
  const [video, setVideo] = useState(null)
  const [videoSend, setVideoSend] = useState(null)
  const [player, setPlayer] = useState(null)

  const id = route.params.id
  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get(
          `http://volleyapi.sarapaiva.webtuga.net/exercise`,
        )
        console.log('Exerciciso definidos')
        setExercicios(res.data)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  filterExercise = async (tipoGesto) => {
    if (!tipoGesto) return
    try {
      const res = await axios.get(
        `http://volleyapi.sarapaiva.webtuga.net/exercise/${tipoGesto}`,
      )
      setExercicios(res.data)
    } catch (e) {
      console.warn(e)
    }
  }
  escolherFoto = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    })
      .then((video) => {
        setVideo(video)
        setVideoSend(video)
      })
      .catch((err) => {
        setVideo(null)
        //console.log(err);
        Alert.alert('Erro', 'Nenhum Video foi Selecionado', [
          {
            text: 'Confirmar',
            style: 'cancel',
          },
        ])
      })
  }
  uploadVideo = () => {
    var formData = new FormData()
    if (!exercicio || videoSend == null) {
      Alert.alert('Erro', 'Existem campos em branco', [
        {
          text: 'Confirmar',
          style: 'cancel',
        },
      ])
    } else {
      formData.append('exercicio', exercicio)
      formData.append('idAluno', id)

      formData.append('video', {
        name: 'upload',
        type: videoSend.mime,
        uri: videoSend.path,
      })

      axios({
        method: 'post',
        url: 'http://volleyapi.sarapaiva.webtuga.net/uploadVideo',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      }).then(() => {
        navigation.goBack()
      })
    }
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={globalStyles.title}>Upload Vídeo</Text>
        <View style={globalStyles.content}>
          {Platform.OS === 'ios' && (
            <DropdownList
              title="Gesto Técnico"
              items={GESTOS}
              onChange={(item) => {
                console.log(item)
                filterExercise(item)
              }}
            />
          )}
          {Platform.OS === 'android' && (
            <View style={globalStyles.form.group}>
              <Text style={globalStyles.form.label}>Gesto:</Text>
              <View style={globalStyles.form.pickerArea}>
                <Picker
                  selectedValue={gesto}
                  style={globalStyles.form.pickerInput}
                  onValueChange={(itemValue, itemIndex) =>
                    filterExercise(itemValue)
                  }>
                  <Picker.Item label="Passe" value="Passe" />
                  <Picker.Item label="Remate" value="Remate" />
                  <Picker.Item label="Serviço" value="Serviço" />
                  <Picker.Item label="Bloco" value="Bloco" />
                </Picker>
              </View>
            </View>
          )}
          {Platform.OS === 'android' && (
            <View style={globalStyles.form.group}>
              <Text style={globalStyles.form.label}>Exercicio:</Text>
              <View style={globalStyles.form.pickerArea}>
                <Picker
                  selectedValue={exercicio}
                  style={globalStyles.form.pickerInput}
                  onValueChange={(itemValue, itemIndex) =>
                    setExercicio(itemValue)
                  }>
                  {exercicios.map((item) => (
                    <Picker.Item
                      key={item.idExercicio}
                      label={item.exnome}
                      value={item.idExercicio}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          )}
          {video && video.path && (
            <Video
              source={{
                uri: video.path,
              }} // Can be a URL or a local file.
              ref={(ref) => {
                setPlayer(ref)
              }} // Store reference
              onBuffer={(frame) => console.log(frame)} // Callback when remote video is buffering
              onError={(err) => console.log(err)} // Callback when video cannot be loaded
              style={styles.video}
            />
          )}

          <TouchableOpacity
            onPress={escolherFoto}
            style={globalStyles.form.buttonSelect}>
            <Text style={globalStyles.form.buttonSelectText2}>
              Escolher Video
            </Text>
            <Icon style={globalStyles.form.icon2} name="video"></Icon>
          </TouchableOpacity>

          <TouchableOpacity
            style={globalStyles.form.button}
            onPress={uploadVideo}>
            <Text style={globalStyles.form.buttonSelectText}>Adicionar</Text>
            <Icon style={globalStyles.form.formIcon} name="check"></Icon>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  video: {
    display: 'flex',
    alignSelf: 'center',
    width: 300,
    height: 300,
  },
})
