import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../tabNavs/HomeScreen';
import SplashScreen from './SplashScreen';
import TabNavigation from '../tabNavs/TabNavigation';


const MainStackNaviagtion = () => {
  const Stack= createStackNavigator();
  return (
   <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="SplashScreen" component={SplashScreen} />
    <Stack.Screen name="TabNavigation" component={TabNavigation} />
   </Stack.Navigator>
  )
}

export default MainStackNaviagtion

const styles = StyleSheet.create({})