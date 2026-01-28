// import { Platform } from "react-native";
// import DeviceInfo from "react-native-device-info";
// import {io} from 'socket.io-client'
// export const BaseUrl=Platform.OS === 'android' ? 'http://10.0.2.2:3000/':'http://localhost:3000'
// const isEmulator=DeviceInfo.isEmulator()
// export const socket = io.connect(isEmulator?'http://10.0.2.2:3000/':'http:localhost:3000')


import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { io } from "socket.io-client";

let baseURL = "";

const setupSocket = async () => {
  const isEmulator = await DeviceInfo.isEmulator();

  // Replace with your machine’s actual IP address
  const localNetworkIP = 'http://192.168.0.13:3000';

  baseURL =
    Platform.OS === "android"
      ? isEmulator
        ? "http://10.0.2.2:3000"
        : localNetworkIP
      : isEmulator
      ? "http://localhost:3000"
      : localNetworkIP;

  // Export socket after URL is resolved
  return io(baseURL);
};

export const BaseUrl = baseURL;
export const socket = io.connect('http://192.168.0.13:3000')
// export const socketPromise = setupSocket(); // use await in your component to get socket
