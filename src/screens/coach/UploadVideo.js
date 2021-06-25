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
import {useIsFocused} from '@react-navigation/native'

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
        <Text style={styles.title}>Upload Vídeo</Text>
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
          <>
            <Text style={[styles.text, {marginLeft: 15}]}>Gesto:</Text>
            <Picker
              selectedValue={gesto}
              style={{height: 50, width: 150}}
              onValueChange={(itemValue, itemIndex) =>
                filterExercise(itemValue)
              }>
              <Picker.Item label="Passe" value="Passe" />
              <Picker.Item label="Remate" value="Remate" />
              <Picker.Item label="Serviço" value="Serviço" />
              <Picker.Item label="Bloco" value="Bloco" />
            </Picker>
          </>
        )}
        {Platform.OS === 'android' && (
          <>
            <Text style={[styles.text, {marginLeft: 15}]}>Exercicio:</Text>
            <Picker
              selectedValue={exercicio}
              style={{height: 50, width: 150}}
              onValueChange={(itemValue, itemIndex) => setExercicio(itemValue)}>
              {exercicios.map((item) => (
                <Picker.Item
                  key={item.idExercicio}
                  label={item.exnome}
                  value={item.idExercicio}
                />
              ))}
            </Picker>
          </>
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
        <View style={styles.fim}>
          <TouchableOpacity onPress={escolherFoto}>
            <View style={styles.buttonImage}>
              <Text style={styles.texto}>Escolher Video</Text>
              <Icon style={styles.icone} name="video"></Icon>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.fim}>
          <TouchableOpacity style={styles.botoes} onPress={uploadVideo}>
            <View style={styles.button}>
              <Text style={styles.texto}>Adicionar</Text>
              <Icon style={styles.icone} name="check"></Icon>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#333',
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    color: '#da581e',
    margin: 10,
    fontWeight: 'bold',
  },

  icone: {
    marginLeft: 10,
  },
  buttonImage: {
    backgroundColor: '#da581e',
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 7,
    alignSelf: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    width: '40%',
    borderRadius: 7,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  video: {
    display: 'flex',
    alignSelf: 'center',
    width: 300,
    height: 300,
  },
})
