import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

import backgroundImage from '../../assets/login.jpg';
//import commonStyles from '../commonStyles';
import AuthInput from '../components/AuthInput';

import {server, showError, showSuccess} from '../common';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  stageNew: false,
};

export default (props) => {
  const [state, setState] = useState(initialState);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const signinOrSignup = () => {
    if (state.stageNew) {
      signup();
    } else {
      signin();
    }
  };

  const signup = async () => {
    try {
      await axios.post(`${server}/signup`, {
        name: state.name,
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword,
      });

      showSuccess('Usuário cadastro!');
      setState({...initialState});
    } catch (e) {
      showError(e);
    }
  };

  const signin = () => {
    // props.navigation.navigate('HomeCoach');
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'HomeCoach',
          },
        ],
      }),
    );
  };

  const validations = [];
  validations.push(state.email && state.email.includes('@'));
  validations.push(state.password && state.password.length >= 6);

  if (state.stageNew) {
    validations.push(state.name && state.name.trim().length >= 3);
    validations.push(state.password === state.confirmPassword);
  }

  const validForm = validations.reduce((t, a) => t && a);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Coach Planning</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>
          {state.stageNew ? 'Pedir Credenciais' : 'Introduza os dados'}
        </Text>

        <AuthInput
          icon="at"
          placeholder="E-mail"
          value={email}
          style={styles.input}
          onChangeText={(email) => setEmail(email)}
        />
        {!state.stageNew && (
          <AuthInput
            icon="lock"
            placeholder="Senha"
            value={password}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        )}
        <TouchableOpacity onPress={signinOrSignup}>
          {/* disabled={!validForm}>  */}
          <View
            style={[styles.button, validForm ? {} : {backgroundColor: '#AAA'}]}>
            <Text style={styles.buttonText}>
              {state.stageNew ? 'Registrar' : 'Entrar'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => setState({stageNew: !state.stageNew})}>
        <Text style={styles.buttonText}>
          {state.stageNew ? 'Já possui conta?' : 'Pedir Credenciais'}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
    //fontFamily: commonStyles.fontFamily,
    //color: commonStyles.colors.secondary,
    fontSize: 40,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    //fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    width: '90%',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    width: '90%',
    justifyContent: 'flex-end',
  },
  input: {
    marginTop: 10,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 7,
  },
  buttonText: {
    //fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
  },
});
