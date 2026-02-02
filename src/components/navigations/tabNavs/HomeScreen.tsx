import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import  AntDesign  from 'react-native-vector-icons/AntDesign'
import { colors, fonts, fontSizes, useThemeColors } from '../../../utils/theme'
import useScreenFocus from '../../../hooks/useScreenFocus'
import useLocationPermission from '../../../utils/Permissions'
import Video, {VideoRef} from 'react-native-video';
import { useNavigation } from '@react-navigation/native'
interface NavProps{
  navigate:Function
}
export const workOutsData=[
  {
    id:1,
    thumbNail:'https://surl.li/dmlkpf',
    exerciseName:"pushups"
  },
  {
    id:2,
    thumbNail:'https://surl.li/dmlkpf', 
    exerciseName:"squats"   
  },
  {
    id:3,
    thumbNail:'https://surl.li/dmlkpf', 
    exerciseName:"skipping"   
  },
    {
      id:4,
      thumbNail:'https://surl.li/dmlkpf',
      exerciseName:"running"    
    },
    {
      id:5,
      thumbNail:'https://surl.li/dmlkpf',
      exerciseName:"mountain climb"    
    },

]
const HomeScreen = () => {
  const {isAppLocationEnabled,isDeviceLocationEnabled,updateLocationStatus}=useLocationPermission();
  useScreenFocus(()=>{
    console.log("home focused")
    updateLocationStatus()
  })
  const themeColors= useThemeColors()
  const navigation:NavProps= useNavigation()
  const videoRef = useRef<VideoRef>(null);

  return (
    <View style={{flex:1,backgroundColor:colors.white}}>
      <Text style={{fontFamily:fonts.semiBold,fontSize:fontSizes.large,color:colors.black}}>HomeScreen</Text>
      <AntDesign name="home" size={24}  /> 

      <FlatList
      data={workOutsData}
      renderItem={({item})=>{
        return(
          <TouchableOpacity style={styles.exerciseCardContainer} 
          onPress={()=>navigation?.navigate('ExerciseSpecificScreen',{item})}>
            <View style={{width:100,aspectRatio:1,}}>
            <Image source={{uri:item?.thumbNail}} resizeMode='cover' style={{overflow:'hidden',width:"100%", height:"100%"}}/>
            </View>
            <View>
              <Text style={styles.exerciseName}>{item?.exerciseName}</Text>
            </View>
          </TouchableOpacity>
        )
      }}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  exerciseCardContainer:{
    flexDirection:'row',
    alignItems:"flex-start",
    justifyContent:"flex-start"
  },
  exerciseName:{fontFamily:fonts.bold,textTransform:"capitalize",fontSize:fontSizes.regular,color:colors.primary}
})