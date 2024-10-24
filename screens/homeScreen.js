import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import placeholderImage from '../assets/placeholder.png'; // Placeholder image
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchUserDataFromFirestore } from '../utilities/userData';
import { getAuth } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const HomeScreen = ({user}) => {
    //states for the userdata, loading, profileimage
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const navigation = useNavigation();

    //using foucs effect to re-fetch data when ever the screen comes to focus
   useFocusEffect(
    useCallback( () =>{
        const fetchUserData = async () => {
            try{
                //fetching user data from cache
                const cachedUserData = await AsyncStorage.getItem('userData');
                if (cachedUserData) {
                    const parsedData = JSON.parse(cachedUserData);
                    console.log('Fetched user Data: ', parsedData); 
                    setUserData(parsedData); //updating state with cached data
                    console.log('Profile Image url:', userData.profileImage);
                    //check if user have a profile image and setting it
                    if(parsedData.profileImage) {
                        setProfileImage(parsedData.profileImage);
                    }
                }else{
                    console.error('No user data is found in AsyncStorage') //error message
                }
                //getting the current authenticated user
                const auth = getAuth();
                const user = auth.currentUser;
                if(user){
                    const userId = user.uid;
                    const updatedUserData = await fetchUserDataFromFirestore(userId); //fetching data from firestore
                    if (updatedUserData && updatedUserData.profileImage){
                        setProfileImage(updatedUserData.profileImage); //updating profile image with the latest profile image update from db
                    }
                }
            }catch(error){
                console.error('Error fetching user data or profile image:', error);
            }
            finally{
                setLoading(false);
            }
        };
        fetchUserData();
    }, [navigation])
   );

    if (loading){
        return(<Text>Loading.......</Text>);
    }
    const userName = userData?.firstName || 'User';

    //function to get the dynamic greeting message based on the time of the day
    const getGreetingMessage = () => {
        const currentHour = new Date().getHours();
        let greeting = '';
        if (currentHour < 12){
            greeting = "Good Morning";
        }else if (currentHour < 18){
            greeting = "Good Afternoon";
        }else{
            greeting = "Good Evening"
        }
        return `${greeting}!`;
    } 
    return (
    <SafeAreaView style={styles.container}>
        {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}></Text>
        <TouchableOpacity style={styles.home} onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Advising App</Text>
        <TouchableOpacity style={styles.editProfileIcon} onPress={() => navigation.navigate('EditProfile')}>
          <Icon name="pencil-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
    <View style={styles.container}>
      {/* Profile Section */}
      <Image
        source={userData.profileImage ? { uri: userData.profileImage } : placeholderImage}
        style={styles.profileImage}
      />
      <Text style={styles.welcomeText}>{getGreetingMessage()}</Text>
      <Text style={styles.name}>{userName}</Text>
      <Text style={styles.courseText}>{userData.course}</Text>

      {/* Navigation Icons */}
    <View style={styles.iconGrid}>
        {/*First Row*/}
    <View style = {styles.iconRow}> 
        <TouchableOpacity onPress={() => navigation.navigate('ScheduleScreen')}>
          <View style={styles.iconContainer}>
            <Icon name="calendar-outline" size={40} color="#ccc" />
            <Text style={styles.iconText}>Schedule</Text>
          </View>
        </TouchableOpacity>
        {/* Discussion */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}> 
            <View style = {styles.iconContainer}>
                <Icon name = "chatbubbles-outline" size ={40} color = '#ccc' />
                <Text style = {styles.iconText}>Discussion</Text>
            </View>
        </TouchableOpacity> 
         {/* Notification */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style = {styles.iconContainer}>
                <Icon name = "notifications-outline" size ={40} color = '#ccc' />
                <Text style = {styles.iconText}>Notification</Text>
            </View>
        </TouchableOpacity>
        </View>
        {/*Second Row*/}
        <View style = {styles.iconRow}>
         {/* Survey Icon */}
         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style = {styles.iconContainer}>
                <Icon name = "clipboard-outline" size ={40} color = '#ccc' />
                <Text style = {styles.iconText}>Survey</Text>
            </View>
        </TouchableOpacity>
         {/* Map */}
         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style = {styles.iconContainer}>
                <Icon name = "location-outline" size ={40} color = '#ccc' />
                <Text style = {styles.iconText}>Map</Text>
            </View>
        </TouchableOpacity>
        {/*Resources*/}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style = {styles.iconContainer}>
                <Icon name = "book-outline" size ={40} color = '#ccc' />
                <Text style = {styles.iconText}>Resources</Text>
            </View>
        </TouchableOpacity>
        </View>

         {/*Third Row*/}
         <View style = {styles.iconRow}>
         {/*Course Outcome*/}
         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style = {styles.iconContainer}>
                <Icon name = "analytics-outline" size ={40} color = '#ccc' />
                <Text style = {styles.iconText}>Course Outcome</Text>
            </View>
        </TouchableOpacity>
         {/* Map */}
         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style = {styles.iconContainer}>
                <Icon name = "map-outline" size ={40} color = '#ccc' />
                <Text style = {styles.iconText}>College Tour</Text>
            </View>
        </TouchableOpacity>
        {/*Resources*/}
        <TouchableOpacity onPress={() => navigation.navigate('DevInfo')}>
            <View style = {styles.iconContainer}>
                <Icon name = "logo-github" size ={40} color = '#ccc' />
                <Text style = {styles.iconText}>Developer Info</Text>
            </View>
        </TouchableOpacity>
        </View>
    </View>
    </View>
    </SafeAreaView>
    );    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'felx-start',
        backgroundColor: '#121212',
        paddingTop: 75,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#121212',
        position: 'absolute',
        top: 75,
        zIndex: 1,
      },
    home:{},
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#38b6ff',
        textAlign: 'center',
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: -30 }],
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        color: 'white',
    },
    name:{
        fontSize: 20,
        color: "#38b6ff",
        fontWeight: 'bold'
    },
    courseText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 30,
    },
    iconGrid: {
        width: '72.3%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 10,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center', 
        width: 120, 
        height: 120, 
        borderWidth: 2, 
        borderColor: '#38b6ff', 
        borderRadius: 10, 
        backgroundColor: '#1e1e1e',
        marginHorizontal: 10,
        paddingTop: 20,
    },
    iconText: {
        marginTop: 10,
        fontSize: 12,
        color: '#ccc',
        fontWeight: 'condensed',
    },
    profileIcon: {
        position: 'absolute',                                                                                                                                                                                           
        top: 40,
        right: 20, 
    },
    editProfileIcon: {
       marginLeft: 'auto',
    },    
}); 

export default HomeScreen;