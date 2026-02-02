import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../tabNavs/HomeScreen';
import SplashScreen from './SplashScreen';
import TabNavigation from '../tabNavs/TabNavigation';
import useLocationPermission from '../../../utils/Permissions';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AskLocationPermissionPopup from '../../../screens/AskLocationPopUp';
import { NativeModules } from 'react-native';
import HomeStackNavigation from './HomeStackNavigation';


const MainStackNaviagtion = () => {
  const Stack= createStackNavigator();
  
  const navigation = useNavigation(); // Get navigation instance
  const isFocused = useIsFocused(); // Check if stack is focused
  const {isAppLocationEnabled,isDeviceLocationEnabled,updateLocationStatus}=useLocationPermission();
  // Call the location permission hook only when MainStack is active
  
  console.log('NativeModules==============>',NativeModules);
  console.log("===========main stack rendered===========")
  useEffect(() => {
    if (isFocused) {
      updateLocationStatus()
    }
  }, [isFocused]);
  const InternalStacks=()=>{}
  return (
    <>
   <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="SplashScreen" component={SplashScreen} />
    <Stack.Screen name="TabNavigation" component={TabNavigation} />
    <Stack.Screen name="HomeStackNavigation" component={HomeStackNavigation} />
    
   </Stack.Navigator>
  {/* { <AskLocationPermissionPopup visible={isAppLocationEnabled===false||isDeviceLocationEnabled===false}/>} */}
    </>
  )
}

export default MainStackNaviagtion

const styles = StyleSheet.create({})