// import { Animated, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useEffect, useRef } from 'react'
// import { colors } from '../../../utils/theme'
// import { useNavigation } from '@react-navigation/native'
// interface navigationProps {
//     navigate: (screen: string) => void
//     replace:(screen: string)=>void
// }
// const SplashScreen = () => {
//     const navigation:navigationProps = useNavigation()

//     const fadeAnim= useRef(new Animated.Value(0)).current
//     const scaleAnim= useRef(new Animated.Value(0)).current

//     useEffect(()=>{
//       Animated.sequence([
//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 3000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(scaleAnim, {
//           toValue: 10,
//           useNativeDriver: true,
//           // tension:10,
//           // friction:0.3,
//           delay:1000
//         })
//       ]).start()
//     },[])
//     // useEffect(() => {
//     //   // Navigate to the next screen after 2 seconds
//     //   const timer = setTimeout(() => {
//     //     navigation.replace('TabNavigation'); // Replace 'HomeScreen' with your actual next screen's name
//     //   }, 2000);
  
//     //   // Cleanup timer to avoid memory leaks
//     //   return () => clearTimeout(timer);
//     // }, [navigation]);
//     return (

//       <ImageBackground
//         source={{ uri: 'https://www.shopperadvocate.com/wp-content/uploads/2021/03/best-fitness-apps-for-featured.jpg' }} // Replace with a link to your background image
//         style={[styles.container,{transform:[{scale:scaleAnim}]}]}
//       >
//         {/* <Image
//           source={{ uri: 'https://example.com/logo.png' }} // Replace with your logo's URL
//           style={styles.logo}
//         /> */}
//         <Text style={styles.tagline}>Your Journey to Fitness Starts Here</Text>
//       </ImageBackground>
//     );
// }

// export default SplashScreen

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor:'#aa0000'
//   },
//   logo: {
//     width: 150,
//     height: 150,
//     marginBottom: 20,
//   },
//   tagline: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: 'white',
//     textAlign: 'center',
//     marginHorizontal: 20,
//   },
//   innerContainer:{
//     height:"50%",
//     width:"50%",
//     borderWidth:3,
//     backgroundColor:'red',
//     zIndex: 10,
//   }
// });

import { Animated, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

interface navigationProps {
  navigate: (screen: string) => void;
  replace: (screen: string) => void;
}

const SplashScreen = () => {
  const navigation: navigationProps = useNavigation();

  // const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current; // Start at 1, not 0

  useEffect(() => {
    Animated.parallel([
      // Fade in animation
      // Animated.timing(fadeAnim, {
      //   toValue: 1,
      //   duration: 2000,
      //   useNativeDriver: true,
      // }),

      // Zoom in animation
      Animated.timing(scaleAnim, {
        toValue: 1.2, // Zoom in slightly
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
    useEffect(() => {
      // Navigate to the next screen after 2 seconds
      const timer = setTimeout(() => {
        navigation.replace('TabNavigation'); // Replace 'HomeScreen' with your actual next screen's name
      }, 2000);
  
      // Cleanup timer to avoid memory leaks
      return () => clearTimeout(timer);
    }, [navigation]);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedContainer, { transform: [{ scale: scaleAnim }], }]}>
        <ImageBackground
          source={{ uri: 'https://www.shopperadvocate.com/wp-content/uploads/2021/03/best-fitness-apps-for-featured.jpg' }}
          style={styles.backgroundImage}
        >
          <Text style={styles.tagline}>Your Journey to Fitness Starts Here</Text>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#aa0000',
  },
  animatedContainer: {
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagline: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});
