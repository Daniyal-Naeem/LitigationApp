import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity,Image} from 'react-native';
import { theme } from '../core/theme';
export default class Usercard extends Component {
  render() {
    return (
      <View >
      <View>
    <TouchableOpacity style={styles.container} onPress={this.props.navigateTo}>
        <Image style={{width:50,height:50}} source={this.props.imageName}/>
        <Text style={{color:'#fff', fontWeight: 'bold', fontSize: 15}}>
      Username
    </Text>
  </TouchableOpacity>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 350,
    backgroundColor: theme.colors.bgColor,
    flexDirection:'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    elevation: 5,
  },
});