import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  ToastAndroid,
  Image, RefreshControl, ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, FAB, Portal } from 'react-native-paper';
import BackButton from '../components/BackButton';
import * as Animatable from 'react-native-animatable';
import { BASE_URL } from '../config';
import axios from 'axios';
import { AuthContext } from '../../navigation/AuthProvider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from "@react-navigation/native";
import { theme } from '../core/theme'

const marginBottomItem = 20;
const paddingItem = 10;
const imgHeight = 100;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const CourtCases = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { userInfo } = useContext(AuthContext);
  const [industry, setIndustry] = useState({});
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  useEffect(() => {

    AsyncStorage.getItem('userInfos').then(userInfos => {
      if (userInfos?.trim() != '') {
        setIndustry(JSON.parse(userInfos))
      }
    }).catch()

    isFocused && axios
      .get(`${BASE_URL}/litigation/`, {
        headers: {
          Authorization: `Bearer ${userInfo.data.token.token}`,
        },
      })
      .then(res => {
        let userInfos = res.data.data;
        console.log("lit",userInfos);
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
            <Text style={styles.text_header}>All Court Cases</Text>
          </View>
          <Animatable.View
            animation="fadeInUpBig"
            style={[
              styles.footer,
              {
                backgroundColor: '#fff',
              },
            ]}>
            <SafeAreaView style={{ flex: 1 }}>
              <Portal>

                <FAB.Group
                  style={[styles.fab]}
                  open={open}
                  icon={open ? 'calendar-today' : 'plus'}
                  colors={'#257A52'}
                  actions={[
                    {
                      icon: 'reply',
                      label: 'Go Back',
                      onPress: () => navigation.goBack(),
                    },
                    {
                      icon: 'star',
                      label: 'Add New Court Case',
                      onPress: () => navigation.navigate('IndustrialUnits Form'),
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
              <TouchableOpacity
                style={styles.card1}
                onPress={() => navigation.navigate('Cases List')}>
                <View style={{ alignItems: 'center' }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 20,
                      marginTop: 10,
                    }}>
                    Total Court Cases
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 25,
                      marginTop: 10,
                    }}>
                    {industry?.total_cases}
                  </Text>
                </View>

              </TouchableOpacity>
              <View
                style={{
                  height: 150,
                  flexDirection: 'row',
                  marginTop: 20
                }}>
                <View style={styles.card2}>
                  <TouchableOpacity
                  //</View> onPress={() => navigation.navigate('Data provided', {year:item.year})}
                  >
                    <View style={{ alignItems: 'center' }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 20,
                          marginTop: 10,
                        }}>
                        COC
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 25,
                          marginTop: 10,
                        }}>
                        {industry?.coc}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 15,
                          marginTop: 8,
                        }}>
                        Contempt of Court
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.card3}>
                  <TouchableOpacity
                    // onPress={() => navigation.navigate('DataNotLoc')}
                  >
                    <View style={{ alignItems: 'center' }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 20,
                          marginTop: 10,
                        }}>
                        SOC
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 25,
                          marginTop: 10,
                        }}>
                        {industry?.stay_order}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 15,
                          marginTop: 8,
                        }}>
                        Stay Order
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  height: 150,
                  flexDirection: 'row',
                  marginTop: 20
                }}>
                <View style={styles.card2}>
                  <TouchableOpacity
                  //</View> onPress={() => navigation.navigate('Data provided', {year:item.year})}
                  >
                    <View style={{ alignItems: 'center' }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 20,
                          marginTop: 10,
                        }}>
                        CPLA
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 25,
                          marginTop: 10,
                        }}>
                        {industry?.cpla}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 15,
                          marginTop: 8,
                        }}>
                        Civil Petition
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.card3}>
                  <TouchableOpacity
                    // onPress={() => navigation.navigate('DataNotLoc')}
                  >
                    <View style={{ alignItems: 'center' }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 20,
                          marginTop: 10,
                        }}>
                        OTHER Cases
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 25,
                          marginTop: 10,
                        }}>
                        {industry?.other}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 15,
                          marginTop: 8,
                        }}>
                        All Order Cases
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {/* <FlatList data={industry?.periodics} renderItem={yearItem} /> */}
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
    width: '47%',
    borderRadius: 10,
    backgroundColor: theme.colors.bgColor,
    elevation: 12,
    marginRight: 10,
    alignItems: 'center'
  },
  card2: {
    height: 115,
    width: '47%',
    borderRadius: 10,
    backgroundColor: theme.colors.bgColor,
    elevation: 12,
    marginRight: 10,
    alignItems: 'center'
  },
  card3: {
    height: 115,
    width: '47%',
    borderRadius: 10,
    backgroundColor: theme.colors.bgColor,
    elevation: 12,
    marginLeft: 10,
    alignItems: 'center'
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
    marginTop: 50,
    color: '#fff',
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    color: '#257A52'
  },
  footer: {
    flex: 3,
    marginTop: -100,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
 
});

export default CourtCases;
