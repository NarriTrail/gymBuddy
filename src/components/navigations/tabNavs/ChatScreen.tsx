import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  Keyboard,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import useScreenFocus from '../../../hooks/useScreenFocus';
import useLocationPermission from '../../../utils/Permissions';
import {TextInput} from 'react-native-gesture-handler';
import {socket} from '../../../utils/server';
import {useNavigation} from '@react-navigation/native';

const ChatScreen = () => {
  const {
    // isAppLocationEnabled, 
    // isDeviceLocationEnabled,
     updateLocationStatus} =
    useLocationPermission();
  const [openModal, setOpenModal] = React.useState(false);
  const [groupName, setGroupName] = React.useState('');
  const [isOpenGroup, setisOpenGroup] = React.useState(false);
  const [groupsList, setGroupsList] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  useScreenFocus(() => {
    console.log('ChatScreen focused');
    updateLocationStatus();
  });

  const navigation = useNavigation();
  const handleCreateGroupChat = () => {
    socket.emit('createGroup', {groupName, isOpenGroup});

    Keyboard.dismiss();
    setOpenModal(false);
    setGroupName('');
    console.log('============>');
  };

  const handleDeleteGroup = (id: number) => {
    socket.emit('deleteGroup', id);
  };
  useEffect(() => {
    socket.emit('getAllGroups');
    socket.on('groupsList', (data: []) => {
      setGroupsList(data);
    });
  }, [socket, refresh]);
  return (
    <View style={styles.container}>
      <Text>ChatScreen</Text>
      <TouchableOpacity
        onPress={() => setOpenModal(true)}
        style={styles.floatingButton}>
        <Text>+</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setRefresh(!refresh)}
        style={[
          styles.floatingButton,
          {left: 0, backgroundColor: 'green', width: 50},
        ]}>
        <Text>refresh</Text>
      </TouchableOpacity>

      <FlatList
        data={groupsList}
        renderItem={({item}: {item: {groupName: string; id: number}}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('ChatSpecificScreen', {item})}
              onLongPress={() => handleDeleteGroup(item?.id)}
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: 'black',
                margin: 5,
              }}>
              <Text>{item?.groupName}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <Modal visible={openModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Group</Text>

            {/* Input for Group Name */}
            <TextInput
              value={groupName}
              style={styles.input}
              placeholder="Enter Group Name"
              onChangeText={text => setGroupName(text)}
            />

            {/* Switch for Group Type */}
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>
                Group Type: {!isOpenGroup ? 'Open' : 'Close'}
              </Text>
              <Switch
                value={isOpenGroup}
                onValueChange={value => setisOpenGroup(value)}
                // onChange={(value => setisOpenGroup(!value))}
              />
            </View>

            {/* Button to Create Group */}
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateGroupChat}>
              <Text style={styles.createButtonText}>Create Group</Text>
            </TouchableOpacity>

            {/* Close Modal Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setOpenModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 100,
    aspectRatio: 1,
    bottom: 10,
    right: 10,
    height: 50,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  switchLabel: {
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
  },
  closeButtonText: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
});
