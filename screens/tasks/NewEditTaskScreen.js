import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard } from 'react-native';
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

const Picker = props =>{
    return(
        <View style = {styles.pickerContainer}>
            <TextInput
                style={props.style} 
                placeholder = {props.placeholder}
                value={props.value}
                onChangeText={props.onChangeText}
            />
        </View>
    );
}


const NewEditTaskScreen = ({route,navigation}) => {
    const {isEdit} = route.params;
    const {taskId} = route.params;
    const {projectId} = route.params;
    const [data,setData] = useContext(DataContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [stopTime, setStopTime] = useState('');
    
    const currentData = data.taskData.find(task => task.id === taskId);

    const [editedData, setEditedData] = useState(currentData);

    const addHandler = (title,description,projectId,date,startTime,endTime) =>{
        console.log(data.taskIdCounter);
        if(!isEdit ){
            let newIdCounter = data.taskIdCounter + 1;
            let newTasks = data.taskData;
            newTasks.push(new Task(newIdCounter, title, projectId, description,date ,startTime,endTime,false));
            setData(data => ({
                projectData: data.projectData, 
                taskData: newTasks, 
                taskIdCounter: newIdCounter,
                projectIdCounter: data.projectIdCounter}));
            navigation.goBack();
        }else{
            const updatedTasks = data.taskData; 
            const taskIndex = data.taskData.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                updatedTasks[taskIndex] = new Task(taskId, editedData.name, editedData.projectId, editedData.description, editedData.date, editedData.starttime, editedData.endtime, editedData.isFinished);
              }
            setData(data => ({
                projectData: data.projectData, 
                taskData:updatedTasks,
                taskIdCounter: data.taskIdCounter,
                projectIdCounter: data.projectIdCounter}));
            navigation.goBack();
        }
    };

    

    return (
        <TouchableWithoutFeedback onPress ={() => Keyboard.dismiss()}>
        <View style={styles.container}>
            <InputBox 
                value = {isEdit == true? editedData.name : title }
                onChangeText = {isEdit == true?(text) => setEditedData({ ...editedData, name: text }): setTitle}
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
                        <Picker style={[styles.input2,{minWidth: 80}]} 
                            placeholder="01.01.2000"
                            value={isEdit == true? editedData.date: date}
                            onChangeText={isEdit == true? (text) => setEditedData({...editedData,date: text}): setDate}/>
                        
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.labelText}>Start-Time:</Text>
                        <Picker
                            style={styles.input2}
                            placeholder="00:00"
                            value={isEdit == true? editedData.starttime: startTime}
                            onChangeText={isEdit == true? (text) => setEditedData({...editedData,starttime: text}): setStartTime}
                            />
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.labelText}>Stop-Time:</Text>
                       <Picker 
                            style={styles.input2}
                            placeholder="00:00"
                            value={isEdit == true? editedData.endtime: stopTime}
                            onChangeText={isEdit == true? (text) => setEditedData({...editedData,endtime: text}): setStopTime}
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
    },
    input: {
        backgroundColor: '#E9E9E9',
        borderRadius: 10,
        borderColor: "#ACACAC",
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
    
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
