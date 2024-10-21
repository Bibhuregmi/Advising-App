import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import placeholderImage from '../assets/placeholder.png'; // Placeholder image

const HomeScreen = ({user}) => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect( () => {
        const fetchUserData = async () => {
            try {
                const cachedUserData = await AsyncStorage.getItem('userData');
                if (cachedUserData){
                   const parsedData = JSON.parse(cachedUserData);
                   console.log('Fetched user data: ', parsedData);
                   setUserData(parsedData);
                }else{
                    console.warn('NO user data found in AsyncStorage');
                }
            }catch (error){
                console.error('Error fetching user data: ', error);
            }finally{
                setLoading(false); 
            }
        };
        fetchUserData();
    }, []);
    if (loading){
        return(<Text>Loading.......</Text>);
    }
    const userName = userData?.firstName || 'User';
    return (
    <View style={styles.container}>
      {/* Profile Section */}
      <Image
        source={userData.profilePic ? { uri: userData.profilePic } : placeholderImage}
        style={styles.profileImage}
      />
      <Text style={styles.welcomeText}>Welcome {userName}!</Text>
      <Text style={styles.courseText}>{userData.course}</Text>

      {/* Navigation Icons */}
      <View style={styles.iconGrid}>
        <TouchableOpacity onPress={() => navigation.navigate('ScheduleScreen')}>
          <View style={styles.iconContainer}>
            <Icon name="calendar-outline" size={40} color="#000" />
            <Text style={styles.iconText}>Schedule</Text>
          </View>
        </TouchableOpacity>
        {/* Add more icons as needed */}
        {/* Repeat for other sections like Survey, Notifications, etc. */}
      </View>

      {/* Profile Edit Icon */}
    </View>
    );    
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    courseText: {
      fontSize: 18,
      color: '#666',
      marginBottom: 30,
    },
    iconGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      width: '80%',
    },
    iconContainer: {
      alignItems: 'center',
      margin: 20,
    },
    iconText: {
      marginTop: 10,
      fontSize: 16,
    },
    profileIcon: {
      position: 'absolute',
      top: 40,
      right: 20,
    },
}); 

export default HomeScreen;