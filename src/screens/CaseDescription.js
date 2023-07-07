import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import {BASE_URL} from '../config';
import axios from 'axios';
import {AuthContext} from '../../navigation/AuthProvider';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const COLORS = {primary: '#1f145c', white: '#fff'};
import {DataTable} from 'react-native-paper';
import { theme } from '../core/theme';
import BackButton from '../components/BackButton';

const optionsPerPage = [2, 3, 4];

const CaseDescription = ({navigation}) => {
  const {userInfo} = useContext(AuthContext);
  const [industry, setIndustry] = useState({});
  const {params} = useRoute();

  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/industrial-units/industries/${params.id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.data.token.token}`,
        },
      })
      .then(res => {
        let userInfo = res.data.data;
        setIndustry(userInfo);
      })
      .catch(e => {
        console.log(`Getting List ${e}`);
      });
  }, []);

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <Text style={styles.text_header}>Industrial Units Data</Text>
        <View style={styles.card1}>
          <SafeAreaView>
            <ScrollView>
              <DataTable>
              <DataTable.Row>
                  <DataTable.Cell>Latitude</DataTable.Cell>
                  <DataTable.Cell numeric>{industry?.latitude}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Longitude</DataTable.Cell>
                  <DataTable.Cell numeric>{industry?.longitude}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Title:</DataTable.Cell>
                  <DataTable.Cell numeric>{industry?.title}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Code:</DataTable.Cell>
                  <DataTable.Cell numeric>{industry?.code}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Phone:</DataTable.Cell>
                  <DataTable.Cell numeric>{industry?.mobile_number}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Address:</DataTable.Cell>
                  <DataTable.Cell numeric>{industry?.address}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Year Established</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {industry?.year_established}
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Category:</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {industry?.sectors_title}
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Sub-Category:</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {industry?.sub_sectors_title}
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Tehsil:</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {industry?.tehsil_title}
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Total Area:</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {industry?.total_area}
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>
                    Installed Production Capacity/Day:
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {industry?.installed_production_capacity}
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>
                    Electricity Installed Capacity in (KWH):
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {industry?.electricity_load_sanctioned}
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Created Date:</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {industry?.created_at}
                  </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </ScrollView>
          </SafeAreaView>
        </View>
        <Header>Periodic Info</Header>
        <View>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            Year: 2021-{industry?.periodics?.year}
          </Text>
        </View>

        <TouchableOpacity style={styles.card2}>
          {params.periodics === null && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Periodic Form', {id: params.id})
              }>
              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  padding: 10,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Tab here to Add Periodics
                </Text>
                <View
                  style={[
                    styles.actionIcon,
                    {backgroundColor: 'red', marginLeft: 20},
                  ]}>
                  <Icon name="close" size={20} color="white" />
                </View>
              </View>
            </TouchableOpacity>
          )}
          {params.periodics === 1 && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Periodic Detail', {
                  id: params.id,
                  periodic: industry.periodics?.periodics?.id,
                  title: industry?.title,
                })
              }>
              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  padding: 10,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Periodics Data is available
                </Text>
                <View
                  style={[
                    styles.actionIcon,
                    {backgroundColor: 'green', marginLeft: 20},
                  ]}>
                  <Icon name="done" size={20} color="white" />
                </View>
              </View>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgColor1,
    alignItems:'center'
  },

  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
  card1: {
    height: 520,
    width: '90%',
    borderRadius: 5,
    backgroundColor: theme.colors.bgColor2,
    opacity: 100,
    elevation: 12,
    marginTop:-100
  },
  card2: {
    height: 50,
    width: '90%',
    borderRadius: 5,
    backgroundColor: theme.colors.bgColor2,
    elevation: 12,
    marginTop: 10,
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
  text_header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 130,
    marginTop:50,
    color: theme.colors.bgColor,
  },
});

export default CaseDescription;