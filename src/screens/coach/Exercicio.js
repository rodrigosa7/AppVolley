import {FlatList, Platform, SafeAreaView, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'

import {DropdownList} from 'react-native-ultimate-modal-picker'
import Exercice from '../../components/Exercice'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconBar from '../../components/IconBar'
import {Picker} from '@react-native-picker/picker'
import {TouchableOpacity} from 'react-native-gesture-handler'
import axios from 'axios'
import globalStyles from '../../styles'
import {useIsFocused} from '@react-navigation/native'

export default ({props, navigation}) => {
  const [gesto, setGesto] = useState('')
  const [exercicios, setExercicios] = useState([])

  const gestos = [
    {label: 'Todos', value: 'Todos'},
    {label: 'Passe', value: 'Passe'},
    {label: 'Remate', value: 'Remate'},
    {label: 'Serviço', value: 'Serviço'},
    {label: 'Bloco', value: 'Bloco'},
  ]

  const isFocused = useIsFocused()

  useEffect(() => {
    isFocused && getExercicios()
  }, [isFocused])

  getExercicios = async () => {
    try {
      const res = await axios.get(
        `http://volleyapi.sarapaiva.webtuga.net/exercise`,
      )
      setExercicios(res.data)
    } catch (e) {
      console.warn(e)
    }
  }

  addExercise = () => {
    navigation.navigate('AddExercise')
  }
  filterExercise = async (tipoGesto) => {
    setGesto(tipoGesto)

    if (tipoGesto == 'Todos') {
      try {
        const res = await axios.get(
          `http://volleyapi.sarapaiva.webtuga.net/exercise`,
        )
        setExercicios(res.data)
      } catch (e) {
        console.warn(e)
      }
    } else {
      try {
        const res = await axios.get(
          `http://volleyapi.sarapaiva.webtuga.net/exercise/${tipoGesto}`,
        )
        setExercicios(res.data)
      } catch (e) {
        console.warn(e)
      }
    }
  }

  return (
    <SafeAreaView>
      <View style={{flexDirection: 'column', height: '100%'}}>
        <IconBar nav={navigation} />
        <Text style={[globalStyles.title, {marginBottom: 10}]}>
          Lista de Exercicíos
        </Text>
        <View style={globalStyles.content}>
          {Platform.OS === 'ios' && (
            <DropdownList
              title="Gesto Técnico"
              items={gestos}
              onChange={(item) => filterExercise(item)}
            />
          )}
          {Platform.OS === 'android' && (
            <>
              <Text style={globalStyles.form.label}>Gesto:</Text>

              <View style={globalStyles.form.pickerArea}>
                <Picker
                  selectedValue={gesto}
                  style={globalStyles.form.pickerInput}
                  onValueChange={(itemValue, itemIndex) =>
                    filterExercise(itemValue)
                  }>
                  <Picker.Item label="Todos" value="Todos" />
                  <Picker.Item label="Passe" value="Passe" />
                  <Picker.Item label="Remate" value="Remate" />
                  <Picker.Item label="Serviço" value="Serviço" />
                  <Picker.Item label="Bloco" value="Bloco" />
                </Picker>
              </View>
            </>
          )}
        </View>
        <FlatList
          style={{marginTop: 10}}
          data={exercicios}
          keyExtractor={(item) => `${item.idExercicio}`}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('InfoExercicio', {item})}>
              <Exercice {...item} />
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity style={{marginBottom: 10}} onPress={addExercise}>
          <View style={globalStyles.form.buttonSelect}>
            <Text style={globalStyles.form.buttonSelectText2}>
              Adicionar Exercicio
            </Text>
            <Icon style={globalStyles.form.icon2} name="volleyball-ball"></Icon>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
