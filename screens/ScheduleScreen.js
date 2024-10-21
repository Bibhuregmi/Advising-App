import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import CalendarComponent from '../components/Calendar'; // Existing calendar component
import { fetchEvents, addEvent, fetchSchedule } from '../utilities/fetchevents'; //utilities for fetching  and saving events
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ScheduleScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to the current date
  const [events, setEvents] = useState([]); // for storing fetched events
  const [scheduels, setSchedules] = useState([]); //for storing fetched schedules 
  const [loading, setLoading] = useState(true); //for loading state of events
  const [modalVisible, setModalVisible] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState(''); //new event title state
  const [newEventDescription, setNewEventDescription] = useState(''); //new event description state
  const [selectedTime, setSelectedTime] = useState(new Date()); //for time picker state
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // State for date picker visibility

  const course = "computerprogramming"; 

    //Fetches data from db when component mounts or when course changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try{
        const fetchedSchedule = await fetchSchedule(course);
        const fetchedEvent = await fetchEvents(course); 
        setSchedules(fetchedSchedule);
        setEvents(fetchedEvent);
      }catch (error){
        console.error('Error fetching schedule or events: ', error);
      }finally{
        setLoading(false); 
      }
    };
    fetchData();
  }, [course]); 

    //function to handle pressing a day on the calendar
    const handleDayPress = (date) => {
       setSelectedDate(date.dateString);
    };  
    
  //Adding event to firestore and fetching the updated event list
    const handleAddEvent = async () => {
      const newEvent = {
        title: newEventTitle,
        description: newEventDescription,
        date: selectedDate,
        time: selectedTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
      };
      await addEvent(course, newEvent);

      //Refreshing event after adding new event

      const updatedEvent = await fetchEvents(course);
      setEvents(updatedEvent);

      setModalVisible(false);
      setNewEventTitle('');
      setNewEventDescription('');
      setSelectedTime(new Date());
    };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const handleConfirm = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]); 
    setSelectedTime(date); // Capture the entire Date object for time
    hideDatePicker();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00'); //ensuring consistent timezone
    return date.toLocaleDateString();
  };

  //mark dates with events for calendar display
  const markedDates = {}; 
  scheduels.forEach(schedule => {
    schedule.days.forEach(day => {
      if (!markedDates[day]){
        markedDates[day] = {
          marked: true,
          customStyle:{
            container:{
              backgroundColor: 'blue',
            },
            text:{
              color: '#ffffff',
              fontWeight: 'bold',
            },
          },
        };
      }
    });
  });

  events.forEach(event => {
    if (event.date) {
      const date = event.date.split('T')[0];
      if (!markedDates[date]) {
        markedDates[date] = {
          marked: true,
          customStyles: {
            container: {
              backgroundColor: 'green',
            },
            text: {
              color: '#ffffff',
              fontWeight: 'bold',
            },
          },
        };
      }
    }
  });

 const currentItems = [
    ...scheduels.filter(schedule => schedule.days.includes(selectedDate)),
    ...events.filter(event => event.date === selectedDate)
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}> 

            {/* Calendar Component */}
            <CalendarComponent onDayPress={handleDayPress} markedDates={markedDates}/>

            {/* Session Details */}
           <ScrollView style = {styles.sessionDetails}>
              <Text style = {styles.header}>Items for {formatDate(selectedDate)}</Text>
              {loading ? (
                <Text style = {styles.loadingText}>Loading Schedule and Events......</Text>
              ) : (
                <>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <View key = {index} style = {styles.sessionCard}>
                      <Text style={styles.sessionTitle}>{item.title}</Text>
                      <Text style={styles.sessionDescription}>{item.description}</Text>
                      <Text style={styles.sessionTime}>{item.time}</Text>
                      <Text style={styles.sessionType}>
                        {item.hasOwnProperty('isPredefined') ? 'Schedule' : 'Event'}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noSessionText}>No items for today.</Text>
                )}
                </>
              )}
           </ScrollView>

            {/* Add event button */}
            <TouchableOpacity style= {styles.addButton} onPress={() => setModalVisible(true)}>
                <AntDesign name='plus' size={30} color= '#ffffff' />
            </TouchableOpacity>

            {/* Modal for adding event */}
            <Modal visible={modalVisible} animationType='fade' transparent= {true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Add New Event</Text>
                        <TextInput
                        style = {styles.input}
                        placeholder='Event Title'
                        placeholderTextColor='#ccc'
                        value={newEventTitle}
                        onChangeText={setNewEventTitle}
                        />
                        <TextInput
                        style={styles.input}
                        placeholder='Event Description'
                        placeholderTextColor='#ccc'
                        value={newEventDescription}
                        onChangeText={setNewEventDescription}
                        />
                       {/* DateTimePicker Trigger Button */}
                        <TouchableOpacity style={styles.button} onPress={showDatePicker}>
                            <Text style={styles.buttonText}>
                            {selectedTime ? `Selected: ${selectedDate} ${selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                            : 'Select Date and Time'}
                            </Text>
                        </TouchableOpacity>

                        {/* DateTimePicker */}
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="datetime"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            textColor="#000" // iOS text color customization
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleAddEvent}>
                            <Text style={styles.saveButtonText}>Save Event</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.saveButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.saveButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    },
    sessionTime: {
        color: '#aaaaaa',
        fontSize: 12,
        marginTop: 5,
    },
      sessionType: {
        color: '#ff6347',
        fontSize: 12,
        marginTop: 5,
        fontStyle: 'italic',
    },
    addButton:{
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#ff6347',
        borderRadius: 50,
        padding: 10,
    },
    addButtonText:{
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    modalView:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
    },

    modalContainer:{
        flex: 1,
        justifyContent: 'center', // Centers vertically
        alignItems: 'center', // Centers horizontally
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Transparent background
        padding: 20,
    },
    modalContent:{
        width: '80%', // Modal width
        height: '50%', // Modal height
        backgroundColor: '#1E1E1E', // Dark background
        borderRadius: 10, // Rounded corners
        padding: 20, // Internal padding
        justifyContent: 'center',
    },
    modalHeader:{
        color: '#ff6347',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input:{
        backgroundColor: '#333',
        color: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
        borderStyle: "solid",
        borderColor: "#ff6347",
        borderWidth: 1,
    },
    button: {
        backgroundColor: '#333',
        color: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
        borderStyle: "solid",
        borderColor: "#ff6347",
        borderWidth: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    saveButton:{
        backgroundColor: '#121212',
        padding: 15,
        borderRadius: 50,
        borderStyle: "solid",
        borderColor: "#38b6ff",
        borderWidth: 1,
        alignItems: 'center',
        marginTop: 25,
    },
    saveButtonText:{
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
  });
  
  export default ScheduleScreen;