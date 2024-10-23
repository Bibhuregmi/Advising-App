import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import ForgotPasswordScreen from "../screens/ForgetPassword";
import ScheduleScreen from "../screens/ScheduleScreen";
import HomeScreen from "../screens/homeScreen";
import TeamMembers from "../screens/developerinfo";
import EditProfile from "../screens/editprofile";
const stack = createNativeStackNavigator();

const AppNavigator = ({user, userData}) => {
    return(
        <stack.Navigator>
            {user ? (
                //if user is authenticated, shows the home screen follwed by other after the autentication
                <>
                    <stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{headerShown: false}}
                    />
                    <stack.Screen
                        name = "ScheduleScreen"
                        component={ScheduleScreen}
                        options={{headerShown: false}}
                        initialParams={{userData}}
                    />
                    <stack.Screen
                        name = 'EditProfile'
                        component={EditProfile}
                        options={{headerShown: false}}
                    />

                    <stack.Screen
                        name = "DevInfo"
                        component={TeamMembers}
                        options={{headerShown: false}}
                    />
                </>
            ) : (
                // else user will be prompeted to login to proceed
                <>
                    <stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{headerShown: false}}
                    />
                    <stack.Screen
                        name="Signup"
                        component={SignupScreen}
                        options={{headerShown: false}}
                    />
                    <stack.Screen
                        name="ForgotPassword"
                        component={ForgotPasswordScreen}
                        options={{headerShown: false}}
                    />
                    <stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{headerShown: false}}
                    />
                    <stack.Screen
                        name = 'EditProfile'
                        component={EditProfile}
                        options={{headerShown: false}}
                    />
                    <stack.Screen
                        name = "DevInfo"
                        component={TeamMembers}
                        options={{headerShown: false}}
                    />
                </>
            )}
        </stack.Navigator>
    );
};

export default AppNavigator; 

//this component handles the persitant login logic and the stack navigation