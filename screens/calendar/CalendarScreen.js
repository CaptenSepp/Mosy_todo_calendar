import React, { useContext, useState, useRef } from "react";
import { StyleSheet, View, StatusBar, Text, Animated } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { CalendarProvider, ExpandableCalendar, TimelineEventProps, TimelineList } from "react-native-calendars";
import Timer from "../../components/timerComponent";

import { Colors } from "../../styles/Colors";
import { DataContext } from "../../data/DataContext";
import { tasksToEvents } from "../../functions";
import { colorHandler } from "../../functions";
import moment from "moment";

import { timelineEvents, getDate } from '../../functions';
import { getTheme } from "../../styles/CalendarTheme";

export default CalendarScreen = () => {

  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useState(new Animated.Value(0))[0];
  const animatedOpacity = useState(new Animated.Value(0))[0];

  const toggleExpand = () => {
    if (expanded) {
      // Collapse animation
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start(() => setExpanded(false));
    } else {
      // Expand animation
      setExpanded(true);
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 160, // Adjust the expanded height as needed
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const [data] = useContext(DataContext);

  // === Task to Event ===
  const tasksToEvents = (tasks) => {

    const formatDate = (date) => {
      //format date  to yyyy-mm-dd

      return moment(date).format('YYYY-MM-DD');
    };

    const formatTime = (time, task) => {
      // add right date to time Data
      const hours = moment(time).format('HH:mm:ss');
      const date = formatDate(task);
      const formattedTime = `${date} ${hours}`
      return formattedTime;
    };
    const taskToEvent = (task, color) => {
      const date = task.date;
      // Assigning properties to the eventObject
      const eventObject = {
        id: task.id,
        start: formatTime(task.starttime, date),
        end: formatTime(task.endtime, date),
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
      const currentProject = data.projectData.find(project => project.projectId == task.projectId);
      // get corresponding color
      const color = colorHandler(currentProject.color).secondary;
      // convert Task to event
      const event = taskToEvent(task, color);
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
  // === End Task to Event ===

  // create events from taskData
  const events = tasksToEvents(data.taskData);
  const theme = useRef(getTheme());

  // create state for timeline
  const timelineState = {
    currentDate: getDate(),
    events: events.events,
    markedDates: {},
  };

  // create marked dates for expandable Calender
  Object.keys(events.events).forEach((key) => {
    timelineState.markedDates[key] = { marked: true };
  });

  // == Event Handlers ==
  const onEventPressHandler = (event) => {
    console.log('Event selected: (ID:', event.id, ') ', event.title, event.start, event.end);
    toggleExpand();
  };

  const onBackgroundLongPressHandler = (event) => {
    console.log('background event: ', event);
  };
  // == End Event Handlers ==


  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null;
  }

  return (
    <View style={styles.mainContainer}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor={Colors.backgroundHeader} />
      <CalendarProvider
        date={timelineState.currentDate}
        showTodayButton
      >
        <ExpandableCalendar
          style={styles.calendar}
          markedDates={timelineState.markedDates}
          closeOnDayPress={true}

          theme={theme.current}
        />
        <TimelineList
          events={timelineState.events}
          showNowIndicator
          scrollToNow
          timelineProps={{
            format24h: true,
            onBackgroundLongPress: onBackgroundLongPressHandler,
            //onBackgroundLongPressOut: () => console.log('Timeline BackgroundLongPressOut'),
            onEventPress: onEventPressHandler,
            unavailableHours: [
              { start: 0, end: 6 },
              { start: 22, end: 24 },
            ],
            overlapEventsSpacing: 8,
            rightEdgeSpacing: 24,
          }} />
      </CalendarProvider>
      <Animated.View style={[{ height: animatedHeight, opacity: animatedOpacity }, styles.timerContainer]}>
        <View style={styles.timerWrapper}>
          <Timer />
        </View>
      </Animated.View>
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
  timerContainer: {
    width: '100%',
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerWrapper: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  renderItem: {
    height: 50,
    width: 80,
    backgroundColor: 'gray'
  }
});
