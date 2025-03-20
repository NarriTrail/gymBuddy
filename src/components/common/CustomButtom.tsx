import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fontSizes } from '../../utils/theme'
interface CustomButtomProps {
    title?: string,
    width?: string | number,
    height?: number,
    borderRadius?: number,
    textColor?: string,
    fontSize?: number,
    disabled?: boolean,
    paddingHorizontal?: number,
    //fontFamily?: string,
    opacity?: number,
    activeOpacity?: number,
    disabledColor?: string,
    onPress?: () => void,
    onLongPress?: () => void,
    onLayout?: () => void,
    containerStyle?: object,
    textStyle?: object,
}
const CustomButtom = ({
    title = 'Add Title',
    width = "auto",
    height = 45,
    borderRadius = 120,
    textColor = colors.white,
    fontSize = fontSizes.regular,
    disabled = false,
    paddingHorizontal = 30,
    //fontFamily = configFontFamily.medium,
    opacity = 1,
    activeOpacity = 0.2,
    disabledColor = colors.darkgray2,
    onPress = () => { },
    onLongPress = () => { },
    onLayout = () => { },
    containerStyle = {},
    textStyle = {}
}:CustomButtomProps) => {
    const backgroundColor = disabled ? disabledColor : colors.secondary1
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            onLongPress={onLongPress}
            onLayout={onLayout}
            activeOpacity={activeOpacity}
            style={[styles.touchable, containerStyle,{width, height, borderRadius, backgroundColor, paddingHorizontal}]}
        >
            <Text style={[{ color: textColor, fontSize }, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButtom

const styles = StyleSheet.create({
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})