import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainStackNaviagtion from './src/components/navigations/stackNavs/MainStackNaviagtion'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import SampleScreen from './src/components/navigations/stackNavs/SampleScreen'

const App = () => {
  console.log("===========app rendered===========")
  return (
    <Provider store={store}>
   <NavigationContainer direction='ltr'>
    <MainStackNaviagtion/>
    {/* <SampleScreen/> */}
   </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})