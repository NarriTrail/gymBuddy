import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <View style={styles.iconWrapper}>
          <AntDesign name="arrowleft" size={20} color="#fff" />
        </View>
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#4a90e2', // Nice blue shade
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  backButton: {
    marginRight: 15,
  },
  iconWrapper: {
    backgroundColor: '#2c6bed',
    borderRadius: 25,
    padding: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginRight: 35, // Adjust to center the text visually
  },
});
