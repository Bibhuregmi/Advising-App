import { getFirestore, collection, doc, getDocs } from "firebase/firestore";

export const fetchEvents = async (course) => {
    try{
        const db = getFirestore(); 
        const courseRef = doc(db, 'course', course);
        const scheduleRef = collection(courseRef, 'schedule');
        const snapshot = await getDocs(scheduleRef);

        const events = snapshot.docs.map(doc =>({
            id: doc.id,
            ...doc.data(),
        }));
        console.log('Fetched Events: ', events);
        return events; 
    }catch (error){
        console.error('Error fetching events: ', error);
        return []; 
    }
}