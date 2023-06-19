import React, { useContext, useState, useEffect } from "react";
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard, StatusBar, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Colors } from "../../styles/Colors";
import {Task}  from "../../data/Classes";
import { DataContext } from "../../data/DataContext";

const InputBox = props =>{
    return(
    <View style={styles.inputContainer}>
        <TextInput
            style={props.inputStyle}
            placeholder= {props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
            editable = {props.editable}
            multiline = {props.multiline}
        />
    </View>
    );
}

const NewEditTaskScreen = ({route,navigation}) => {

    function FocusAwareStatusBar(props) {
        const isFocused = useIsFocused();
        return isFocused ? <StatusBar {...props} /> : null;
    }

    // data from Taskscreen 
    const {isEdit} = route.params;
    const {taskId} = route.params;
    const {projectId} = route.params;
    // Context data
    const [data,setData] = useContext(DataContext);

    // set currentDate to today
    let currentDate = new Date();
    useEffect(() => {
        currentDate = new Date(Date.now);
        
      }, []);
    // 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date(currentDate));
    const [startTime, setStartTime] = useState(new Date());
    const [stopTime, setStopTime] = useState(new Date());
    
    // get existing data you want to edit for EditScreen
    const currentData = data.taskData.find(task => task.id === taskId);
    const [editedData, setEditedData] = useState(currentData);
    // prevent going back if there are unsaved changes
    const [isSaved, setIsSaved] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);

    // check if data has changed
    useEffect(() => {
        if (editedData !== currentData && !hasChanged) {
            setHasChanged(true);   // update hasChanged in local state to prevent going back
            setData(data => ({...data, hasChanged: true}));   // update hasChanged in Context (global state) to prevent tab navigation
        }
    }
    , [editedData]);

    // update global state when data has changed
    useEffect(() => {
        setData(data => ({...data, hasChanged: hasChanged}));   // update hasChanged in Context (global state) to prevent tab navigation
    }, [hasChanged]);

    // check if data is saved
    useEffect(() => {
        setData(data => ({...data, isSaved: isSaved}));   // update isSaved in Context (global state) to prevent tab navigation
        if(isSaved){
            navigation.goBack();   // when data is saved, go back
        }
    }, [isSaved]);

    // prevent going back if there are unsaved changes
    useEffect(() => {
        const beforeRemoveListener = navigation.addListener('beforeRemove', (e) => {   // event listener, before leaving the screen
        if (!isSaved && hasChanged) {
            e.preventDefault();   // Prevent the default behavior of the back button
            Alert.alert( 'Unsaved Changes', 'Are you sure you want to leave without saving?',
              [{ text: 'Cancel', onPress: () => setData(data => ({...data, isSaved: isSaved})), style: 'cancel' },   // stay on screen
                { text: 'Leave', onPress: () => {
                    navigation.dispatch(e.data.action);   // go back
                    setData(data => ({...data, isSaved: true}));   // reset to enable tab navigation
                }, },],
              { cancelable: false }
            );}
        });
        return () => beforeRemoveListener(); // Cleanup the event listener on unmount
      }, [isSaved, navigation]);


    
    // set new Date
    const dateChangeHandler = (event, selectedDate)=>{
        const newDate = selectedDate || date;
        setDate(selectedDate);
    };
    // set new Starttime
    const startTimeChangeHandler = (event, selectedTime)=>{
        const newTime = selectedTime || startTime;
        setStartTime(newTime);
    };
    // set new Stoptime
    const stopTimeChangeHandler = (event, selectedTime)=>{
        const newTime = selectedTime || stopTime;
        setStopTime(newTime);
    };
    const addHandler = (title,description,projectId,date,startTime,endTime) =>{
        // check for EditScreen or NewScreen
        if(!isEdit ){
            let newIdCounter = data.taskIdCounter + 1;
            let newTasks = data.taskData;
            // put new data at the end of array
            newTasks.push(new Task(newIdCounter, title, projectId, description,date ,startTime,endTime,false));
            // save the data in Context
            setData(data => ({
                projectData: data.projectData, 
                taskData: newTasks, 
                taskIdCounter: newIdCounter,
                projectIdCounter: data.projectIdCounter}));
            
            setIsSaved(true);   // navigation.goBack() in useEffect, because of async handling
            setData(data => ({...data, isSaved: true}));   // update isSaved in Context (global state) to prevent tab navigation
    
        }else{
            const updatedTasks = data.taskData; 
            // find index of data you want to edit
            const taskIndex = data.taskData.findIndex(task => task.id === taskId);
            // overwrite Task with new data
            if (taskIndex !== -1) {
                updatedTasks[taskIndex] = new Task(taskId, editedData.name, editedData.projectId, editedData.description, editedData.date, editedData.starttime, editedData.endtime, editedData.isFinished);
              }
              // save data in Context
            setData(data => ({
                projectData: data.projectData, 
                taskData:updatedTasks,
                taskIdCounter: data.taskIdCounter,
                projectIdCounter: data.projectIdCounter}));
            
            setIsSaved(true);   // navigation.goBack() in useEffect, because of async handling
            setData(data => ({...data, isSaved: true}));   // update isSaved in Context (global state) to prevent tab navigation
        }
    };
    
    return (
        <TouchableWithoutFeedback onPress ={() => Keyboard.dismiss()}>
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor = { Colors.backgroundHeader } />
            <InputBox 
                
                value = {/* check if the screen isEdit: if yes fill in the existing data*/
                        isEdit == true? editedData.name : title }
                onChangeText = {/* check if the screen isEdit: if yes set editedData to existing Data*/
                                isEdit == true?(text) => setEditedData({ ...editedData, name: text }): setTitle}
                placeholder = 'Enter title...'
                inputStyle = {styles.input}
                />
            <InputBox
                value = {isEdit == true? editedData.description : description}
                onChangeText = {isEdit == true?(text) => setEditedData({ ...editedData, description: text }): setDescription}
                placeholder = 'Enter Description...'
                inputStyle = {[styles.input,{minHeight: 150, paddingTop:10}]}
                editable
                multiline
                />
            <View style={styles.thirdContainer}>
                <View style={styles.columnContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.labelText}>Date:</Text>
                        <DateTimePicker
                            value={isEdit? editedData.date: date}
                            onChange={isEdit? (event,newDate) => {setEditedData({...editedData,date:newDate})}:dateChangeHandler}
                            mode = {'date'}
                            is24Hour={true}
                            />
                       
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.labelText}>Start-Time:</Text>
                        <DateTimePicker
                            value={isEdit? editedData.starttime: startTime}
                            onChange={isEdit? (event,newStartTime) => setEditedData({...editedData,starttime: newStartTime}):startTimeChangeHandler}
                            mode = {'time'}
                            is24Hour={true}
                    
                            />
                 
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.labelText}>Stop-Time:</Text>
                        <DateTimePicker
                            value={isEdit? editedData.endtime: stopTime}
                            onChange={isEdit? (event,newEndTime) => setEditedData({...editedData,endtime: newEndTime}): stopTimeChangeHandler}
                            mode = {'time'}
                            is24Hour={true}
                            
                            />
                       
                    </View>
                </View>
            </View>
            <View style = {styles.bottomContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => addHandler(title,description,projectId,date,startTime,stopTime)}>
                <Text style = {styles.addText}> {isEdit? "Save" : "Add"}</Text>
            </TouchableOpacity>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    inputContainer: {
        marginBottom: 10,
        alignItems: 'stretch'
        
    },
    input: {
        backgroundColor: '#E9E9E9',
        borderRadius: 10,
        borderColor: "#ACACAC",
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
    
        textAlignVertical: 'top'
    
    },
    input2: { 
        fontSize: 16,
        minWidth: 43,
    },
    thirdContainer: {
        backgroundColor: '#E9E9E9',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginTop: 10,
        borderRadius: 10,
        fontSize: 16,
    },
    columnContainer: {
        flex: 1,
        paddingVertical: 5
    },
    rowContainer: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between',    
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    space: {
        flex: 1,
    },
    bottomContainer:{
        
        flex: 1,
        justifyContent: 'flex-end'
    },
    addButton:{
        alignSelf: 'center',
        marginTop: 0
    },
    addText:{
        color: 'darkgray',
        fontSize: 20,
        fontWeight: 'bold'
    },
    pickerContainer:{
        
        padding: 5,
        borderRadius: 8,
        backgroundColor: '#bababa',
    }
});

export default NewEditTaskScreen;
