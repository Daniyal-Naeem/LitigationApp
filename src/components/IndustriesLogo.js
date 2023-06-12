import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function IndusLogo() {
  return <Image source={require('../assets/Industriescommerce.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 130,
    height: 130,
    marginTop:-20,
    marginLeft:0,
  },
})
