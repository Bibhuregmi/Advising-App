import { getFirestore, collection, doc, getDocs, addDoc, Timestamp } from "firebase/firestore";

//utility to fetch schedule form db
export const fetchSchedule = async (course) => {
    try{
        const db = getFirestore();
        const courseRef = doc(db, 'course', course);
        const scheduleRef = collection(courseRef, 'schedule');

        const scheduleSnapshot = await getDocs(scheduleRef);
        const scheduels = scheduleSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date: formatDate(doc.data().date),
            time: formatTime(doc.data().time),
        }));

        console.log('Fetched Schedule: ',scheduels);
        return scheduels;
    }catch(error){
        console.error("Error fetching the schedule", error);
        return [];
    }
}

//utility to fetch events from db
export const fetchEvents = async (course) => {
    try{
        const db = getFirestore();
        const courseRef = doc(db, 'course', course);
        const eventRef = collection(courseRef, 'event');

        const eventSnapshot = await getDocs(eventRef);
        const events = eventSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date: formatDate(doc.data().date),
            time: formatTime(doc.data().time),
        }));
        console.log('Fetched events:', events);
        return events; 
    }catch (error){
        console.error("error fetching the events:", error);
        return [];
    }
}

//utility to add new user event to db
export const addEvent = async (course, event) => {
    try{
        const db = getFirestore();
        const courseRef = doc(db, 'course', course);
        const eventRef = collection(courseRef, 'event');

       const newEvent = {
        title: event.title,
        description: event.description,
        date: Timestamp.fromDate(new Date(event.date)),
        time: event.time, 
       };
        await addDoc(eventRef, newEvent);
        console.log('Event successfully added to db');
    }catch (error){
        console.error('Error adding event to db :(', error);
    }
};

//function to format dates

const formatDate = (date) => {
    return date instanceof Timestamp ? date.toDate().toISOString().split('T')[0] : date; 
}

const formatTime = (time) => {
    return time instanceof Timestamp ? time.toDate().toLocaleTimeString([], {hour: '2-digit', minute: "2-digit"}) : time; 
  
}