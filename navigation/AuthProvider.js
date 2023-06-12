import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../src/config';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const login = (username, password) => {
    if (username.value == "" || password.value == ""){
      Alert.alert('Username and Password are required! ');
      return 
    } 
    setIsLoading(true);
axios
      .post(`${BASE_URL}/guardian/login`, {
        username,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        if(userInfo.error)
        {
          Alert.alert('Failed to Login', "Message:" + userInfo.message);
          return
        }
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
        Alert.alert('Error!', error.res.msg);
        return false
      });
  };

  const logout = () => {
    setIsLoading(true);
    axios
      .get(
        `${BASE_URL}/guardian/logout`,
        {
          headers: {Authorization: `Bearer ${userInfo.access_token}`},
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo(undefined);
        setIsLoading(false);
      
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
       
      });
  };

  const ChangePassword = ({old_password, password,  password_confirmation }) => {
    if ( old_password == "" || password == "" || password_confirmation == "" ){
      Alert.alert('Old Password Or Password OR New Password is required are required! ');
      return 
    } 
    setIsLoading(true);
    axios.put(`${BASE_URL}/guardian/password`,     
   { old_password,
    password,
    password_confirmation},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.data.token.token}`},
      },
      )
      .then(res => {
        let userInfo3 = res.data;
        console.log(userInfo3.data.message);
        AsyncStorage.removeItem('userInfo');
        setUserInfo(undefined);
        setIsLoading(false);
        
      })
      .catch(e => {
        console.log(`change password error ${e}`);
        setIsLoading(false);
        Alert.alert('Error!', error.res.msg);
        return false
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }
      setSplashLoading(false);
    
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        login,
        logout,
        ChangePassword
      }}>
      {children}
    </AuthContext.Provider>
  );
};