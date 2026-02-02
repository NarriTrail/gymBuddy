import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../tabNavs/ChatScreen';
import ChatSpecificScreen from '../../../screens/ChatSpecificScreen';

const ChatStackNavigation = () => {
    const Stack= createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen component={ChatScreen} name='ChatScreen'/>
        <Stack.Screen component={ChatSpecificScreen} name='ChatSpecificScreen'/>
    </Stack.Navigator>
  )
}

export default ChatStackNavigation