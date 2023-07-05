import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity,Image} from 'react-native';

export default class MainItems extends Component {
  render() {
    return (
      <View style={{alignItems:'center'}}>
      <View>
    <TouchableOpacity style={styles.container} onPress={this.props.navigateTo}>
        <Image style={{width:50,height:50}} source={this.props.imageName}/>
  </TouchableOpacity>
      </View>
  
      <View>
      <Text style={{color:'black', fontWeight: 'bold', fontSize: 15}}>
      {this.props.title}
    </Text>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    elevation: 5,
    margin:10
  },
});