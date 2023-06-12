import React from 'react';
import { View} from 'react-native'
import TextInput from '../components/TextInput'
export const MyTextInput = (props) => {
  return (
        <View>
            <TextInput {...props} />
        </View>
  );
  
};
