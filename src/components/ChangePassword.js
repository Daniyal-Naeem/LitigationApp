import React, { useState, useContext } from 'react'
import { TouchableOpacity, StyleSheet, View, TextInput,
ScrollView, Dimensions } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import {AuthContext} from '../../navigation/AuthProvider'
import * as Animatable from 'react-native-animatable'
import Header from '../components/Header'
const screenHeight = Dimensions.get('screen').height;
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';

export default function ChangePasswordScreen({ navigation }) {
    
  const [old_password, setOld_password] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [password_confirmation, setPassword_confirmation] = useState({ value: '', error: '' })
 
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const {ChangePassword} = useContext(AuthContext);

  return (
       <View style={styles.container}>
      <View style={styles.header}>
      <BackButton goBack={navigation.goBack} />
        <Text style={styles.text_header}>Change Password</Text>
      </View>
      <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: '#fff'
            }]}
        >
      <ScrollView
        contentContainerStyle={{minHeight: screenHeight}}
        bounces={false}>
          <View>
    <Background>
      <View style={{marginTop:50}}>
      <Logo />
      </View>
      <View style={{marginTop:-50}}>
      <Header>Insert New Password</Header>
      </View>
      
  
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          name="old_password"
          placeholder="Old Password"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="newPassword"
          secureTextEntry={passwordVisibility}
          value={old_password.value}
          enablesReturnKeyAutomatically
          onChangeText={text => setOld_password(text)}
        />
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <Icon name={rightIcon} size={22} color="#232323" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          name="password"
          placeholder="Enter New Password"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="newPassword"
          secureTextEntry={passwordVisibility}
          value={password.value}
          enablesReturnKeyAutomatically
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <Icon name={rightIcon} size={22} color="#232323" />
        </TouchableOpacity>
      </View>
   
    <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          name="password"
          placeholder="Confirm Password"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="newPassword"
          secureTextEntry={passwordVisibility}
          value={password_confirmation.value}
          enablesReturnKeyAutomatically
          onChangeText={text => setPassword_confirmation(text)}
        />
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <Icon name={rightIcon} size={22} color="#232323" />
        </TouchableOpacity>
      </View>

      <Button mode="contained" type="submit"  onPress={() => ChangePassword( {old_password, password, password_confirmation})}>
        Change Password
      </Button>
    </Background>
    </View>
    </ScrollView>
    </Animatable.View>
    </View>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#257A52"
  },
  inputContainer1: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#d7d7d7',
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#d7d7d7',
    marginTop:10, 
    marginBottom: 10
  },
  inputField: {
    padding: 14,
    fontSize: 22,
    width: '90%'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems:'center'
  },
  footer: {
    flex: 3,
    marginTop:-100,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header:{
    fontSize:20,
    fontWeight: 'bold',
    marginBottom:130,
    color:'#fff'
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 11,
},
  forgot: {
    fontSize: 13, color: theme.colors.secondary,
  },
})
