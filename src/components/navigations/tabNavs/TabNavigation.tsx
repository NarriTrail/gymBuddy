import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ChatScreen from './ChatScreen';
import TodoScreen from './TodoScreen';
import InsightsScreen from './InsightsScreen';
import useLocationPermission from '../../../utils/Permissions';
import HomeStackNavigation from '../stackNavs/HomeStackNavigation';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ChatStackNavigation from '../stackNavs/ChatStackNavigation';

const TabNavigation = () => {
  const Tab= createBottomTabNavigator();


    // const {isLocationEnabled,permissionStatus}=useLocationPermission()
  
    // console.log('isLocationEnabled',isLocationEnabled,'permissionStatus',permissionStatus)
  return (
    <Tab.Navigator
    screenOptions={{headerShown: false,}}
    >
      <Tab.Screen 
    name="HomeStackNavigation" 
    component={HomeStackNavigation} 
    options={({ route }) => {
      const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';

      const hideOnScreens = ['ExerciseSpecificScreen']; // screens to hide tab bar on

      return {
        tabBarStyle: {
          display: hideOnScreens.includes(routeName) ? 'none' : 'flex',
        },
      };
    }} 
  />
      <Tab.Screen name="ChatStackNavigation" component={ChatStackNavigation}
      options={({route})=>{
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';

        const hideOnScreens = ['ChatSpecificScreen'];
return{
  tabBarStyle: {
    display: hideOnScreens.includes(routeName) ? 'none' : 'flex',
  },
}
      }}
      />
      <Tab.Screen name="TodoScreen" component={TodoScreen} />
      <Tab.Screen name="InsightsScreen" component={InsightsScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigation

const styles = StyleSheet.create({})