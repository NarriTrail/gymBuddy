import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {check, PERMISSIONS} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import {setLocationStatus} from '../redux/reducers/serviceSlice';
import {RootState} from '../redux/store';
import {isAndroid} from './helper';
const useLocationPermission = () => {
  const dispatch = useDispatch();
  const {isDeviceLocationEnabled, isAppLocationEnabled} = useSelector(
    (state: RootState) => state.serviceSlice?.locatoinStatus,
  );
  console.log(
    'isDeviceLocationEnabled',
    isDeviceLocationEnabled,
    'isAppLocationEnabled',
    isAppLocationEnabled,
    'from hook',
  );
  // Function to check and update permission status in Redux
  const updateLocationStatus = useCallback(async () => {
    try {
      const permission = isAndroid
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

      const permissionStatus = await check(permission);
      const isGPSOn = await DeviceInfo.isLocationEnabled();
      console.log(
        'permissionStatus----------------------------------------------------------->from hook',
        permissionStatus,
        'isGPSOn',
        isGPSOn,
      );
      dispatch(
        setLocationStatus({
          appLocationStatus: permissionStatus === 'denied' ? false : true,
          deviceLocationStatus: isGPSOn,
        }),
      );
    } catch (error) {
      console.error(
        'Error checking location permissions:',
        JSON.stringify(error, null, 2),
      );
      dispatch(
        setLocationStatus({
          appLocationStatus: false,
          deviceLocationStatus: false,
        }),
      );
    }
  }, [dispatch]);
  console.log('last line of hook');
  return {isDeviceLocationEnabled, isAppLocationEnabled, updateLocationStatus};
};

export default useLocationPermission;
