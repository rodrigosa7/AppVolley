import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useState} from 'react'

import {DropdownList} from 'react-native-ultimate-modal-picker'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ImagePicker from 'react-native-image-crop-picker'
import {Picker} from '@react-native-picker/picker'
import axios from 'axios'
import globalStyles from '../../styles'

export default ({props, route, navigation}) => {
  const [descricao, setDescricao] = useState('')
  const [nome, setNome] = useState('')
  const [gesto, setGesto] = useState('Escolher o Gesto')
  const [imagem, setImagem] = useState(null)
  const [imagemsend, setImagemSend] = useState(null)

  const gestos = [
    {label: 'Passe', value: 'Passe'},
    {label: 'Remate', value: 'Remate'},
    {label: 'Serviço', value: 'Serviço'},
    {label: 'Bloco', value: 'Bloco'},
  ]

  uploadExercise = () => {
    var formData = new FormData()
    if (!descricao || !gesto || !nome || imagemsend == null) {
      Alert.alert('Erro', 'Existem campos em branco', [
        {
          text: 'Confirmar',
          style: 'cancel',
        },
      ])
    } else {
      formData.append('nome', nome)
      formData.append('desc', descricao)
      formData.append('gesto', gesto)

      formData.append('foto', {
        name: 'upload',
        type: imagemsend.mime,
        uri: Platform.OS === 'android' ? imagemsend.path : imagemsend.path,
      })

      axios({
        method: 'post',
        url: 'http://volleyapi.sarapaiva.webtuga.net/exercise',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      }).then(() => {
        navigation.goBack()
      })
    }
  }
  escolherFoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      //cropping: true,
    })
      .then((image) => {
        setImagem(image.path)
        setImagemSend(image)
      })
      .catch((err) => {
        setImagem(null)
        //console.log(err);
        Alert.alert('Erro', 'Nenhuma Imagem Selecionada', [
          {
            text: 'Confirmar',
            style: 'cancel',
          },
        ])
      })
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Text style={globalStyles.title}>Criar exercicios</Text>
        <View style={globalStyles.content}>
          <View style={globalStyles.form.group}>
            <Text style={globalStyles.form.label}>Nome:{''}</Text>

            <TextInput
              style={globalStyles.form.textInput}
              placeholder={'Nome'}
              onChangeText={setNome}
              value={nome}></TextInput>
          </View>
          <View style={globalStyles.form.group}>
            <Text style={globalStyles.form.label}>Descrição:{''}</Text>
            <TextInput
              style={globalStyles.form.textInput}
              placeholder={'Descrição'}
              onChangeText={setDescricao}
              value={descricao}></TextInput>
          </View>

          {Platform.OS === 'ios' && (
            <DropdownList
              title="Gesto Técnico"
              items={gestos}
              onChange={(item) => {
                console.log(item)
                setGesto(item)
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
                  onValueChange={(itemValue, itemIndex) => setGesto(itemValue)}>
                  <Picker.Item label="Passe" value="Passe" />
                  <Picker.Item label="Remate" value="Remate" />
                  <Picker.Item label="Serviço" value="Serviço" />
                  <Picker.Item label="Bloco" value="Bloco" />
                </Picker>
              </View>
            </View>
          )}

          <View style={globalStyles.form.group}>
            <Text style={globalStyles.form.label}>Imagem do Esquema:</Text>
            {imagem != null && (
              <View style={styles.img}>
                <Image
                  source={{uri: imagem}}
                  style={{width: 250, height: 250}}
                />
              </View>
            )}
          </View>
          <View style={globalStyles.form.group}>
            <TouchableOpacity
              onPress={escolherFoto}
              style={globalStyles.form.buttonSelect}>
              <Text style={globalStyles.form.buttonSelectText2}>
                Escolher Imagem
              </Text>
              <Icon style={globalStyles.form.icon2} name="image"></Icon>
            </TouchableOpacity>
          </View>
          <View style={globalStyles.form.group}>
            <TouchableOpacity
              style={globalStyles.form.button}
              onPress={uploadExercise}>
              <Text style={globalStyles.form.buttonText}>Adicionar</Text>
              <Icon style={globalStyles.form.formIcon} name="check"></Icon>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  img: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
