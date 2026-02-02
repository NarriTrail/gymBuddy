import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useScreenFocus from '../../../hooks/useScreenFocus'
import useLocationPermission from '../../../utils/Permissions';

const InsightsScreen = () => {
  const {isAppLocationEnabled,isDeviceLocationEnabled,updateLocationStatus}=useLocationPermission();

  useScreenFocus(()=>{
    console.log("InsightsScreen focused")
    updateLocationStatus()
  })
  return (
    <View>
      <Text>InsightsScreen</Text>
    </View>
  )
}

export default InsightsScreen

const styles = StyleSheet.create({})