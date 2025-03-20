import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../../utils/theme'
import { useNavigation } from '@react-navigation/native'
interface navigationProps {
    navigate: (screen: string) => void
}
const SplashScreen = () => {
    const navigation:navigationProps = useNavigation()
  return (
    <View style={styles.mainWrapper}>
      <TouchableOpacity onPress={() => navigation.navigate('TabNavigation')}>
      <Text>SplashScreen</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    }
})