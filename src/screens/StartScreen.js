import React from 'react'
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native'
import Background from '../components/Background'
import * as Animatable from 'react-native-animatable';
import ImauLogo from '../assets/svgs/ImauLogo'


export default function StartScreen({ navigation }) {
  setTimeout(() => {
    navigation.navigate('LoginScreen'); //this.props.navigation.navigate('Login')
}, 3000);
  return (
   <Background>
  <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent
      />
      <Animatable.View 
            animation="fadeInDown"
            
            style={styles.header}
        >
        <View style={{marginTop:-200}}>
        <Image
        style={styles.image}
        source={require('../assets/lawsign.png')}
      />
        </View>
        <View style={styles.heading}>
        <Text style={styles.text_header1}>We welcome you to</Text>
        <Text style={styles.text_header}>COURT CASES MIS APP</Text>
        <Text style={styles.text_header2}>Please feel free to share all your </Text>
        <Text style={styles.text_header2}>concerns and suggestions. </Text>
      </View>
      <View style={styles.heading1}>
        <Text style={styles.text_header1}>Let us know how</Text>
        <Text style={styles.text_header2}>can we better serve you.</Text>
        <Text style={styles.text_header2}>We will do our best to facilitate you.</Text>
      </View>
      </Animatable.View>
      <Animatable.View 
            animation="fadeInUp"
            style={styles.header}
        >
       <View style={{marginTop:-30}}>
       <ImauLogo/>
        </View>
        <View style={styles.heading2}>
        <Text style={{color:'black'}}>Industries, Commerce & Technical</Text>
        <Text style={{color:'black'}}>Education Department</Text>
        <Text style={{color:'green'}}>Government of Khyber Pakhtunkhwa</Text>
      </View>
      </Animatable.View>
  

   </Background>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#06AB8D"
  },
  header: {
    flex: 1,
    alignItems:'center',
    marginTop:130
  
  },
 heading:{
  justifyContent: 'center',
  alignItems: 'center',
  marginTop:30
 },
 heading1:{
  justifyContent: 'center',
  alignItems: 'center',
  marginTop:60
 },
 heading2:{
  justifyContent: 'center',
  alignItems: 'center',
 },
  text_header: {
    marginTop:10,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  text_header1: {
    fontSize: 15,
    color: '#fff',
  },
  text_header2: {
    fontSize: 15,
    color: '#fff',
  },
  image: {
    marginTop:16,
    marginLeft:15,
    width: 160,
    height: 180,
  },
});