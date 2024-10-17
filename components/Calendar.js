import React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { CalendarList} from 'react-native-calendars';

const screenHeight = Dimensions.get('window').height;
const currentDate = new Date().toISOString().split('T')[0];

const CalendarComponent = ({ onDayPress, markedDates }) => {
    const renderEventLabels = (day) => {
    const events = markedDates[day]?.events || [];
    return events.map((event, index) => (
      <View key={index} style={styles.eventLabel}>
        <Text style={styles.eventText}>{event}</Text>
      </View>
    ));
  };
  return (
    <View style={styles.container}>
      <CalendarList
        style={{height: screenHeight}}
        current ={currentDate}
        onDayPress={onDayPress}
        pastScrollRange={12}
        futureScrollRange={12}
        scrollEnabled={true}
        showScrollIndicator= {false}
        hideExtraDays= {true}
        pagingEnabled= {true}
        calendarHeight={screenHeight}
        dayComponent = {({date, state}) =>{
          const day = date.dateString;
          return(
            <TouchableOpacity onPress={() => onDayPress(date)} style={{alignItems: 'center'}}>
              <Text
              style = {[
                state === 'disabled' ? styles.disabledDayText : styles.dayText,
                day == currentDate ? styles.currentDayText : {}, 
              ]}>
                {date.day}
              </Text>
              {renderEventLabels(day)}
              </TouchableOpacity>
          );
        }}
        //Theme setting for the calendar
        theme={{
          calendarBackground: '#121212',
          textSectionTitleColor: '#ffffff',
          dayTextColor: '#ffffff',
          todayTextColor: '#ff6347',
          arrowColor: '#ff6347',
          monthTextColor: '#ffffff',
          textDisabledColor: '#888888',
        }}
        markedDates={markedDates}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  calendar: {
    height: screenHeight,
  },
  dayText: {
    color: '#ffffff',
    fontSize: 16,
  },
  disabledDayText: {
    color: '#888888',
    fontSize: 16,
  },
  currentDayText:{
    color: '#ff6347',
    fontWeight: 'bold',
  },
  eventLabel: {
    backgroundColor: '#8A2BE2', // Purple background for events
    borderRadius: 5,
    paddingHorizontal: 3,
    marginVertical: 2,
  },
  eventText: {
    color: '#ffffff',
    fontSize: 12,
  },
});

// console.log("Calender Component rendered")
export default CalendarComponent;