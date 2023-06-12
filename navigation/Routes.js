import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {AuthContext} from './AuthProvider';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';
 
const Routes = () => {

  const {userInfo} = useContext(AuthContext);

    return (
        <NavigationContainer >
          { userInfo ? <HomeNavigation/> : <AuthNavigation/>}
      </NavigationContainer>
    );
};

export default Routes;