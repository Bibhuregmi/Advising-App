import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log(`User with Email ${email} logged!`);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style = {styles.Welcometext}>Welcome to Advising app!</Text>
      <Text style = {styles.text}>Log in to your account </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Text style = {styles.text}>New to app?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  Welcometext:{
    marginBottom: 100,
    fontSize: 30,
    fontWeight: "bold",
    color : "#0782F9",
  },
  text: {
    marginBottom: 10,
    fontSize: 15,
    color : "#0782F9",
    fontWeight: "bold"
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default LoginScreen;