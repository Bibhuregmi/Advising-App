
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_API_KEY, 
        FIREBASE_AUTH_DOMAIN, 
        FIREBASE_PROJECT_ID, 
        FIREBASE_STORAGE_BUCKET, 
        FIREBASE_MESSAGING_SENDER_ID, 
        FIREBASE_APP_ID 
    } from '@env';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Firebase services
const auth = initializeAuth(app, {
   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

// if (__DEV__){
//     console.log('FIREBASE API KEY: ', FIREBASE_API_KEY);
// }

export{ auth, db };
