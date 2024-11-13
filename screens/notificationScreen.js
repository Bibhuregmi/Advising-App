import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { getRandomNotification } from '../utilities/notificationService';

const Notification = () => {
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        //fetching initial notification on mount
        setNotification([
            getRandomNotification(),
        ]);
    }, []);

    const handleSwipe = (id) => {
        setNotification((prevNotifications) => 
            prevNotifications.filter(notification => notification.id !== id)
        );
    };

    const renderNotification = ({ item }) => (
        <Swipeable
            renderRightActions={() => (
                <View style = {styles.deleteBox}>
                    <Text style = {styles.deleteText}>Clear</Text>
                </View>
            )}
            onSwipeableOpen={() => handleSwipe(item.id)}
        >
            <View style = {styles.notificationBox}>
                <Text style = {styles.notificationTitle}>{item.title}</Text>
                <Text>{item.body}</Text>
            </View>
        </Swipeable>
    )
  return (
    <View style={styles.container}>
      <FlatList
        data = {notification}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNotification}
      />
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#121212',
        paddingTop: 75,
    },
    notificationBox: {
        padding: 20,
        backgroundColor: '#ccc',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    deleteBox: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
    },
    deleteText: {
        color: '#fff',
    },
    notificationTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
})
