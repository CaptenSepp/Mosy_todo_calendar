import React, { useContext, useState } from "react";
import { StyleSheet, View, StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { CalendarProvider, ExpandableCalendar, TimelineEventProps, TimelineList } from "react-native-calendars";
import { Colors } from "../../styles/Colors";
import { DataContext } from "../../data/DataContext";
import { tasksToEvents } from "../../functions";
import { colorHandler } from "../../functions";


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
  },
};

export default CalendarScreen = () => {

  const [data] = useContext(DataContext);

  const tasksToEvents = (tasks) =>{
  
    const formatDate = (date) =>{
      //format date from dd-mm-yyyy to yyyy-mm-dd
      const parts = date.split("-");
      const formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
      return formattedDate
    };

    const taskToEvent = (task,color) => {
      const formattedDate = formatDate(task.date);
      // Assigning properties to the eventObject
      const eventObject = {
          id: task.id,
          start: formattedDate + ' ' + task.starttime,
          end: formattedDate + ' ' + task.endtime,
          title: task.name,
          summary: task.description,
          color: color
        };
        return eventObject
  };

  const eventList = {
    events: {},
  };
  
  // Iterate over each task and convert it to an event
  tasks.forEach((task) => {
    //get Project of Task
    const currentProject = data.projectData.find(project =>project.projectId == task.projectId);
    // get corresponding color
    const color = colorHandler(currentProject.color).secondary;
    // convert Task to event
    const event = taskToEvent(task,color);
    const eventName = formatDate(task.date);
    // Check if the eventName already exists in eventList.events
    if (eventList.events[eventName]) {
      eventList.events[eventName].push(event);
    } else {
      eventList.events[eventName] = [event];
    }
  });

  return eventList;
};
  // create events from taskData
  const events = tasksToEvents(data.taskData);

  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null;
  }

  return (
    <View style={styles.mainContainer}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor={Colors.backgroundHeader} />
      <CalendarProvider
        date='2023-06-05'
        showTodayButton
      >
        <ExpandableCalendar
          style={styles.calendar} />
        <TimelineList
          events={events.events}

          showNowIndicator
          timelineProps={{
            format24h: true,
            unavailableHours: [
              { start: 0, end: 6 },
              { start: 22, end: 24 },
            ],
            overlapEventsSpacing: 8,
            rightEdgeSpacing: 24,
          }} />
      </CalendarProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,

  },
  calendar: {
    backgroundColor: 'white',
  },
  calendarTheme: {
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
  renderItem: {
    height: 50,
    width: 80,
    backgroundColor: 'gray'
  }
});
