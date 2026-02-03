import {Dimensions, useColorScheme} from 'react-native';

export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;

export const colors = {
  primary: '#15b082',
  secondary1: '#f4f4f4',
  secondary2: '#f5f5f5',
  black: '#000000',
  white: '#ffffff',
  darkgray2: '#333333',
  rgbaWhite: (opacity: number) => `rgba(255,255,255,${opacity})`,
  rgbaBlack: (opacity: number) => `rgba(0,0,0,${opacity})`,
};

export const fontSizes = {
  header: 33.3,
  mHeader: 20,
  xlarge: 18,
  large: 16,
  regular: 14,
  small: 12,
  mini: 11,
  xsmall: 10,
  xmini: 9,
  tiny: 8,
};

export const fonts = {
  regular: 'Rubik-Regular',
  medium: 'Rubik-Medium',
  semiBold: 'Rubik-SemiBold',
  bold: 'Rubik-Bold',
  light: 'Rubik-Light',
};
export const useThemeColors = () => {
  const isDarkTheme = useColorScheme();
  console.log('isDarkTheme', isDarkTheme);
  return {
    whiteBlack: isDarkTheme === 'dark' ? '#fff' : '#000',
  };
};
