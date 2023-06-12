import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from '../src/screens/MainScreen';
import IndustrialUnits from '../src/screens/IndustrialUnits';
import ChangePasswordScreen from '../src/components/ChangePassword';


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator()


 const HomeNavigation = ({navigation}) => {

  return (
    <Stack.Navigator
    screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="Main Screen" component={MainScreen} />
      <Stack.Screen name="Industrial Units" component={IndustrialUnits} />
      <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
    </Stack.Navigator>

  )
}
export default HomeNavigation;