import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleFirebaseErrors = (error) => {
    // console.error('Firebase Error:' , error);
    let errorMessage;
    switch (error.code){
        case 'auth/invalid-email':
            errorMessage = 'This is not a valid email address!';
            break;
        case 'auth/user-not-found':
            errorMessage = 'No user found with this email';
            break;
        default:
            errorMessage = 'Sorry an error occured :( '; 
    }
    setError(errorMessage);
};
  const handleEmailSubmit = async () => {
        if (email === ''){
            Alert.alert('Error', 'Please enter your email address.')
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email)
            .then(() => {
                setError('');
                Alert.alert('Password reset', 'Please check your mail for the password reset link.')
                navigation.goBack();
            })
            .catch(error => {
                handleFirebaseErrors(error);
            });
        } catch (error){
           handleFirebaseErrors(error);
        }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Forgot Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleEmailSubmit}>
          <Text style={styles.buttonText}>Send Reset Email</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>Back to Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = {
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
    borderStyle: 'solid',
    borderColor: '#38b6ff',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#121212',
    padding: 15,
    borderRadius: 50,
    borderStyle: 'solid',
    borderColor: '#38b6ff',
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
};

export default ForgotPasswordScreen;
