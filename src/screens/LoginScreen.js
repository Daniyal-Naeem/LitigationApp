import React, { useState, useContext } from 'react'
import {
  TouchableOpacity, StyleSheet, View, Dimensions
} from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { AuthContext } from '../../navigation/AuthProvider'
import * as Animatable from 'react-native-animatable'
import Header from '../components/Header'
import TextInputs from '../components/Input';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import MobileLogo from '../assets/svgs/mobileLogin'
import Law from '../assets/svgs/law'

const screenHeight = Dimensions.get('screen').height;
export default function LoginScreen({ navigation }) {

  const [username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const { login, isLoading } = useContext(AuthContext);

  return (
    <View style={styles.container}>
       <View style={{position: 'absolute'}}>
          <Law />
        </View>
      <View style={styles.header}>
        <BackButton goBack={navigation.goBack} />
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {
          backgroundColor: '#fff'
        }]}
      >
        <View style={{ marginTop: -200, alignItems: 'center' }}>
          <MobileLogo
            width="80%"
            height="60%"
          />
        </View>
        <View style={{ marginTop: -150 }}>
          <Header>Sign In</Header>
          <Text>Welcome to Court Cases App.
          </Text>
          <TextInputs
            name="username"
            placeholder="Enter Username"
            autoCapitalize="none"
            autoCorrect={false}
            value={username.value}
            onChangeText={setUsername}

          />
          <TextInputs
            name="Password"
            placeholder="Enter Password"
            autoCapitalize="none"
            autoCorrect={false}
            value={password.value}
            onChangeText={setPassword}
            showRightIcon={true}

          />
          <View style={styles.forgotPassword}>
            <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
              <Text style={styles.forgot}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Button mode="contained" type="submit" onPress={() => login(username, password)}
              isLoading={isLoading} title='Login' />
          </View>
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>Note: Login details has been provided by IMAU.</Text>
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
