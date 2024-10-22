import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';  // Corrected import
import { auth } from './firebase'; //firebase setup
import AppNavigator from './navigation/appNavigator'; //navigator component
import { onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addpredefinedEvents } from './utilities/addpredefinedEvents';
import { ActivityIndicator, View } from 'react-native';
import { fetchUserDataFromFirestore, storeUserData } from './utilities/userData';

const App = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); 

  useEffect (() => {
    const initializePredefinedEvents = async () => {
      try{
        const eventsAdded = await AsyncStorage.getItem('eventsAdded');
        if (!eventsAdded){
          await addpredefinedEvents();
          await AsyncStorage.setItem('eventsAdded', 'true'); //setting flag once the event has been added so that same event won't be added eveytime the app runs
        }
      } catch(error) {
        console.error('Error adding predefined events:', error);
      }
    };
    const setupAuthListner = () => {
      const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
        if (authUser){
          const userData = await fetchUserDataFromFirestore(authUser.uid);
          const userProfile = {
            firstName: userData.firstName || 'User',
            lastName: userData.lastName || 'User',
            profilePicture: userData.photoURL || null, 
            course: userData.course,
          };
          await storeUserData(userProfile);
          setUserData(userProfile);
          setUser(authUser);
        }else{
          setUser(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    }
    initializePredefinedEvents(); //call if only the events have not been added before
    const unsubscribeAuth = setupAuthListner();
    return () => unsubscribeAuth();
  }, []); 

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  
  return (
    <NavigationContainer>
      <AppNavigator user={user} userData={userData}/>
    </NavigationContainer>
  );
};



export default App; 