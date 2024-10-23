import React, {useState, useEffect} from 'react';
import { View, Text , StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import placeholderImage from '../assets/placeholder.png';

const EditProfile = () => {
    const [firstName, setFirstName] = useState('Bibhushit');
    const [lastName, setLastName] = useState('Regmi');
    const [bio, setBio] = useState('Student at Niagara College');
    const [gender, setGender] = useState('Undefined');
    const [profileImage, setProfileImage] = useState(placeholderImage);
    const[email,setEmail] = useState('bibhu@gmail.com');
    const[course, setCourse] = useState('Computer Programming');

    const handleImageChange = () => {
        //logic for changing the profile picture of the user
        console.log('Profile Changed!');
    }
    const handleSubmit = () => {
        //logic to update the user profile in the db
        console.log('User profile update:', {firstName,lastName,bio,gender,profileImage});
    }

  return (
    <SafeAreaView style = {styles.container}>
        <TouchableOpacity onPress={handleImageChange}>
            <Image source = {profileImage} style = {styles.profileImage}/>
        </TouchableOpacity>
        {/*Bio text input*/}
        <TextInput
            style = {styles.input}   
            value={bio}
            onChangeText={setBio}
            placeholder='Bio'
        />
        {/*Course text input*/}
        <TextInput                       
            style = {styles.input}
            value={course}
           editable= {false}
        />
        {/*Email text input*/}
        <TextInput
            style = {styles.input}
            value={email}
            editable = {false}
        />
        {/*FirstName text input*/}
        <TextInput
            style = {styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder='Firstname'
        />
        {/*LastName text input*/}
        <TextInput
            style = {styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder='LastName'
        />
        {/*Gender picker*/}
        <View style = {styles.pickerContainer}>
            <Picker
                 selectedValue = {gender}
                 style = {styles.picker}
                 onValueChange = {(itemValue) => setGender(itemValue)}
            >
               <Picker.Item label = "Select Gender" value="Not Specified" color='#ccc'/>
               <Picker.Item label = "Male" value= "Male" color='#ccc'/>
               <Picker.Item label = "Female" value = "Female" color='#ccc'/>
               <Picker.Item label='Others' value="Others" color='#ccc'/>
            </Picker>
        </View>
        {/*Submit Button*/}
        <TouchableOpacity style = {styles.submitButton} onPress={handleSubmit}>
            <Text style = {styles.submitButtonText}>Submit Changes</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        padding: 20,
    },
    profileImage:{
       width: 250,
       height: 250, 
       borderRadius: 125,
       marginBottom: 20,
       borderWidth: 2, 
    },
    input:{
        width: "100%",
        borderWidth: 1,
        borderColor: '#38b6ff',
        padding: 10,
        marginBottom: 15, 
        borderRadius:8,
        color: '#ccc',
        backgroundColor: "#1e1e1e"
    },
    pickerContainer:{
        width: '100%',
        height: 50, 
        borderWidth: 1,
        borderColor: '#38b6ff',
        marginBottom: 15,
        borderRadius: 8,
        justifyContent: "center",
        overflow: 'hidden',
        backgroundColor: "#1e1e1e",
    },
    picker:{
        color: 'white',
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: "#1e1e1e",
    },
    submitButton:{
        backgroundColor: "#38b6ff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8, 
        borderColor: '#1e1e1e',
        borderWidth: 1,
        width: '75%',
        alignItems: 'center',
        marginTop: 100,
    },
    submitButtonText:{
        color: "#eee",
        fontSize: 16, 
        
    }
})
export default EditProfile;