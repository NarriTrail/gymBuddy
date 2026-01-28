import React, { Fragment } from 'react'
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'
import { colors, fonts, fontSizes, screenHeight, screenWidth } from '../utils/theme';
import { isAndroid } from '../utils/helper';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setLocationStatus } from '../redux/reducers/serviceSlice';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';

interface AskLocationPermissionTypes{
    visible:boolean
}
const AskLocationPermissionPopup = ({visible}:AskLocationPermissionTypes) => {
    const { isDeviceLocationEnabled, isAppLocationEnabled } = useSelector((state:RootState) => state.serviceSlice?.locatoinStatus);

    const { isConnected } = useNetInfo();
    const dispatch:AppDispatch= useDispatch()
    const handleTurnOnLocation = async () => {
      if (isAppLocationEnabled===false) {
        const locationPermission = isAndroid
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
        try {

            const permissionStatus = await check(locationPermission);
            const isGPSOn = await DeviceInfo.isLocationEnabled();
        
            if (isGPSOn && permissionStatus === RESULTS.GRANTED) {
                dispatch(setLocationStatus({ appLocationStatus: true, }));
              console.log('Location is already enabled and permission granted.');
              return;
            }
        
            if (isAndroid) {
              if (!isGPSOn) {
                Alert.alert(
                  'Turn on Location',
                  'Please enable location services to continue.',
                  [{ text: 'OK', onPress: () => Linking.openSettings() }]
                );
                return;
              }
        
              if (permissionStatus === RESULTS.DENIED) {
                console.log("denied app permission")
                const newPermission = await request(locationPermission);
                if (newPermission === RESULTS.GRANTED) {
                      dispatch(setLocationStatus({ appLocationStatus: true, }));
                  console.log(' app Permission granted.');
                  return;
                }
              }
        
              if (permissionStatus === RESULTS.BLOCKED || permissionStatus === RESULTS.DENIED) {
                Alert.alert(
                  'Permission Required',
                  'Location permission is required. Please enable it in settings.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Settings', onPress: () => {
                        //dispatch(setLocationStatus({ appLocationStatus: true, }));
                        Linking.openSettings()
                    } },
                  ]
                );
              }
            } else {
              // iOS: Directly navigate to settings
              Alert.alert(
                'Enable Location',
                'Please allow location access in Settings.',
                [{ text: 'Open Settings', onPress: () => Linking.openSettings() }]
              );
            }
          } catch (error) {
            console.error('Error checking location:', error);
          }
      }

      if (isDeviceLocationEnabled===false) {
        if (isAndroid) {
            let status= await promptForEnableLocationIfNeeded()

            if (status=='already-enabled'||status==='enabled') {
                dispatch(setLocationStatus({ deviceLocationStatus: true, }));   
            }
        } else {
            
        }
        // isAndroid?Alert.alert('prompt enable cheii ra pukka'):Linking.openSettings()
      }

      
console.log("popup btn click chesaav raa",isAppLocationEnabled)
      };
    return (
        <Fragment>
            {
                visible?
                <View style={{ width: screenWidth, height: screenHeight, backgroundColor: colors.rgbaBlack(0.8), position: 'absolute', alignSelf: 'center', zIndex: 1000, justifyContent: 'center', alignItems: 'center', }}>


                    <Text style={{ fontSize: fontSizes.regular, fontFamily: fonts.semiBold, color: colors.primary, marginTop: 14 }}>
                    Enable Location
                    </Text>

                    <Text style={{ maxWidth: screenWidth * 0.8, fontSize: fontSizes.small, fontFamily: fonts.light, color: colors.secondary1, marginTop: 14, marginBottom: 20, textAlign: 'center' }}>
                    {isDeviceLocationEnabled===false?'location on cheii raa pukka':'To view posts and stories from people near your location, please allow location access from your location settings'}
                    </Text>

                    <TouchableOpacity
                        onPress={() => { handleTurnOnLocation() }}
                        style={{ paddingHorizontal: 18, paddingVertical: 9, borderRadius: 50, backgroundColor: colors.secondary1, }}
                    >
                        <Text style={{ fontSize: fontSizes.small, fontFamily: fonts.medium, color: colors.white }}>
                        Turn on location
                        </Text>
                    </TouchableOpacity>
                </View >:null
            }
        </Fragment>
    )
}

export default AskLocationPermissionPopup

const styles = StyleSheet.create({})