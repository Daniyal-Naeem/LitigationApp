import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const COLORS = { primary: '#1f145c', white: '#fff' };
import { BASE_URL } from '../config';
import axios from 'axios';
import { AuthContext } from '../../navigation/AuthProvider';
import { Searchbar } from 'react-native-paper';
import { theme } from '../core/theme';
import GreenView from '../assets/svgs/greenView';

const CasesList = ({ navigation }) => {

  const [industriesList, setIndustriesList] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { userInfo } = React.useContext(AuthContext);
  const [current_page, setCurrent_page] = useState(1);

  useEffect(() => getData(), []);

  const getData = () => {
    AsyncStorage.getItem('list').then(list => {
      console.log('list', list);
      if (list?.trim() != '') {
        setIndustriesList(JSON.parse(list))
      }
    }).catch()
    setLoading(true);
    axios
      .get(`${BASE_URL}/litigation/cases?page=` + current_page, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.data.token.token}`,
        },
      })
      .then(res => {
        let list = res.data.data.data;
        console.log('cases', list)
        setIndustriesList(list);
        setFilterdata(list)
        setCurrent_page(current_page + 1);
        // setSearchList(list);
        AsyncStorage.setItem('list', JSON.stringify(list));
        setLoading(false);
      })
      .catch(e => {
        console.log(`Getting List ${e}`);
      });
  };


  const searchFilter = (text) => {
    const newData = filterdata.filter(item => {
      const itemData = item.case_name ? item.case_name.toUpperCase() : ''.toLowerCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });

    setIndustriesList(newData)
    setSearch(text)
  }


  const ListItem = ({ item }) => {
    return (

      <TouchableOpacity
        style={{ padding: 5 }}
        onPress={() =>
          navigation.navigate('Cases Desc', { id: item.case_number })
        }>
        {/* {item.periodics_available === null && ( */}

          <View style={styles.listItem}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Image
                  style={styles.image}
                  source={require('../assets/listLogo.png')}
                />
              </View>
              <View style={{ margin: 8, flex: 1, marginLeft: 10 }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                    color: '#263238',
                    marginBottom: 10,
                  }}>
                  Case Title: {item.case_name}  {'\n'}Case No: {item.case_number}  {'\n'}Hearing: {item.hearing_date}
                </Text>
                <View style={{ marginLeft: 180 }}>
                  <GreenView />
                </View>
              </View>
            </View>
          </View>

        {/* )} */}
       
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.btnfooter}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getData}
          //On Click of button calling getData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Next Record</Text>
          {loading ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View>
        <View style={{ alignItems: 'center', backgroundColor: theme.colors.bgColor, }}>
          <Text style={{ fontSize: 20, padding: 5, color: '#fff', fontWeight: 'bold', marginTop: 15 }}>Cases List</Text>
          <Searchbar
            style={styles.Searchbar}
            value={search}
            placeholder='Search Cases Here'
            onChangeText={(text) => searchFilter(text)}
            underlineColorAndroid='transparent'
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.bgColor} style={{ marginTop: 350, marginLeft: 8 }} />
        )
          :
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            data={industriesList}
            renderItem={ListItem}
            keyExtractor={item => `item-${item.id}`}
            enableEmptySections={true}
            ListFooterComponent={renderFooter}
          />
        }
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  listItem: {
    padding: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#DAD6D6',
    elevation: 2,
    borderRadius: 5,
    minHeight: 25
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginLeft: 5,
    borderRadius: 50,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  text_header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 30,
  },
  btnfooter: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  Searchbar: {
    width: "90%",
    borderRadius: 8,
    borderColor: theme.colors.bgColor,
    borderWidth: 1,
    marginBottom: 10,

  },
  image: {
    marginTop: 12,
    marginLeft: 10,
    width: 50,
    height: 60,
  },
});

export default CasesList;