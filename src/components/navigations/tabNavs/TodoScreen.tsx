import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useScreenFocus from '../../../hooks/useScreenFocus'
import useLocationPermission from '../../../utils/Permissions';

const TodoScreen = () => {
  const {isAppLocationEnabled,isDeviceLocationEnabled,updateLocationStatus}=useLocationPermission();

  useScreenFocus(()=>{
    console.log("TodoScreen focused")
    updateLocationStatus()
  })
  return (
    <View>
      <Text>TodoScreen</Text>
    </View>
  )
}

export default TodoScreen

const styles = StyleSheet.create({})