import React from 'react'
import { StyleSheet,ActivityIndicator, Text } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'

const Button = ({ isLoading,mode, style,  title, onPress, ...props }) => {
  
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'contained' && { backgroundColor: theme.colors.bgColor },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
      title={title} 
      onPress={onPress}>
   {isLoading ? (
        <ActivityIndicator color={'#fff'} size="large" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
        </PaperButton>
  )
}
export default Button;

const styles = StyleSheet.create({
  button: {
    width: '50%',
    marginVertical: 10,
    paddingVertical: 2,
    borderRadius:3,
    shadowColor:"#257A52",
    shadowOpacity:10
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    color:'#fff'
  },
})
