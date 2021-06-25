import {
  HeaderBackButton,
  HeaderTitle,
  createStackNavigator,
} from '@react-navigation/stack'
import {
  NavigationContainer,
  NavigationHelpersContext,
} from '@react-navigation/native'
import {create, createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import AddAvaliacao from './screens/coach/AddAvaliacao'
import AddExercise from './screens/coach/AddExercise'
import Atletas from './screens/coach/Athelets'
import Auth from './screens/Auth'
import Children from './screens/parent/Children'
import CreateEvent from './screens/coach/CreateEvent'
import ExerciceInfo from './screens/coach/ExerciceInfo'
import Exercicio from './screens/coach/Exercicio'
import Home from './screens/coach/Home'
import HomeParent from './screens/parent/Home'
import InfoAthelets from './screens/coach/InfoAthelets'
import LoginOrEnter from './screens/LoginOrEnter'
import Menu from './screens/Menu'
import React from 'react'
import UploadVideo from './screens/coach/UploadVideo'
import {createDrawerNavigator} from '@react-navigation/drawer'

//import AuthOrApp from './screens/AuthOrApp';
// import Menu from './screens/Menu';
// import commonStyles from './commonStyles';

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <Menu {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Criar Evento" component={CreateEvent} />
      <Drawer.Screen name="Exercicio" component={Exercicio} />
      <Drawer.Screen name="Atletas" component={Atletas} />
      {/* <Drawer.Screen
        name="ExercicioInfo"
        component={ExerciceInfo}
        options={{drawerLabel: () => null, title: null, drawerIcon: null}}
      />
 */}
      {/* <Drawer.Screen name="Presenças" component={Presencas}/>
          <Drawer.Screen name="CheckList" component={Checklist}/> */}
    </Drawer.Navigator>
  )
}
const DrawerNavigatorParent = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <Menu {...props} />}>
      <Drawer.Screen name="Home" component={HomeParent} />
      <Drawer.Screen name="Filhos" component={Children} />
    </Drawer.Navigator>
  )
}

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AuthOrApp" component={LoginOrEnter} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="HomeCoach" component={DrawerNavigator} />
      <Stack.Screen name="HomeParent" component={DrawerNavigatorParent} />
      <Stack.Screen
        name="InfoExercicio"
        component={ExerciceInfo}
        options={{
          headerShown: true,
          headerTitle: null,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="InfoAthelets"
        component={InfoAthelets}
        options={{
          headerShown: true,
          headerTitle: null,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="AddAvaliacao"
        component={AddAvaliacao}
        options={{
          headerShown: true,
          headerTitle: null,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen name="AddExercise" component={AddExercise} />
      <Stack.Screen
        name="UploadVideo"
        component={UploadVideo}
        options={{
          headerShown: true,
          headerTitle: null,
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  )
}

const Navigator = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  )
}

export default Navigator
