import React, {useState, useEffect} from 'react';
import { View, Text , StyleSheet, TouchableOpacity, Image, TextInput, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { fetchUserDataFromFirestore, updateUserDataInFirestore, uploadProfileImage} from '../utilities/userData';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



const EditProfile = ({navigation, user}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [gender, setGender] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [email,setEmail] = useState('');
    const [course, setCourse] = useState('');
    const [newProfileImage, setNewProfileImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingImage, setLoadingImage] = useState(true);
    const [imageUri, setImageUri] = useState(null);

    //function to request permission for accessing the device's media library for seleting images.
    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status!== 'granted'){
            alert('Permission to access photos is required to change the picture!');
        }
        return status === 'granted';  
    };
    //useEffect hook to load user data from the db on component mount and fetches profile info of the user
    useEffect(() => {
        const loadUserData = async () => {
            let parsedData = null;
            try{
                //fetching user data from cache so need to read data from db upon component mount
                const cachedUserData = await AsyncStorage.getItem('userData');
                if (cachedUserData){
                    parsedData = JSON.parse(cachedUserData);
                    setBio(parsedData.bio || '');
                    setFirstName(parsedData.firstName || '');
                    setLastName(parsedData.lastName || '');
                    setGender(parsedData.gender || "Not Specified");
                    setCourse(parsedData.course);
                    setEmail(parsedData.email);
                    if(parsedData.profileImage){
                        setProfileImage({uri:parsedData.profileImage});
                        setImageUri(parsedData.profileImage);
                    }
                    console.log('Loaded cached data');
                }
                //now fetching from db in background
                const userId = auth.currentUser.uid;
                const userData = await fetchUserDataFromFirestore(userId);
                if (userData) {
                    //if the cache data is not same as of the data in db, it updates the data in cache 
                    if (JSON.stringify(userData) !== JSON.stringify(parsedData)){
                        setBio(userData.bio || '');
                        setFirstName(userData.firstName || '');
                        setLastName(userData.lastName || '') ;
                        setGender(userData.gender || "Not Specified");
                        //loads the profile image if available, otherwise hides the loading indicator.
                        if (userData.profileImage){
                            setProfileImage({uri:userData.profileImage});
                            setImageUri(userData.profileImage);
                            setLoadingImage(false);
                            console.log('Profile Image {editProfile}:', userData.profileImage);
                        }else{
                            setLoadingImage(false);
                        }
                        setCourse(userData.course);
                        setEmail(userData.email);
                        await AsyncStorage.setItem('userData', JSON.stringify(userData));
                        console.log('Updated cache with new data from firestore');
                    }
                }
                console.log('User data: ', userData);
            }catch(error){
                console.log('Error fetching user data: ', error);
                setLoadingImage(false);
            }
        };
        loadUserData();
    }, []);

    //handles the profile image change by launching the image picker where user can choose image from thier gallery
    const handleImageChange = async () => {
      const hasPermission = await requestPermission();
      if (!hasPermission) return; 

      try{
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 0.5,
        });
        if(!result.canceled && result.assets && result.assets.length > 0){
            const selectedAsset = result.assets[0];
            console.log('selected image:', selectedAsset.uri);
            const imageUri = selectedAsset.uri;
            setProfileImage({uri: imageUri}); //updating the ui with the selected image.
            setNewProfileImage(imageUri); //storing new image uri for later upload
            console.log('Selected image URI:', imageUri);
        }
      }catch(error){
        console.log('error selecting image:',error);
        alert('error selecting image. contact dev');
      }
    };

    //function to handle submit on click, if a new profile image is selected, it is uploaded, and user details are also updated in db. 
    const handleSubmit = async() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user){
            alert('User is not logged in');
            return; 
        }
       try{
            setLoading(true);
            let updatedData = {
                bio,
                firstName,
                lastName,
                gender,
            };
            //if new image is selected, uploading to db and updating the db record
            if (newProfileImage){
                console.log('Uploading new profile image......', newProfileImage);
                try {
                    const imageUrl = await uploadProfileImage(newProfileImage, user.uid);
                    if (imageUrl){
                        updatedData.profileImage = imageUrl;
                        console.log('Image uploaded successfully:', imageUrl);
                    }
                } catch (error) {
                    console.error('Error uploading image:', error);
                    alert('Failed to upload profile image. Please try again.');
                    return;
                }
            }
            //updating the user's data in db and caching the new data AsyncStorage.
            await updateUserDataInFirestore(user.uid, updatedData);
            const cachedUserData = await AsyncStorage.getItem('userData');
            const parsedCachedData = cachedUserData ? JSON.parse(cachedUserData) : {};

            const newCachedData = {...parsedCachedData, ...updatedData,};
            await AsyncStorage.setItem('userData', JSON.stringify(newCachedData));
            alert ("Profile updated successfully!");

        }catch(error){
            console.log('Error changing the profile: ',error);
            alert('Error updating profile! Contact developer.')
       }finally{
        setLoading(false);
       }
    };

    //function to handle user signout and navigation to login.
    const signout = async () => {
        try{
            await signOut(auth);
            console.log('User signed out!!')
            navigation.navigate('Login');
        }catch (error){
            console.error('Error signing out:', error);
        }
    }

  return (
    <SafeAreaView style = {styles.container}>
        <View style={styles.pictureContainer}>
        <TouchableOpacity onPress={handleImageChange}>
            {loadingImage ? (
                  <ActivityIndicator size="large" color="#0000ff" /> 
            ):(
                <Image source = {profileImage} style = {styles.profileImage} />
            )}
           
        </TouchableOpacity>
        </View>
        <View style = {styles.row}>
        {/*Bio text input*/}
        <Text style = {styles.text}>About you:</Text>
        <TextInput
            style = {styles.input}   
            value={bio}
            onChangeText={setBio}
            placeholder='Enter your Bio'
        />
        </View>
        {/*Course text input*/}
        <View style = {styles.row}>
        <Text style = {styles.text}>Course:</Text>
        <TextInput                       
            style = {styles.input}
            value={course}
           editable= {false}
        />
        </View>
        {/*Email text input*/}
        <View style = {styles.row}>
        <Text style = {styles.text}>Email:</Text>
        <TextInput
            style = {styles.input}
            value={email}
            editable = {false}
        />
        </View>
        {/*FirstName text input*/}
        <View style = {styles.row}>
        <Text style = {styles.text}>FirstName:</Text>
        <TextInput
            style = {styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder='Firstname'
        />
        </View>
        {/*LastName text input*/}
        <View style = {styles.row}>
        <Text style = {styles.text}>LastName:</Text>
        <TextInput
            style = {styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder='LastName'
        />
        </View>
        {/*Gender picker*/}
        <View style = {styles.row}>
        <Text style = {styles.text}>Select Gender:</Text>
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
        </View>
        {/*Submit Button*/}
        <View style = {styles.buttonContainer}>
        <TouchableOpacity style = {styles.submitButton} onPress={handleSubmit}>
            <Text style = {styles.submitButtonText}>Submit Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.submitButton} onPress={signout}>
            <Text style = {styles.submitButtonText}>Signout</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        // alignItems: 'center',
        padding: 20,
    },
    pictureContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
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
        backgroundColor: "#1e1e1e",
        flex: 2,
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
        flex: 2,
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
        marginTop: 10,
        marginBottom: 10,
    },
    submitButtonText:{
        color: "#eee",
        fontSize: 16, 
        
    },
    row:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%',
    },
    text:{
        color:'#ccc',
        fontSize: 18,
        flex: 1, 
    },
    buttonContainer:{
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default EditProfile;