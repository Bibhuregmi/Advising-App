import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';  // Corrected import
import { auth } from './firebase'; //firebase setup
import AppNavigator from './navigation/appNavigator'; //navigator component
import { onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addpredefinedEvents } from './utilities/addpredefinedEvents';
import { ActivityIndicator, View } from 'react-native';
import { fetchUserDataFromFirestore, storeUserData } from './utilities/userData';
import * as Notifications from 'expo-notifications';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  //states and variables 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); 

  useEffect (() => {
    const initializePredefinedEvents = async () => {
      try{
        //checking if predefined events have already been added
        const eventsAdded = await AsyncStorage.getItem('eventsAdded');
        if (!eventsAdded){
          await addpredefinedEvents(); //adding if only it has not been added
          await AsyncStorage.setItem('eventsAdded', 'true'); //setting flag once the event has been added so that same event won't be added eveytime the app runs
        }
      } catch(error) {
        console.error('Error adding predefined events:', error);
      }
    };
    //firebase listner that triggers when auth state changes (logic of persistance login)
    const setupAuthListner = () => {
      const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
        if (authUser){
          const userData = await fetchUserDataFromFirestore(authUser.uid); //fetching user data in basis of uid
          const userProfile = {  //user profile object
            firstName: userData.firstName || 'User',
            lastName: userData.lastName || 'User',
            profileImage: userData.profileImage || null, 
            course: userData.course,
          };
          await storeUserData(userProfile); //storing user data locally for easy access
          setUserData(userProfile); //setting user data in local state to use within app
          setUser(authUser); //setting authenticated user in state
        }else{
          console.error('Error fetching user data:');
          setUser(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    }
    const requestPermission = async () => {
      const {status} = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Notification permission not granted');
      }
    };
    requestPermission();
    initializePredefinedEvents(); //call if only the events have not been added before
    const unsubscribeAuth = setupAuthListner();
    return () => unsubscribeAuth(); //cleans listner when the component unmounts
  }, []); 

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  //rendering navigation
  return (
    <GestureHandlerRootView style= {{flex:1}}>
    <NavigationContainer>
      <AppNavigator user={user} userData={userData}/>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};



export default App; 