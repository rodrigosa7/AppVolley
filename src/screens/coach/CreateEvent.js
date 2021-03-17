import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import 'moment/locale/pt';

export default (props) => {
  const [evento, setEvento] = useState('');
  const [turma, setTurma] = useState('');

  const [date, setDate] = useState(new Date());
  const [dateEnd, setEndDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setEndDate(currentDate);
  };
  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || dateEnd;
    setShowEnd(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showModeEnd = (currentMode) => {
    setShowEnd(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const showTimepickerEnd = () => {
    showModeEnd('time');
  };

  const createEvent = () => {
    console.warn('Olá mundo');
  };

  const formatDate = (date) => {
    const teste = moment(date).format('L');
    return <Text>{teste}</Text>;
  };
  const formatHour = (date) => {
    const hora = moment(date).locale('pt').format('LT');
    return <Text>{hora}</Text>;
  };
  return (
    <View>
      <Text style={styles.title}>Criar um evento</Text>
      <Text>Evento</Text>
      <Picker
        selectedValue={evento}
        onValueChange={(itemValue) => setEvento(itemValue)}
        mode="dropdown">
        <Picker.Item label="Treino" value="treino" />
        <Picker.Item label="Treino Individual" value="treino_individual" />
        <Picker.Item label="Jogo" value="jogo" />
      </Picker>
      <View>
        <Text>Data: {formatDate(date)}</Text>
        <Button onPress={showDatepicker} title="Data"></Button>
        <Text>Ínicio: {formatHour(date)}</Text>
        <Button onPress={showTimepicker} title="Hora de Inicio" />
        <Text>Fim: {formatHour(dateEnd)}</Text>
        <Button onPress={showTimepickerEnd} title="Hora de Fim" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      {showEnd && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeEnd}
        />
      )}

      <Text>Turma</Text>
      <Picker
        selectedValue={turma}
        onValueChange={(itemValue) => setTurma(itemValue)}
        mode="dropdown">
        <Picker.Item label="A" value="a" />
        <Picker.Item label="B" value="b" />
        <Picker.Item label="C" value="c" />
      </Picker>
      <Button onPress={createEvent} title="Guardar" />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 30,
  },
});
