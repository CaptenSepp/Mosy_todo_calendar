import React from "react";
import {StyleSheet, View} from 'react-native';
import { CalendarProvider, Timeline, ExpandableCalendar} from "react-native-calendars";


export default CalendarScreen = () =>{

    return(
        <View style = {styles.mainContainer}>
            <CalendarProvider 
                date='2023-06-01'
                showTodayButton
                >
                <ExpandableCalendar
                    markedDates={{
                        '2023-06-01': {selected: true, marked: true, selectedColor: 'green'},
                        '2023-06-02': {marked: true},
                        '2023-06-03': {selected: true, marked: true, selectedColor: 'green'}
                      }}/>
                <Timeline
                showNowIndicator/>

                
            </CalendarProvider>
        </View>

    );
};

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
       
    }

});
