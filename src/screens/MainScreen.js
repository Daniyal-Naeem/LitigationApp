import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  Dimensions,
  ToastAndroid,
  FlatList,
  StatusBar,
  ScrollView
} from 'react-native';
import MainItems from '../components/MainItems';
import * as Animatable from 'react-native-animatable';
const screenHeight = Dimensions.get('screen').height;
import Button from '../components/Button'
import { AuthContext } from '../../navigation/AuthProvider';
import { theme } from '../core/theme';
import Usercard from '../components/usercard'
const allowedServices = [1, 2, 3, 4, 5, 6, 7,8,9];
const Services = [
  {
    id: 1,
    title: 'Court Cases',
    imageName: require('../assets/cases.png'),
    navigateTo: 'Industrial Units',
  },
  {
    id: 2,
    title: 'Dashboard',
    imageName: require('../assets/dashboard.png'),
    navigateTo: 'Consumer Screen',
  },
  {
    id: 3,
    title: 'Reports',
    imageName: require('../assets/report.png'),
    navigateTo: 'OurTeam',
  },
  {
    id: 4,
    title: 'Calendar',
    imageName: require('../assets/calendar.png'),
    navigateTo: 'ghee&sugar',
  },
  {
    id: 5,
    title: 'Comments',
    imageName: require('../assets/comment.png'),
    navigateTo: undefined,
  },
  {
    id: 6,
    title: 'All Cases',
    imageName: require('../assets/current.png'),
    navigateTo: undefined,
  },
  {
    id: 7,
    title: 'Calendar',
    imageName: require('../assets/calendar.png'),
    navigateTo: 'ghee&sugar',
  },
  {
    id: 8,
    title: 'Comments',
    imageName: require('../assets/comment.png'),
    navigateTo: undefined,
  },
  {
    id: 9,
    title: 'All Cases',
    imageName: require('../assets/current.png'),
    navigateTo: undefined,
  },
];

const MainScreen = ({ navigation }) => {
  const { logout, isLoading } = useContext(AuthContext);
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
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent
      />
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
        <View style={{ alignItems: 'center' }}>
          <View>
         <Usercard/>
          </View>
        </View>
        <ScrollView>
        <View style={{ marginLeft: 10, marginTop: 30 }}>
          <FlatList
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            data={listData}
            numColumns={3}
            keyExtractor={item => `item-${item.id}`}
            renderItem={({ item }) => (

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

          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <Button mode="contained" type="submit" onPress={() => logout()}
              isLoading={isLoading} title='Logout' />
          </View>
        )}
        </ScrollView>
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
    alignItems: 'center'
  },
  footer: {
    flex: 3,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: -100,
  },
  text_header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 30
  },
  cardcontainer: {
    height: 120,
    width: 350,
    backgroundColor: theme.colors.bgColor,
    borderRadius: 15,
    elevation: 5,
  },
});
