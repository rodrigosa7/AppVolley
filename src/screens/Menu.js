import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

export default (props) => {
  const logout = () => {
    AsyncStorage.removeItem('userData');
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Auth',
          },
        ],
      }),
    );
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
        <DrawerItemList {...props} />
      </SafeAreaView>
      <View>
        <TouchableOpacity
          onPress={logout}
          style={{marginBottom: 40, alignItems: 'center'}}>
          <View style={styles.logoutIcon}>
            <Text style={{marginTop: 7, marginRight: 20}}>Sair</Text>
            <Icon name="sign-out" size={30} color="#800" />
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  title: {
    color: '#000',
    fontSize: 30,
    paddingTop: Platform.OS === 'ios' ? 70 : 30,
    padding: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  logoutIcon: {
    marginLeft: 10,
    flexDirection: 'row',
    marginTop: 'auto',
  },
});
