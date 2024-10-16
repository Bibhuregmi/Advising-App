import {collection, addDoc} from 'firebase/firestore';
import {db} from '../firebase'; 

export const addpredefinedEvents = async () => {
    const predefinedEvents = [
        {
            title: 'Programming 101',
            description: 'Fundamentals on programming',
            days: ['2024-10-15', '2024-10-22', '2024-10-28', '2024-11-04'],
            time: '10:00 AM - 1:00 PM'
        },
        {
            title: 'Data Structues and Algorithm',
            description: 'Detailed course on DS and Algorithm',
            days: ['2024-10-15', '2024-10-22', '2024-10-28', '2024-11-04'],
            time: '3:00 PM - 6:00 PM'
        },
    ];
    const predefinedRef = collection(db, 'course', 'computerprogramming', 'schedule');

    try{
        for(const event of predefinedEvents){
            await addDoc(predefinedRef, {
                title: event.title,
                description: event.description,
                days: event.days,
                time: event.time,
            });
        }
        console.log('Schedule are added to db successfully');
    } catch (error){
        console.error('Error adding schedule: ', error);
    }
   
}