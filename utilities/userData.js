import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

export const storeUserData = async (userData) => {
    try{
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    }catch(error){
      console.error('Error saving user data:', error);
    }
};
export const getUserData = async() =>{
    try{
      const data = await AsyncStorage.getItem('userData');
      return data ? JSON.parse(data) : null;
    }catch(error){
      console.error('Error retrieving user data:', error);
      return null; 
    }
};
export const fetchUserDataFromFirestore = async (userId) => {
    if (userId){
        try{
            const docRef = doc(db, 'users', userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()){
                const data = docSnap.data();
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