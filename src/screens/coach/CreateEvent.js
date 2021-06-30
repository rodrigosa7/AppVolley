import 'moment/locale/pt'

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useEffect, useState} from 'react'

import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import {Picker} from '@react-native-picker/picker'
import axios from 'axios'
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
    <View>
      <Text style={styles.title}>Criar um evento</Text>
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
        <>
          <Text style={[styles.text, {marginLeft: 15}]}>Evento:</Text>
          <Picker
            selectedValue={evento}
            style={{height: 50, width: 150}}
            mode="dropdown"
            onValueChange={(itemValue) => setEvento(itemValue)}>
            <Picker.Item label="Jogo" value="Jogo" />
            <Picker.Item label="Treino" value="Treino" />
            <Picker.Item label="Treino Individual" value="Treino Individual" />
          </Picker>
        </>
      )}
      <View>
        <Text>Data: {formatDate(date)}</Text>
        <Button onPress={showDatePicker} title="Data"></Button>
        <Text>Ínicio: {formatHour(timeStart)}</Text>
        <Button onPress={showTimeStartPicker} title="Hora de Inicio" />
        <Text>Fim: {formatHour(timeEnd)}</Text>
        <Button onPress={showTimeEndPicker} title="Hora de Fim" />
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

      <Text>Turma</Text>
      {Platform.OS === 'android' && (
        <Picker
          selectedValue={turma}
          onValueChange={(itemValue) => setTurma(itemValue)}
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
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={'Local'}
          onChangeText={setLocal}
          value={local}></TextInput>
      </View>
      <Button onPress={createEvent} title="Guardar" />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 30,
  },
  container: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    marginBottom: 10,
  },
  input: {
    height: 40,
    marginLeft: 20,
    width: '50%',
  },
})
