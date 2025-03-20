import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, TouchableWithoutFeedback,Text,View } from "react-native";
import LoaderContext from "./LoaderContext";
import { getHeigth, getWidth } from "../../../utils/responsiveScale";


const Loader = () => {
  const { loading, setLoading } = useContext(LoaderContext)
  return loading ? (
    <TouchableOpacity onPress={()=> setLoading!(!loading) } activeOpacity={1} style={styles.container}>
      <View style={styles.secondary_container}>
        <TouchableWithoutFeedback>
          <>
            <ActivityIndicator />
            <Text>Please wait...</Text>
          </>
        </TouchableWithoutFeedback>
      </View>
    </TouchableOpacity>
  ) : (
    <View />
  );
}
const styles = StyleSheet.create({
  container: {
    height: getHeigth(100),
    width: getWidth(100),
    backgroundColor: "rgba(240,240,240,0.72)",
    position:"absolute",
    zIndex:1,
    justifyContent:"center",
    flexDirection:"column",
    flex:1,
    alignItems:"center"
  },
  secondary_container: {
    height: getHeigth(10),
    width: getHeigth(20),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
    borderRadius:getWidth(2)
  },
})
export default Loader