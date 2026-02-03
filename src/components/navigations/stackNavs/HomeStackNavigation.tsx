// import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../tabNavs/HomeScreen';
import ExerciseSpecificScreen from '../../../screens/ExerciseSpecificScreen';

const HomeStackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={HomeScreen} name="HomeScreen" />
      <Stack.Screen
        component={ExerciseSpecificScreen}
        name="ExerciseSpecificScreen"
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;

// const styles = StyleSheet.create({});
