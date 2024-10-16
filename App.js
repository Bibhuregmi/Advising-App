import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';  // Corrected import
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgetPassword';
import ScheduleScreen from './screens/ScheduleScreen';
import { addpredefinedEvents } from './utilities/addpredefinedEvents';

const App = () => {
  // useEffect (() => {
  //   const initializePredefinedEvents = async () => {
  //     await addpredefinedEvents();
  //   };
  //   initializePredefinedEvents();
  // }, []); this function add the data provided in the utilities folder to the firebase firestore



const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name = "Signup"
          component={SignupScreen}
          options={{headerShown: false}}
          />
        <Stack.Screen
         name = "ForgetPassword"
         component={ForgotPasswordScreen}
         options={{headerShown: false}}
        />

        <Stack.Screen
          name = "ScheduleScreen"
          component={ScheduleScreen}
          options={{headerShown: false}}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App; 