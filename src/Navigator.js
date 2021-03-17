import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {create, createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Auth from './screens/Auth';
import Home from './screens/coach/Home';
import CreateEvent from './screens/coach/CreateEvent';

//import AuthOrApp from './screens/AuthOrApp';
// import Menu from './screens/Menu';
// import commonStyles from './commonStyles';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Criar Evento" component={CreateEvent} />
      <Drawer.Screen name="Presenças" component={CreateEvent} />

      {/* <Drawer.Screen name="Presenças" component={Presencas}/>
          <Drawer.Screen name="CheckList" component={Checklist}/> */}
    </Drawer.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="AuthOrApp" component={AuthOrApp} /> */}
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="HomeCoach" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
