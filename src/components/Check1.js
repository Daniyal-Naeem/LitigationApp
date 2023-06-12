import React from 'react'
import {Checkbox} from 'react-native-paper';


const Check1 = ({onChange}) => {
    const [checked, setChecked] = React.useState();
  return (
    <Checkbox
    status={checked ? 'checked' : 'unchecked'}
    onPress={() => {
        setChecked(!checked)
        onChange(!checked)
    }}
  />
  )
}

export default Check1