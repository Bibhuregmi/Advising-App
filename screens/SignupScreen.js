import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import logo from '../assets/advisingLogo.png';

const SignupScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [course, setCourse] = useState(''); 
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const courses = [
    'Computer Programming',
    'General Business', 
    'Business Accounting',
    'Sales and Marketing'
  ];

  //Form validation condition. 
  const validateForm = () => {
    let errors = {};

    if (!firstName) errors.firstName = 'First name is required';
    if (!lastName) errors.lastName = 'Last name is required';
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    if (!password) errors.password = 'Password is required';
    else if (password.length <= 6) errors.password = 'Passowrd must be more than 6 characters';
    if (password !== confirmPassword) errors.confirmPassword = `Password don't match`;
    if (!course) errors.course = 'Please select a course';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  const handleSignup = () => {
    // This function will also have firebase functionality

    //If the form validation is passed, user will be navigated to the Login Screen
    if(validateForm()){
        console.log('New account has been created');
        navigation.navigate('Login');
    } 
  };

  return (
   <KeyboardAvoidingView style = {styles.container} behavior='padding'>
    <ScrollView contentContainerStyle= {styles.scrollContainer}>
        <Image
            source = {logo} style = {styles.logo}
        />
        <Text style = {styles.title}>Create New Account</Text>

        <TextInput
         style = {styles.input}
         placeholder='First Name'
         placeholderTextColor='#777'
         value = {firstName}
         onChangeText={setFirstName}
            />
        {errors.firstName && <Text style = {styles.errorText} > {errors.firstName}</Text>}

        <TextInput
         style = {styles.input}
         placeholder='Last Name'
         placeholderTextColor='#777'
         value = {lastName}
         onChangeText={setLastName}
            />
        {errors.lastName && <Text style = {styles.errorText} > {errors.lastName}</Text>}

        <TextInput
         style = {styles.input}
         placeholder='Email'
         placeholderTextColor='#777'
         value = {email}
         onChangeText={setEmail}
         keyboardType='email-address'
         autoCapitalize='none'
            />
        {errors.email && <Text style = {styles.errorText} > {errors.email}</Text>}

        <TextInput
         style = {styles.input}
         placeholder='Password'
         placeholderTextColor='#777'
         value = {password}
         onChangeText={setPassword}
         secureTextEntry
            />
        {errors.password && <Text style = {styles.errorText} > {errors.password}</Text>}

        <TextInput
         style = {styles.input}
         placeholder='Confirm Password'
         placeholderTextColor='#777'
         value = {confirmPassword}
         onChangeText={setConfirmPassword}
         secureTextEntry
            />
        {errors.confirmPassword && <Text style = {styles.errorText} > {errors.confirmPassword}</Text>}

        <View style={styles.pickerContainer}>
            <Picker
                selectedValue={course}
                style = {styles.picker}
                onValueChange={(itemValue) => setCourse(itemValue)}
                dropdownIconColor='#fff'
                >
                    <Picker.Item label='Select a course' value="" color='#fff'/>
                    {courses.map((c, index) => (
                        <Picker.Item key={index} label={c} value={c} color='#fff' />
                    ))}                    
            </Picker>
        </View>
        {errors.course && <Text style= {styles.errorText} >{errors.course}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Log in</Text>
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
      pickerContainer: {
        height: 50, 
        backgroundColor: '#333',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
        justifyContent: 'center', 
        borderStyle: "solid",
        borderColor: "#38b6ff",
        borderWidth: 1,
        overflow: 'hidden'
      },
      picker: {
        color: '#fff',
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

export default SignupScreen;