import React, { useState, useContext } from 'react'
import {
   StyleSheet, View, Dimensions
} from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { AuthContext } from '../../navigation/AuthProvider'
import * as Animatable from 'react-native-animatable'
import Header from '../components/Header'
import TextInputs from '../components/Input';
import ForgotLogo from '../assets/svgs/ForgotLogo'

const screenHeight = Dimensions.get('screen').height;
export default function LoginScreen({ navigation }) {

  const [username, setUsername] = useState({ value: '', error: '' })
 
  
  const { login, isLoading } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton goBack={navigation.goBack} />
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {
          backgroundColor: '#fff'
        }]}
      >
        <View style={{marginTop:-200,alignItems:'center'}}>
        <ForgotLogo
         width="80%"
         height="60%"
        />
        </View>
          <View style={{ marginTop: -150 }}>
            <Header>FORGOT PASSWORD</Header>
           <Text>Don't worry, Reset your password now.</Text>
            <TextInputs
              name="email"
              placeholder="Enter Email"
              autoCapitalize="none"
              autoCorrect={false}
              value={username.value}
              onChangeText={setUsername}
              
            />
          
              <View style={{alignItems:'center'}}>
            <Button mode="contained" type="submit"  onPress={()=>{}}
                isLoading={isLoading} title='RESET'/>
              </View>
              <View style={{alignItems:'center', marginTop:20}}>
              <Text>You will receive Email with, Password reset link</Text>
              </View>
          </View>
       
      </Animatable.View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgColor
  },
 
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center'
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
    
  },

  errorMsg: {
    color: '#FF0000',
    fontSize: 11,
  },
  forgot: {
    fontSize: 13, 
    color: theme.colors.bgColor,
    fontFamily: "Poppins-Light"
  },
})
