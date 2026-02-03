// import React from 'react';
import {  useColorScheme} from 'react-native';

const ThemeContex = () => {
  const colorTheme = useColorScheme();
  console.log('color',colorTheme)
};

export default ThemeContex;

// const styles = StyleSheet.create({});
