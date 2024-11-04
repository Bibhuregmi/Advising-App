import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth';
import  Icon  from 'react-native-vector-icons/Ionicons'; 
import { fetchUserDataFromFirestore } from '../utilities/userData';
import { setupChatListner, sendMessage} from '../utilities/fetchChat';


const Discussion = () => {
    const [userName, setUserName] = useState('Anonymous');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
      //fetching current user from auth
        const auth = getAuth();
        const user = auth.currentUser;
        if (user){
            setCurrentUser(user);
        const getUserData = async() => {
            try{
              //fetching user data from firestore 
                const userData = await fetchUserDataFromFirestore(user.uid);
                if (userData && userData.firstName){
                    setUserName(userData.firstName); //setusername as the userName of the current authenticated user
                }
            }catch(error){
                console.error('Error Fetching data', error);
            }
        };
        getUserData();

        //setup realtime chat listner for the specified course
        const unsubscribe = setupChatListner('computerprogramming', (newMessages) => {
          setMessages(prevMessages => {
           const combinedMessages = [...prevMessages, ...newMessages]; //combining new message with the existing messages 
           //removinng duplicate message based on the id
           const uniqueMessages = Array.from(
            new Map(combinedMessages.map((msg) => [msg.id, msg])).values() 
           );
           //sorting messages based on the timestamp
           uniqueMessages.sort((a,b) => a.timestamp.seconds - b.timestamp.seconds);
           return uniqueMessages; //returns sorted unique messages
          });
        });
        //cleanup when component unmounts
        return () => unsubscribe && unsubscribe();
    }else{
        console.error('No user is logged in!');
    }
    },[]);

    //function to hundle sending messages 
    const handelSend= async () => {
        if (message.trim() !== ''){
          //creating a new message object 
            const newMessage = {
                id: Date.now().toString(), //unique id based on timestamp
                text: message,
                timestamp: new Date(), //current date and time 
                user: userName,
                userId: currentUser.uid,
            };
           try{
            //sending message data to firestore
            await sendMessage('computerprogramming', newMessage);
            setMessage(''); //clearing input feild once send
           }catch(error){
            console.error('Error sending messages: ', error);
           }
        }

    }
    //function to format timestamp to display 
    const formatTimestamp = (timestamp) => {
      if (timestamp && timestamp.seconds) {
        return new Date(timestamp.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      }
      return 'Timestamp not available';
    };
    
    //function to render individual messages
    const renderMessges = ({item}) => {
        const isCurrentUser = item.message.user === userName; //checking if the message is from currnet user
        // console.log('Comparing user: ', item.user, 'with current user: ', userName)
        // console.log('Rendering message with timestamp:', item); 
        return(  
        <View
            style= {[
                styles.messageBubble,
                isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
            ]}
        >
            <Text style={styles.userName}>{item.message.user}</Text>
            <Text style= {styles.messageText}>{item.message.text || 'Message not available'}</Text>
            <Text style = {styles.timestamp}>{formatTimestamp(item.timestamp) || 'Timestamp not available'}</Text>
        </View>
        );
    };
  return (
    <View style = {styles.container}>
        <Text style = {styles.headerText}>
            {`Welcome to Discussion!\n Have a chat with your course buddy! \n This chat is public, so avoid sharing personal information.`}
        </Text>

        <FlatList
            data = {messages}
            renderItem={renderMessges}
            keyExtractor={(item) => item.id}
            contentContainerStyle = {styles.messageList}
            ListHeaderComponent={() =>(
                <Text style = {styles.dateHeader}>{new Date().toLocaleDateString()}</Text>
            )}
        />
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}    
        >
        <View style = {styles.inputBar}>
            <TouchableOpacity style = {styles.emojiButton}>
                <Icon name = 'happy' size = {25} color='white'/>
            </TouchableOpacity>
            <TextInput
                style = {styles.input}
                placeholder='Type a message.....'
                placeholderTextColor= '#888'
                value={message}
                onChangeText={setMessage}
            />
            <TouchableOpacity style = {styles.sendButton} onPress={handelSend}>
                <Icon name = 'paper-plane-sharp' size = {20} color='white'/>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    </View>
  );
};

export default Discussion

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10,
      },
      headerText: {
        color: '#ccc',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 60,
      },
      messageList: {
        flexGrow: 1,
        justifyContent: 'flex-end',
      },
      messageBubble: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
      },
      currentUserBubble: {
        backgroundColor: '#38b6ff',
        alignSelf: 'flex-end',
        color: 'white',
      },
      otherUserBubble: {
        backgroundColor: '#424242',
        alignSelf: 'flex-start',
        color: 'white',
      },
      messageText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      timestamp: {
        fontSize: 10,
        color: '#fff',
        alignSelf: 'flex-end',
        marginTop: 5,
      },
      userName: {
        color: '#eee',
        fontSize: 10,
        marginBottom: 2,
      },
      inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#333',
        marginBottom: 30,
      },
      emojiButton: {
        marginRight: 10,
      },
      emojiText: {
        fontSize: 24,
        color: '#ccc'
      },
      input: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#222',
        color: '#fff',
      },
      sendButton: {
        marginLeft: 10,
        paddingVertical: 7,
        paddingHorizontal: 14,
        backgroundColor: '#38b6ff',
        borderRadius: 20,
      },
      sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      dateHeader:{
        color: "#ccc",
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 14,
      },
})