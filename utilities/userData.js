import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Platform } from "react-native";
import { storage } from "../firebase";

//function to store user data in cache (local storage or AsyncStorage)
export const storeUserData = async (userData) => {
    try{
      await AsyncStorage.setItem('userData', JSON.stringify(userData)); //saving user data
    }catch(error){
      console.error('Error saving user data:', error);
    }
};

//function to retrive user data from cache
export const getUserData = async() =>{
    try{
      const data = await AsyncStorage.getItem('userData'); //fetching the user data from the cache
      return data ? JSON.parse(data) : null; //if the data exists, parse data to object, otherwise returns null
    }catch(error){
      console.error('Error retrieving user data:', error);
      return null; 
    }
};

//function to fetch user from db based on userId
export const fetchUserDataFromFirestore = async (userId) => {
    if (userId){
        try{
            const docRef = doc(db, 'users', userId); //referncing user's doucment in the collection
            const docSnap = await getDoc(docRef); //creating snapshot of the document

            if (docSnap.exists()){
                const data = docSnap.data(); //extracting data if the document exists
                console.log('User docment data: ', data);
                return data; //returns the user data
            }else{
                console.log('No such document!');
                return {};
            }
        }catch (error){
            console.error('Error fetching data form firestore:', error);
            return null;
        }
    }else{
        console.error('User id is not provided');
        return null; 
    }
};

//function to update user data in firestore
export const updateUserDataInFirestore = async (userId, updatedData) => {
    try{
        const userRef = doc (db, 'users', userId); //referncing user's doucment in the collection
        await updateDoc (userRef, updatedData); //updating  document with  the new data passed
        console.log('User data updated successfully in Firestore');
    }catch (error){
        console.error('Error updating user data: ', error);
    }
};

//function to upload profile image to firebase storage and getting the download url
export const uploadProfileImage = async (imageUri, userId) => {
  try{
    const uri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri; //ios uri contais 'file://', which needs to be removed
    //fetching the image file from the provided uri
    const response = await fetch(imageUri);
    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`); //throws error if fetching fails
    }
    const blob = await response.blob(); //converting fetched image data into blob (binary large object)
    const timestamp = new Date().getTime();  //creating a unique file name based on current timestamp
    const storageRef = ref(storage, `profileImages/${userId}/profile_${timestamp}.jpg`); //creating referene to the file in firebase storage
    const snapshot = await uploadBytes(storageRef, blob); //uploadind blob (image) to storage
    console.log('Image uploaded successfully');

    const downloadUrl = await getDownloadURL(snapshot.ref); //getting download url after successful upload
    console.log('Download URL:', downloadUrl);
    return downloadUrl;
  }catch(error){
    console.error('Error in uploadProfileImage:', error);
    throw error; 
  }
};