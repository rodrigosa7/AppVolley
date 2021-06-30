import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthInput from '../components/AuthInput';
import {CommonActions} from '@react-navigation/native';
import axios from 'axios';
import backgroundImage from '../../assets/login.jpg';

//import commonStyles from '../commonStyles';





export default (props) => {
  //const [state, setState] = useState(initialState);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [stageNew, setStageNew] = useState(false);

  const signinOrSignup = () => {
    if (stageNew) {
      signup();
    } else {
      signin();
    }
  };

  const signup = async () => {
    /*try {
      await axios.post(`${server}/signup`, {
        name: state.name,
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword,
      });
    } catch (e) {
      showError(e);
    }*/
  };

  signin = async () => {
    // props.navigation.navigate('HomeCoach');

    try {
      const res = await axios.post(
        `http://volleyapi.sarapaiva.webtuga.net/entrar`,
        {
          username: email,
          password: password,
        },
      );
      console.log('DATA', res.data)
      AsyncStorage.setItem('userData', JSON.stringify(res.data));
      //console.log(res.data);
      if (res.data.status) {
        if (res.data.tipo == 1) {
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
        } else {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'HomeParent',
                },
              ],
            }),
          );
        }
      } else {
        console.log('error');
        Alert.alert('Erro', 'Credenciais Erradas', [
          {
            text: 'Confirmar',
            style: 'cancel',
          },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
    /*  */
  };

  const validations = [];
  validations.push(email && email.includes('@'));
  validations.push(password && password.length >= 6);

  const validForm = validations.reduce((t, a) => t && a);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Coach Planning</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>
          {stageNew ? 'Pedir Credenciais' : 'Introduza os dados'}
        </Text>

        <AuthInput
          icon="at"
          placeholder="E-mail"
          value={email}
          style={styles.input}
          onChangeText={(email) => setEmail(email)}
        />
        {!stageNew && (
          <AuthInput
            icon="lock"
            placeholder="Senha"
            value={password}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        )}
        <TouchableOpacity onPress={signinOrSignup} disabled={!validForm}>
          <View
            style={[styles.button, validForm ? {} : {backgroundColor: '#AAA'}]}>
            <Text style={styles.buttonText}>
              {stageNew ? 'Registrar' : 'Entrar'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => setStageNew(!stageNew)}>
        <Text style={styles.buttonText}>
          {stageNew ? 'Já possui conta?' : 'Pedir Credenciais'}
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
    backgroundColor: '#da581e',
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
