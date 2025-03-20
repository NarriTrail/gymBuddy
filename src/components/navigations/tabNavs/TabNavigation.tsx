import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ChatScreen from './ChatScreen';
import TodoScreen from './TodoScreen';
import InsightsScreen from './InsightsScreen';

const TabNavigation = () => {
  const Tab= createBottomTabNavigator();
  return (
    <Tab.Navigator
    screenOptions={{headerShown: false,}}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="ChatScreen" component={ChatScreen} />
      <Tab.Screen name="TodoScreen" component={TodoScreen} />
      <Tab.Screen name="InsightsScreen" component={InsightsScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigation

const styles = StyleSheet.create({})