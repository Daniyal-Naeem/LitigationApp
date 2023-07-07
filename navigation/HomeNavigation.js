import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from '../src/screens/MainScreen';
import CourtCases from '../src/screens/CourtCases';
import ChangePasswordScreen from '../src/components/ChangePassword';
import CasesList from '../src/screens/CasesList' 
import CaseDescription from '../src/screens/CaseDescription'


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator()


 const HomeNavigation = ({navigation}) => {

  return (
    <Stack.Navigator
    screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="Main Screen" component={MainScreen} />
      <Stack.Screen name="Court Cases" component={CourtCases} />
      <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
      <Stack.Screen name="Cases List" component={CasesList} />
      <Stack.Screen name="Cases Desc" component={CaseDescription} />
    </Stack.Navigator>

  )
}
export default HomeNavigation;