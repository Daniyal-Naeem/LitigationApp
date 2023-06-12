import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  Dimensions,
  ToastAndroid,
  FlatList,
} from 'react-native';
import MainItems from '../components/MainItems';
import * as Animatable from 'react-native-animatable';
import Header from '../components/Header';
const screenHeight = Dimensions.get('screen').height;
import Button from '../components/Button'

import {AuthContext} from '../../navigation/AuthProvider';
import { theme } from '../core/theme';

const allowedServices = [1,3];
const Services = [
  {
    id: 1,
    title: 'Court Cases',
    imageName: require('../assets/frame.png'),
    navigateTo: 'Industrial Units',
  },
  {
    id: 2,
    title: 'SIE',
    imageName: require('../assets/consumer.png'),
    navigateTo: 'Consumer Screen',
  },
  {
    id: 3,
    title: 'Our Team',
    imageName: require('../assets/team.png'),
    navigateTo: 'OurTeam',
  },
  {
    id: 4,
    title: 'Ghee & Sugar Rates',
    imageName: require('../assets/stats.png'),
    navigateTo: 'ghee&sugar',
  },
  {
    id: 5,
    title: 'Industrial 2',
    imageName: require('../assets/Boiler.png'),
    navigateTo: undefined,
  },
];

const MainScreen = ({navigation}) => {
  const {logout, isLoading} = useContext(AuthContext);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    setListData(
      Services.filter(
        s => allowedServices.findIndex(i => parseInt(i) == s.id) > -1,
      ),
    );
  }, []);

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Under Development!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <Text style={styles.text_header}>Home</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: '#fff',
            width: '100%',
          },
        ]}>
          <Header>Choose your module</Header>
          <Text>Select Industrial Unit for adding/updating industries.</Text>
        <View style={{marginLeft: 25, marginTop:30}}>
          <FlatList
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
            data={listData}
            numColumns={1}
            keyExtractor={item => `item-${item.id}`}
            renderItem={({item}) => (
              <MainItems
                title={item.title}
                imageName={item.imageName}
                navigateTo={() =>
                  item.navigateTo
                    ? navigation.navigate(item.navigateTo)
                    : showToastWithGravityAndOffset()
                }
              />
            )}
          />
        </View>
        {isLoading ? (
          <ActivityIndicator color={'#2cce63'} animating={true} size="large" />
        ) : (
   
        <View style={{alignItems:'center', marginTop:30}}>
            <Button mode="contained" type="submit"  onPress={() => logout()} 
                isLoading={isLoading} title='Logout'/>
              </View>
        )}
      </Animatable.View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    alignItems:'center'
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: -100,
  },
  text_header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop:30
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  fab: {
    position:'absolute',
    right: 30,
    bottom: 30,
  },
  fabText:{
    position:'absolute',
    right: 30,
    bottom: 90,
    color:'#ff3b44',
    fontWeight:"bold",

  }
});
