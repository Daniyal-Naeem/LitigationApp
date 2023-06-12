import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function ForgotLogo() {
  return <Image source={require('../assets/forgot.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 230,
    height: 230,
    marginTop:-180,
    marginLeft:0,
  },
})
