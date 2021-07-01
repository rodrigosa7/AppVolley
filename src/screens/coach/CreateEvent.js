import 'moment/locale/pt'

import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useEffect, useState} from 'react'

import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {Picker} from '@react-native-picker/picker'
import axios from 'axios'
import globalStyles from '../../styles'
import moment from 'moment'
import {server} from '../../common'

export default (props) => {
  const [turmas, setTurmas] = useState([])

  const [evento, setEvento] = useState('')
  const [turma, setTurma] = useState('')

  const [date, setDate] = useState(new Date())
  const [timeStart, setTimeStart] = useState(new Date())
  const [timeEnd, setTimeEnd] = useState(new Date())

  const [modeDate, setModeDate] = useState('date')
  const [modeTimeStart, setModeTimeStart] = useState('time')
  const [modeTimeEnd, setModeTimeEnd] = useState('time')

  const [showDate, setShowDate] = useState(false)
  const [showTimeStart, setShowTimeStart] = useState(false)
  const [showTimeEnd, setShowTimeEnd] = useState(false)

  const [local, setLocal] = useState('')

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShowDate(Platform.OS === 'ios')
    setDate(currentDate)
  }

  const onChangeTimeStart = (event, selectedDate) => {
    const currentDate = selectedDate || timeStart
    setShowTimeStart(Platform.OS === 'ios')
    setTimeStart(currentDate)
  }

  const onChangeTimeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || timeEnd
    setShowTimeEnd(Platform.OS === 'ios')
    setTimeEnd(currentDate)
  }

  const showDateMode = (currentMode) => {
    setShowDate(true)
    setModeDate(currentMode)
  }

  const showTimeStartMode = (currentMode) => {
    setShowTimeStart(true)
    setModeTimeStart(currentMode)
  }

  const showTimeEndMode = (currentMode) => {
    setShowTimeEnd(true)
    setModeTimeEnd(currentMode)
  }

  const showDatePicker = () => {
    showDateMode('date')
  }

  const showTimeStartPicker = () => {
    showTimeStartMode('time')
  }

  const showTimeEndPicker = () => {
    showTimeEndMode('time')
  }

  useEffect(() => {
    ;(async () => {
      try {
        const req = await axios.get(`${server}/team`)
        setTurmas(req.data)
      } catch (e) {
        console.warn(e)
      }
    })()
  }, [])

  const createEvent = async () => {
    const formattedDate = moment(date).format('L')
    const formattedStartTime = moment(timeStart).format('HH:mm')
    const formattedEndTime = moment(timeEnd).format('HH:mm')

    const unixStartTime = moment(
      `${formattedDate} ${formattedStartTime}`,
      'DD-MM-YYYY HH:mm',
    )
      .locale('pt')
      .unix()

    const unixEndTime = moment(
      `${formattedDate} ${formattedEndTime}`,
      'DD-MM-YYYY HH:mm',
    )
      .locale('pt')
      .unix()

    console.log(formattedDate, formattedStartTime)

    const req = await axios.post(`${server}/createEvent`, {
      ev_inicio: unixStartTime,
      ev_fim: unixEndTime,
      idteam: turma,
      local: local,
      tipo: evento,
    })
  }

  const formatDate = (date) => {
    const teste = moment(date).format('L')
    return <Text>{teste}</Text>
  }
  const formatHour = (date) => {
    const hora = moment(date).locale('pt').format('LT')
    return <Text>{hora}</Text>
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={globalStyles.header}>
          <Text style={globalStyles.title}>Criar um evento</Text>
        </View>

        <View style={globalStyles.content}>
          <View style={globalStyles.form.group}>
            {Platform.OS === 'ios' && (
              <DropdownList
                title="Evento"
                items={[
                  {label: 'Jogo', value: 'Jogo'},
                  {label: 'Treino', value: 'Treino'},
                  {label: 'Treino Individual', value: 'Treino Individual'},
                ]}
                onChange={(item) => {
                  console.log(item)
                  setEvento(item)
                }}
              />
            )}
            {Platform.OS === 'android' && (
              <>
                <Text style={globalStyles.form.label}>Evento:</Text>
                <View style={globalStyles.form.pickerArea}>
                  <Picker
                    selectedValue={evento}
                    style={globalStyles.form.pickerInput}
                    mode="dropdown"
                    onValueChange={(itemValue) => setEvento(itemValue)}>
                    <Picker.Item label="Jogo" value="Jogo" />
                    <Picker.Item label="Treino" value="Treino" />
                    <Picker.Item
                      label="Treino Individual"
                      value="Treino Individual"
                    />
                  </Picker>
                </View>
              </>
            )}
          </View>

          <View style={globalStyles.form.group2}>
            <Text style={globalStyles.form.label}>Data:</Text>
            <View style={localStyles.sublabelview}>
              <Text style={localStyles.sublabel}>{formatDate(date)}</Text>
            </View>

            <TouchableOpacity
              style={globalStyles.form.buttonSelect}
              onPress={showDatePicker}>
              <Text style={globalStyles.form.buttonSelectText}>
                Escolher Data
              </Text>
              <Icon style={globalStyles.form.icon} name="calendar-alt"></Icon>
            </TouchableOpacity>
          </View>

          <View style={globalStyles.form.group2}>
            <Text style={globalStyles.form.label}>Ínicio:</Text>

            <View style={localStyles.sublabelview}>
              <Text style={localStyles.sublabel}>{formatHour(timeStart)}</Text>
            </View>

            <TouchableOpacity
              style={globalStyles.form.buttonSelect}
              onPress={showTimeStartPicker}>
              <Text style={globalStyles.form.buttonSelectText}>
                Escolher Hora de Inicio
              </Text>
              <Icon style={globalStyles.form.icon} name="clock"></Icon>
            </TouchableOpacity>
          </View>

          <View style={globalStyles.form.group2}>
            <Text style={globalStyles.form.label}>Fim:</Text>
            <View style={localStyles.sublabelview}>
              <Text style={localStyles.sublabel}>{formatHour(timeEnd)}</Text>
            </View>

            <TouchableOpacity
              style={globalStyles.form.buttonSelect}
              onPress={showTimeEndPicker}>
              <Text style={globalStyles.form.buttonSelectText}>
                Escolher Hora de Fim
              </Text>
              <Icon style={globalStyles.form.icon} name="clock"></Icon>
            </TouchableOpacity>
          </View>

          {showDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={modeDate}
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}

          {showTimeStart && (
            <DateTimePicker
              testID="dateTimePicker"
              value={timeStart}
              mode={modeTimeStart}
              is24Hour={true}
              display="default"
              onChange={onChangeTimeStart}
            />
          )}
          {showTimeEnd && (
            <DateTimePicker
              testID="dateTimePicker"
              value={timeEnd}
              mode={modeTimeEnd}
              is24Hour={true}
              display="default"
              onChange={onChangeTimeEnd}
            />
          )}
          <View style={globalStyles.form.group}>
            <Text style={globalStyles.form.label}>Turma: </Text>

            <View style={globalStyles.form.pickerArea}>
              {Platform.OS === 'android' && (
                <Picker
                  selectedValue={turma}
                  onValueChange={(itemValue) => setTurma(itemValue)}
                  style={globalStyles.form.pickerInput}
                  mode="dropdown">
                  {turmas.map((turma) => (
                    <Picker.Item
                      key={turma.idTeam}
                      label={turma.NameT}
                      value={turma.idTeam}
                    />
                  ))}
                </Picker>
              )}
              {Platform.OS === 'ios' && (
                <DropdownList
                  title="Gesto"
                  items={turmas.map((turma) => ({
                    label: turma.NameT,
                    value: turma.idTeam,
                  }))}
                  onChange={(item) => {
                    console.log(item)
                    setGesto(item)
                  }}
                />
              )}
            </View>
          </View>

          <View style={globalStyles.form.group}>
            <Text style={globalStyles.form.label}>Local: </Text>
            <TextInput
              style={globalStyles.form.textInput}
              placeholder="Local"
              onChangeText={setLocal}
              value={local}
            />
          </View>

          <TouchableOpacity
            style={globalStyles.form.button}
            onPress={createEvent}>
            <Text style={globalStyles.form.buttonText}>Guardar</Text>
            <Icon style={globalStyles.form.formIcon} name="check"></Icon>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const localStyles = {
  sublabelview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sublabel: {
    marginLeft: 15,
    fontWeight: 'normal',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
}
