import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function MobileLogo() {
  return <Image source={require('../assets/mobile.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    marginTop:-180,
    
  },
})
