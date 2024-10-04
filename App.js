import React from 'react';
import { NavigationContainer } from '@react-navigation/native';  // Corrected import
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgetPassword';


const Stack = createNativeStackNavigator();

export default function App() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
