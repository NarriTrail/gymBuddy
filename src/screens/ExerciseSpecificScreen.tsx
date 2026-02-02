import {Text, View} from 'react-native';
import React from 'react';
import Header from '../components/common/Header';
import {useRoute} from '@react-navigation/native';
// interface WorkoutProps{
//   item:{
//     id?:string,
//     exerciseName?:string,
//     thumbNail?:string,
//     videoUrl?:string,
//   }
// }
const ExerciseSpecificScreen = () => {
  const route = useRoute();
  console.log(route?.params);
  // const workOutId=workOutsData?.filter((list)=>list?.id===route?.params?.id)
  const {item}: any = route?.params;
  return (
    <View>
      <Header title={item?.exerciseName} />
      <Text>ExerciseSpecificScreen</Text>
      {/* //   <Video
              //   repeat
              //   resizeMode='cover'
              //   // Can be a URL or a local file.
              //   source={{uri:item?.thumbNail}}
              //   // Store reference
              //   ref={videoRef}
              //   // Callback when remote video is buffering
              //   onBuffer={()=>console.log("bufffer")}
              //   // Callback when video cannot be loaded
              //   onError={()=>console.log("error")}
              //   style={{width:"100%",height:200}}
              //  /> */}
    </View>
  );
};

export default ExerciseSpecificScreen;

// const styles = StyleSheet.create({})
