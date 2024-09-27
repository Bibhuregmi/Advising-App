import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/advisingLogo.png';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const validateForm = useCallback(() => {
    let newErrors = {};

    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  }, [email.password]);

  const handleLogin = useCallback(() => {
    if(validateForm()){
      //TODO: Will contain the authentication function
      console.log(`User ${email} logged in`)
      //TODO: Contains the navigation to the home page 
  } 
  }, [email,password]);

  const handleEmailChange = useCallback((text) => {
    // console.log('Email input is changing:', text);
    setEmail(text);
  }, []);

  const handlePasswordChange = useCallback((text) => {
    // console.log('Password input is changing:', text);
    setPassword(text);
  }, []);

  const memoisedLogo = useMemo(() => (
    <Image source={logo} style={styles.logo}/>
  ), []);
  console.log('LoginScreen componet is re-rendering');
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      {memoisedLogo}
        <Text style={styles.title}>Welcome to Advising App</Text> 
            <TextInput
              style = {styles.input}
              placeholder='Email'
              placeholderTextColor='#777'
              value = {email}
              onChangeText={handleEmailChange}
              keyboardType='email-address'
              autoCapitalize='none'
              />
            {errors.email && <Text style= {styles.errorText}>{errors.email}</Text>}

            <TextInput
              style = {styles.input}
              placeholder='Password'
              placeholderTextColor='#777'
              value = {password}
              onChangeText={handlePasswordChange}
              secureTextEntry
              />
            {errors.password && <Text style= {styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity style = {styles.button} onPress={handleLogin}>
                <Text style = {styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={{/*This will contain the navigation to the forget password screen*/}}>
                <Text style = {styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style = {styles.linkText}>Don't have an account? Signup</Text>
            </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  logo:{
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
},
container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    borderStyle: "solid",
    borderColor: "#38b6ff",
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#121212',
    padding: 15,
    borderRadius: 50,
    borderStyle: "solid",
    borderColor: "#38b6ff",
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  linkText: {
    color: '#38b6ff',
    marginTop: 15,
    textAlign: 'center',
  },
  errorText: {
    color: '#ff6b6b',
    marginBottom: 10,
},
});

export default React.memo(LoginScreen);