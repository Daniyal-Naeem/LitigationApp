import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity,Image} from 'react-native';
import { theme } from '../core/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
const COLORS = {primary: '#1f145c', white: '#fff'};

export default class MainItems extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.navigateTo} backgroundColor={this.props.borderColor}>
         <View style={{flexDirection:'row', justifyContent:'space-between'}}>
         <View
            style={{
              height: 60,
              width: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              backgroundColor: theme.colors.bgColor, 
              elevation:2  
            }}>
            <Image style={{width:200,height:200, marginTop:20}} source={this.props.imageName}/>
          </View>
          <View style={{marginTop:20}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
            {this.props.title}
          </Text>
          </View>
          <Image style={{width:15,height:15, marginTop:20}} source={require('../assets/arrow.png')}/>
         </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 82,
    width: "90%",
    borderRadius:10,
    backgroundColor: '#E9FBF3',
    padding:10,
    justifyContent: 'flex-start',
    marginHorizontal: 5,
    shadowColor:"#257A52",
    elevation:5
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
});