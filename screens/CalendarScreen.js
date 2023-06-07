import React, {useState} from "react";
import {StyleSheet, View} from 'react-native';
import { CalendarProvider, ExpandableCalendar, TimelineEventProps, TimelineList} from "react-native-calendars";


const dummyEvents = {
    events: {
      '2023-06-01': [
        {
          start: '2023-06-01 09:20:00',
          end: '2023-06-01 12:00:00',
          title: 'Merge Request to React Native Calendars',
          summary: 'Merge Timeline Calendar to React Native Calendars',
        },
      ],
      '2023-06-01': [
        {
          start: '2023-06-01 08:00:00',
          end: '2023-06-01 20:00:00',
          title: 'TestEvent',
          summary: 'Description',
        },
      ],
    },
  };
  
export default CalendarScreen = () =>{
    
    return(
        <View style = {styles.mainContainer}>
            
            <CalendarProvider 
                date='2023-06-06'
                showTodayButton
                >
                <ExpandableCalendar
                    style = {styles.calendar}/>
                <TimelineList
                events = {dummyEvents.events}
                
                showNowIndicator
                timelineProps={{
                    format24h: true,
                    unavailableHours: [
                      { start: 0, end: 6 },
                      { start: 22, end: 24 },
                    ],
                    overlapEventsSpacing: 8,
                    rightEdgeSpacing: 24,
                  }}/>
            </CalendarProvider>
        </View>

    );
};

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
       
    },
    calendar:{
        backgroundColor: 'white',
    },
    calendarTheme:{
            backgroundColor: 'gray',
            calendarBackground: 'gray',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
    },
    renderItem:{
        height: 50,
        width: 80,
        backgroundColor: 'gray'
    }
});
