import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import CalendarComponent from '../components/Calendar'; // Existing calendar component
import { fetchEvents } from '../utilities/fetchevents'; //utilities for fetching events

const ScheduleScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [sessions, setSessions] = useState([]); // for storing fetched events
  const [loading, setLoading] = useState(true); //for loading state

  const course = "computerprogramming"; 

  useEffect(() =>{
    const fetchData = async () => {
        setLoading(true); 
        const events = await fetchEvents(course);
        setSessions(events); 
        setLoading(false); 
    };
    fetchData();

  }, [course]);

  const handleDayPress = (day) => {
    const selectedDay = day.dateString;
    setSelectedDate(selectedDay);

    const currentSessions = sessions.filter(session => session.days.includes(selectedDate));
    if (currentSessions.length === 0){
    const nearestSession = findNearestSession(selectedDate);
    if(nearestSession){
        setSelectedDate(nearestSession);
    }
  }
  };

  const findNearestSession = (selectedDay) =>{
    const today = new Date(selectedDay).getTime();
    let nearestSession = null;
    let nearestDaysDifference = Infinity;

    sessions.forEach(session => {
        session.days.forEach(day => {
            const sessionDate = new Date(day).getTime();
            const daysDifference = (sessionDate - today) / (1000*3600*24);
            if(daysDifference > 0 && daysDifference < nearestDaysDifference){
                nearestSession = day; 
                nearestDaysDifference = daysDifference;
            }
        });
    });
    return nearestSession;
  }
  
  const getDaysfromNow = (date) => {
    const today = new Date(selectedDate);
    const sessionDate = new Date(date);
    const timeDifference = sessionDate.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000* 3600 *24));
    return daysDifference;
  }
  const markedDates = {};
  sessions.forEach(session => {
    const date = session.date; //date is in 'YYYY-MM-DD' format
    if (!markedDates[date]) {
      markedDates[date] = {
        marked: true,
        customStyles: {
          container: {
            backgroundColor: 'transparent',
          },
          text: {
            color: '#ffffff',
            fontWeight: 'bold',
          },
        },
        events: [], // Initialize events array
      };
    }
    markedDates[date].events.push(session.title); 
  });
  const safeMarkedDates = markedDates || {}; 
  const currentSessions = sessions.filter(session => session.days.includes(selectedDate));
  const upcomingSessions = sessions.filter(session => session.days.some(day => day > selectedDate)); // Updated to check any day in the future
//   // Dummy session data - replace this with actual data fetching logic later
//   const getSessionDetails = (date) => {
//     const allSessions = [
//       { date: '2024-10-16', title: 'Networking Fundamentals', description: 'Learn the basics Networking and OS' },
//       { date: '2024-10-16', title: 'Java Masterclass', description: 'Hands-on session on Java' },
//     ];
//     return allSessions.filter(session => session.date === date);
//   };

//   const currentSessions = getSessionDetails(selectedDate);
//   const upcomingSessions = sessions.filter(session => session.date > selectedDate); // Example upcoming session logic

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <CalendarComponent onDayPress={handleDayPress} markedDates={safeMarkedDates}/>
      <ScrollView style={styles.sessionDetails}>
        <Text style={styles.header}>Sessions for {selectedDate}</Text>
        {loading ? (
            <Text style ={styles.loadingText}>Loading Sessions.....</Text>
        ) : currentSessions.length > 0 ? (
          currentSessions.map((session, index) => (
            <View key={index} style={styles.sessionCard}>
              <Text style={styles.sessionTitle}>{session.title}</Text>
              <Text style={styles.sessionDescription}>{session.description}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noSessionText}>No sessions for today. {upcomingSessions.length > 0 ? 'Showing nearest upcoming session:' : 'No upcoming events.'}</Text>
        )}
        {upcomingSessions.length > 0 && upcomingSessions.map((session, index) => {
            const nextSessionDay = session.days.find(day => day > selectedDate);
            return(
                <View key={index} style={styles.sessionCard}>
                <Text style={styles.sessionTitle}>{session.title}</Text>
                <Text style={styles.sessionDescription}>{session.description}</Text>
                {nextSessionDay && (
                  <Text style={styles.sessionDaysAway}>
                    {getDaysfromNow(nextSessionDay)} days from today.
                  </Text>
                )}
              </View>
            );
        })}
      </ScrollView>
    </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#121212',
    },
    container: {
      flex: 1,
      backgroundColor: '#121212',
    },
    sessionDetails: {
      flex: 1,
      padding: 16,
    },
    header: {
      color: '#ffffff',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    sessionCard: {
      backgroundColor: '#1E1E1E',
      padding: 16,
      borderRadius: 8,
      marginBottom: 10,
    },
    sessionTitle: {
      color: '#ff6347',
      fontSize: 16,
      fontWeight: 'bold',
    },
    sessionDescription: {
      color: '#ffffff',
      fontSize: 14,
    },
    noSessionText: {
      color: '#888888',
      fontSize: 14,
      marginBottom: 10,
    },
    sessionDaysAway:{
        color: "#ff6347",
        fontSize: 10,
        marginTop: 5,
    },
    loadingText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
      }
  });
  
  export default ScheduleScreen;