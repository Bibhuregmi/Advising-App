import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import PhoneInput from 'react-native-phone-number-input';

const ProfileCreateScreen = () => {
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [course, setCourse] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const courses = [
    'Computer Programming',
    'General Business',
    'Business Accounting',
    'Sales and Marketing'
  ];
  const genders = [
    'Male',
    'Female',
    'Other',
  ];
  const handleCreateProfile = () => {
    // Handle profile creation logic here
    console.log('Profile created');
  };
//   console.log('Selected Gender:', gender);
//   console.log('Available Genders:', genders);
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={require('../assets/icon.png')} // Make sure to add a default avatar image
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.changeAvatarButton}>
          <Text style={styles.changeAvatarText}>Change Picture</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
       <TouchableOpacity
       style = {styles.Genderbutton}
       onPress={() => setPickerVisible(!isPickerVisible)}
       >
        <Text style = {styles.buttonText}>
            {selectedGender == '' ? 'Select Gender' : selectedGender} 
        </Text>
       </TouchableOpacity>
       {isPickerVisible && (
        <Picker
            selectedValue = {gender}
            style = {styles.pickerGender}
            onValueChange={(itemValue) => {
                setGender(itemValue);       //Sets gender value
                setSelectedGender(itemValue); //Updates the button with selected gender
                setPickerVisible(false); //Hides the picker
            }}
        >
            <Picker.Item label = "Select Gender" value="Select Gender"/>
            {genders.map((g, index) => (
                <Picker.Item key={index} label={g} value={g}/>
            ))}
        </Picker>
       )}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <Picker
        selectedValue={course}
        style={styles.picker}
        onValueChange={(itemValue) => setCourse(itemValue)}
      >
        <Picker.Item label="Select a course" value="" />
        {courses.map((c, index) => (
          <Picker.Item key={index} label={c} value={c} />
        ))}
      </Picker>

      <PhoneInput
        defaultValue={phoneNumber}
        defaultCode="US"
        layout="first"
        onChangeFormattedText={(text) => setPhoneNumber(text)}
        containerStyle={styles.phoneInputContainer}
        textContainerStyle={styles.phoneInputText}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateProfile}>
        <Text style={styles.buttonText}>Create Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarText: {
    color: '#0782F9',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    height: 40,
    marginTop: 5,
    marginBottom: 10,
  },
  pickerGender: {
    backgroundColor: 'white',
    height: 40, 
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  picker: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  phoneInputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  phoneInputText: {
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  Genderbutton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
  },
  pickerGender:{
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
  }
});

export default ProfileCreateScreen;