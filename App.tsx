import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainStackNaviagtion from './src/components/navigations/stackNavs/MainStackNaviagtion'

const App = () => {
  return (
   <NavigationContainer>
    <MainStackNaviagtion/>
   </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})