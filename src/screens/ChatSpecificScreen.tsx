import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
  } from 'react-native';
  import React, { useEffect, useLayoutEffect, useState } from 'react';
  import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/common/Header';
import { useRoute } from '@react-navigation/native';
import { socket } from '../utils/server';
  
  const ChatSpecificScreen = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any>([
      { id: '1', text: 'Hey there!', sender: 'other' },
      { id: '2', text: 'Hi! How are you?', sender: 'me' },
    ]);
  
    const route = useRoute()
    const {item}:any=route?.params
    const sendMessage = () => {
        const timeData={
            hrs:new Date().getHours()>10?new Date().getHours():`0${new Date().getHours()}`,
            min:new Date().getMinutes()>10?new Date().getMinutes():`0${new Date().getMinutes()}`,
        }
        const newMessage = {
            message,
            timeData,
            groupId:item?.id,
            groupName:item?.groupName,
            msgId:Date.now().toString(),
            sender:'me'
        }
        setMessages(prev => [
            
            {
              id: newMessage.msgId,
              mesage: newMessage.message,
              sender: newMessage.sender,
              time: newMessage.timeData,
            },...prev,
          ]);
        socket.emit('sendMessage', newMessage);
        
      setMessage('');



    };
  
    const renderItem = ({ item }) => (
      <View
        style={[
          styles.messageContainer,
          item.sender === 'me' ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.mesage}</Text>
      </View>
    );

    // useEffect(()=>{
    //     socket.emit('findGroup',item?.id)
    //     socket.on('groupMessages',(data:any)=>{
    //         console.log("group messages=====================>",data)
    //         setMessages(data?.messages)
    //     })
    // },[socket])

    useEffect(() => {
        socket.emit('findGroup', item?.id);
      
        socket.on('groupMessages', (data) => {
          console.log('group messages=====================>', data);
          if (Array.isArray(data.messages)) {
            setMessages(data.messages);
          }
        });
        return () => {
            socket.off('groupMessages');
            // Optional: socket.emit('leaveGroup', item?.id);
          };
    },[socket])      
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <Header title={item?.groupName}/>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.messagesList}
          inverted
        />
  
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  export default ChatSpecificScreen;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f7f7f7',
    },
    messagesList: {
      padding: 10,
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
    messageContainer: {
      padding: 12,
      marginVertical: 4,
      borderRadius: 20,
      maxWidth: '75%',
    },
    myMessage: {
      backgroundColor: '#4e9bde',
      alignSelf: 'flex-end',
    },
    otherMessage: {
      backgroundColor: '#e5e5ea',
      alignSelf: 'flex-start',
    },
    messageText: {
      color: '#fff',
    },
    inputContainer: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: '#ffffff',
      borderTopWidth: 1,
      borderColor: '#ddd',
    },
    input: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      borderRadius: 25,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginRight: 10,
      fontSize: 16,
    },
    sendButton: {
      backgroundColor: '#4e9bde',
      borderRadius: 25,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
    