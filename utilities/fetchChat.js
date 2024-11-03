import { getFirestore, collection, doc, onSnapshot, addDoc, Timestamp } from "firebase/firestore";

//function to fetch chat messages from db
export const fetchChatMessages = async (course) => {
    try{
        const db = getFirestore();
        const courseRef = doc (db, 'course', course);
        const chatRef = collection(courseRef, 'chat');

        const chatSnapshot = await getDocs(chatRef); //fetch all documents in the 'chat' subcollection
        const chatMessages = chatSnapshot.docs.map(doc => ({
            id: doc.id, //extract unique document id
            ...doc.data(), //spread the data into object
            timestamp: data.Timestamp ? formatTime(data.timestamp) : 'No time stamp available',
        }));
        console.log('Fetched chat Messages: ', chatMessages);
        return chatMessages; //returns the array of the chat message
    }catch(error){
        console.error('Error fetching chat messages', error);
        return []; //returning empty array if error
    }
}

//function to setup a real-time listner for chat messages
export const setupChatListner = (course, callback) => {
    try{
        const db = getFirestore();
        const chatCollectionRef = collection(db, 'course', course, 'chat');

        //Listen for realtime updates on chat subcollection
        const unsubscribe = onSnapshot(chatCollectionRef, (snapshot) => {
            if(!snapshot.empty){
                //Map over documents and create an array of message objects if it not empty
                const message = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                message.sort((a,b) => a.timestamp.seconds - b.timestamp.seconds); //sorting the messages by time stamp to maintain chornological order
                callback(message); //passing sorted message into callback
            }else{
                console.warn('No message found in chat collecion');
                callback([]);
            }
        });
        return unsubscribe;
    }catch(error){
        console.error('Listner setup gareko milena!!!!!', error);
        return null; 
    }
};

//function to send chat messages
export const sendMessage = async (course, messageContent) => {
    try{
        const db = getFirestore();
        const courseRef = doc(db, 'course', course);
        const chatRef = collection(courseRef, 'chat');
        //constructing new message object with the content and current timestamp
        const newMessage = {
            message: messageContent, //message content provided as argument
            timestamp: Timestamp.now(), //timestamp using firestore's timestamp object
        };
        await addDoc(chatRef, newMessage); //adds new message as a document in the chat collection
        console.log('Message sent successfully!');
    }catch(error){
        console.error('Error sending message!', error);
    }
};

const formatTime = (time) => {
    return time instanceof Timestamp ? time.toDate().toLocaleTimeString([], {hour: '2-digit', minute: "2-digit"}) : 'Invalid time'; 
}