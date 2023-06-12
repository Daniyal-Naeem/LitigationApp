import React, {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import Colors from "../constants/Colors"
import {
  StartScreen,
  LoginScreen,
  ResetPasswordScreen,
} from '../src/screens'

const Stack = createStackNavigator()

const AuthNavigation = ({navigation}) => {


  return (
    
<Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: Colors.light.tint,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTintColor: Colors.light.background,
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
        </Stack.Navigator>
  )
}
export default AuthNavigation;