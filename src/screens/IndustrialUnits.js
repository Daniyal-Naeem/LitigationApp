import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  ToastAndroid,
  Image,RefreshControl, ScrollView, 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, FAB, Portal} from 'react-native-paper';
import BackButton from '../components/BackButton';
import * as Animatable from 'react-native-animatable';
import {BASE_URL} from '../config';
import axios from 'axios';
import {AuthContext} from '../../navigation/AuthProvider';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../components/Header';
//import { DatePickerInput } from '../components/MyDatePicker';
const screenHeight = Dimensions.get('screen').height;
import { useIsFocused } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../core/theme'
import LocLogo from '../assets/svgs/withloc';
import NoLocLogo from '../assets/svgs/noloc';
import Dataprovided from '../assets/svgs/dataprovided';
import Datanotprovided from '../assets/svgs/notprovided';

const marginBottomItem = 20;
const paddingItem = 10;
const imgHeight = 100;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const IndustrialUnits = ({navigation}) => {
  const isFocused = useIsFocused();
  const {userInfo} = useContext(AuthContext);
  const [industry, setIndustry] = useState({});
  const [state, setState] = React.useState({open: false});
  const onStateChange = ({open}) => setState({open});
  const {open} = state;

  useEffect(() => {

    AsyncStorage.getItem('userInfos').then(userInfos =>{
      console.log('userInfos', userInfos);
      if(userInfos?.trim() != ''){
        setIndustry(JSON.parse(userInfos))
      }
    }).catch()
   
    isFocused &&  axios
      .get(`${BASE_URL}/industrial-units/industries/dashboard`, {
        headers: {
          Authorization: `Bearer ${userInfo.data.token.token}`,
        },
      })
      .then(res => {
        let userInfos = res.data.data;
        console.log(
          'userInfo',
          userInfos.periodics?.forEach(year => {
            console.log(year);
          }),
          );
          setIndustry(userInfos);
        AsyncStorage.setItem('userInfos', JSON.stringify(userInfos));
      })
      .catch(e => {
        console.log(`Getting List ${e}`);
      });
  }, [isFocused]);

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Under Development!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const yearItem = ({item}) => (
    <View style={{alignItems:'center'}}>
      <Text style={{fontSize:15, fontWeight:'bold', padding:10}}>Periodic Data for the Year:{item.year}</Text>
      <View
        style={{
          height: 150,
          flexDirection: 'row',
        }}>
        <View style={styles.card4}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Data provided', {year:item.year})}>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 25,
                    marginTop: 15,
                  }}>
                  {item.periodics_available}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginTop: 5,
                  }}>
                  Complete{'\n'}Data Provided
                </Text>
              </View>
              <View style={{ marginLeft:5,marginTop: 15}}>
             <Dataprovided/>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.card5}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Data Notprovided', {year:item.year})}>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 25,
                    marginTop: 15,
                  }}>
                  {item.periodics_not_available}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginTop: 5,
                  }}>
                  Periodic Data{'\n'}Not Provided
                </Text>
              </View>
              <View style={{marginRight: 100, marginTop: 15,}}>
              <Datanotprovided/>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView>
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
   <View style={styles.container}>
      <View style={styles.header}>
        <BackButton goBack={navigation.goBack} />
        <Text style={styles.text_header}>Industrial Units</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: '#fff',
          },
        ]}>
        <SafeAreaView style={{flex: 1}}>
          <Portal>
            {/* <FAB
              style={styles.fab}
              large
              icon="plus"
             // onPress={() => navigation.navigate('IndustrialUnits Form')}
              theme={{colors: {accent: '#257A52'}}}
            /> */}

            <FAB.Group
             style={[styles.fab]}
              open={open}
              icon={open ? 'calendar-today' : 'plus'}
              colors = {'#257A52'}
              actions={[
                {
                  icon: 'reply',
                  label: 'Go Back',
                  onPress: () => navigation.goBack(),
                },
                {
                  icon: 'book',
                  label: 'Change Password',
                  onPress: () => navigation.navigate('Change Password'),
                },
                {
                  icon: 'star',
                  label: 'Add New Industrial Unit',
                  onPress: () => navigation.navigate('IndustrialUnits Form'),
                  small: false,
                },
                {
                  icon: 'plus',
                  label: 'Add Industrial Estate Info',
                  onPress: () => navigation.navigate('EstateDetail'),
                  small: false,
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
            />
          </Portal>
          <View style={{alignItems: 'center'}}>
           <View style={{borderWidth:2, borderRadius:50, borderColor:theme.colors.bgColor}}>
            <Text  style={{
                    color: 'black',
                    fontWeight: 'light',
                    fontSize: 15,
                    padding:10
                  }}>Welcome Back</Text>
            </View> 
            <Header>"{userInfo?.data?.user?.title}" </Header>
          </View>
          <TouchableOpacity
            style={styles.card1}
            onPress={() => navigation.navigate('Industries List')}>
            <View style={{marginLeft: 20, flexDirection: 'row'}}>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 35,
                    marginTop: 15,
                  }}>
                  {industry?.total}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginTop: 10,
                  }}>
                  Total Industrial Profiles
                </Text>
              </View>
              <View style={{marginLeft: 10,}}>
                <Image
                  style={{width: 100, height: 100}}
                  source={require('../assets/indd.png')}
                />
              </View>
            </View>
          </TouchableOpacity>
          <View
        style={{
          height: 150,
          flexDirection: 'row',
          marginTop:20
        }}>
        <View style={styles.card2}>
          <TouchableOpacity
           //</View> onPress={() => navigation.navigate('Data provided', {year:item.year})}
           >
            <View style={{flexDirection: 'row'}}>
              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 25,
                    marginTop: 10,
                  }}>
                 {industry?.global_address_available}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginTop: 10,
                  }}>
                  Location{'\n'}Data Provided
                </Text>
              </View>
              <View style={{ marginTop: 15, marginLeft:5}}>
              <LocLogo/>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.card3}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DataNotLoc')}
           >
            <View style={{flexDirection: 'row'}}>
              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 25,
                    marginTop: 10,
                  }}>
                  {industry?.global_address_not_available}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginTop: 10,
                  }}>
                  Location Data{'\n'}Not Provided
                </Text>
              </View>
              <View style={{marginRight: 0, marginTop: 15,}}>
              <NoLocLogo/>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
          <FlatList data={industry?.periodics} renderItem={yearItem} />
        </SafeAreaView>
      </Animatable.View>
    </View>
    </ScrollView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgColor,
  },
  card1: {
    height: 115,
    width: '100%',
    borderRadius: 10,
    backgroundColor: theme.colors.bgColor,
    elevation: 12,
  },
  card2: {
    height: 115,
    width: '47%',
    borderRadius: 10,
    backgroundColor: "#8477FF",
    elevation: 12,
    marginRight: 10,
  },
  card3: {
    height: 115,
    width: '47%',
    borderRadius: 10,
    backgroundColor: '#1BB3CD',
    elevation: 12,
    marginLeft: 10,
  },
  card4: {
    height: 115,
    width: '47%',
    borderRadius: 10,
    backgroundColor: '#0EBE7F',
    elevation: 12,
    marginRight: 10,
  },
  card5: {
    height: 115,
    width: '47%',
    borderRadius: 10,
    backgroundColor: '#F14955',
    elevation: 12,
    marginLeft: 10,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 0,
    alignItems: 'center',
  },
  text_header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 130,
    marginTop:50,
    color: '#fff',
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    color:'#257A52'
  },
  footer: {
    flex: 3,
    marginTop: -100,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  wrapText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#96e3b0',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 52,
  },
});

export default IndustrialUnits;
