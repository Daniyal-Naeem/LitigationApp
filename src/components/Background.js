import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, StatusBar } from 'react-native'
import { theme } from '../core/theme'

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar 
        backgroundColor={"#fff"} 
        barStyle={"dark-content"} 
        translucent={true}/>
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:150
  },
})
