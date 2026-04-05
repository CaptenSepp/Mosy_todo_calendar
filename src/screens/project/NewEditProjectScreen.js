import React, { useContext, useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import {projectData} from "../../data/ProjectData";
import { Colors } from "../../styles/Colors";
import { Project } from "../../data/Classes";
import { DataContext } from "../../data/DataContext";
import { storeData } from "../../data/AppStorage";
import ModalAlertTwoButton from "../../components/ModalAlertTwoButton";


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
};

const ColorPicker = props => {
    //get all projectColors from Colors.js  
    const filteredColors = Object.entries(Colors).reduce((acc, [colorName, color]) => {
        if (color.hasOwnProperty('primary') && color.hasOwnProperty('secondary') && color.hasOwnProperty('light')) {
          acc.push({
            name: colorName,
            primary: color.primary,
          });
        }
        return acc;
      }, []);
    // split array in two to display it in two rows  
    const firstRow = filteredColors.slice(0,filteredColors.length/2);
    const secondRow = filteredColors.slice(filteredColors.length/2);
    
    return(
        <View style={styles.thirdContainer}>
            <Text style ={styles.headerText}>Pick Color</Text>
            <View style = {{flexDirection: 'row',justifyContent: 'flex-start'}}>
            {//display static list of colors (circle Color if it is selected)
            firstRow.map((color, index) => (
                <TouchableOpacity key={index} onPress = {() =>props.onPress(color.name)}>
                <View  style= {[styles.colorCircle,{backgroundColor: color.primary,borderWidth: props.selectedColor === color.name ? 4 : 0}]}/>  
                </TouchableOpacity> 
        ))}
            </View>
            <View style = {{flexDirection: 'row',justifyContent: 'flex-start'}} >
        {secondRow.map((color, index) => (
                <TouchableOpacity key={index} onPress = {() =>props.onPress(color.name)}>
                <View  style= {[styles.colorCircle,{backgroundColor: color.primary,borderWidth: props.selectedColor === color.name ? 4 : 0}]}/>
                </TouchableOpacity>
        ))}
            </View>
        </View>
    );
}



const NewEditProjectScreen =  ({ route, navigation }) => {

    const [data,setData] = useContext(DataContext);
    const {isEdit} = route.params;
    const {projectId} = route.params;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedColor,setSelectedColor] = useState('blue');

    // get data to edit
    const currentData = data.projectData.find(project => project.projectId === projectId);
    const [editedData, setEditedData] = useState(currentData);
    
    function FocusAwareStatusBar(props) {
        const isFocused = useIsFocused();
        return isFocused ? <StatusBar {...props} /> : null;
    }

    // === NAVIGATION ===
    // prevent going back if there are unsaved changes
    const [isSaved, setIsSaved] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const isFirstRun = useRef(true);

    // check if data has changed
    useEffect(() => {
        if (isFirstRun.current){
            isFirstRun.current = false;
        } else if (!isEdit || (editedData !== currentData && !hasChanged)) {
            setHasChanged(true);   // update hasChanged in local state to prevent going back
            setData(data => ({...data, hasChanged: true}));   // update hasChanged in Context (global state) to prevent tab navigation
        }
    }
    , [editedData, title, description, selectedColor]);

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

    const [modalAlertVisible, setModalAlertVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [navigationEvent, setNavigationEvent] = useState('');

    // prevent going back if there are unsaved changes
    useEffect(() => {
        const beforeRemoveListener = navigation.addListener('beforeRemove', (e) => {   // event listener, before leaving the screen
        if (!isSaved && hasChanged) {
            e.preventDefault();   // Prevent the default behavior of the back button
            setNavigationEvent(e);
            setModalTitle('Unsaved Changes');
            setModalMessage('Are you sure you want to leave without saving?');
            setModalAlertVisible(true);
            ;}
        });
        return () => beforeRemoveListener(); // Cleanup the event listener on unmount
      }, [isSaved, hasChanged, navigation]);
    // === END NAVIGATION ===


    const addHandler = (title, description, color) =>{
        // check if Edit or NewScreen
        let newData;
        if(!isEdit ){
            let newIdCounter = data.projectIdCounter + 1;
            let newProjects = data.projectData;
            // put new data at the end of array
            newProjects.push(new Project('c'+ newIdCounter, title, description,color));
            newData = {
                projectData: newProjects, 
                taskData: data.taskData, 
                taskIdCounter: data.taskIdCounter,
                projectIdCounter: newIdCounter,
                isSaved: true};
            // save the data in Context
            setData(newData);

            setIsSaved(true);   // navigation.goBack() in useEffect, because of async handling
            //setData(data => ({...data, isSaved: true}));   // update isSaved in Context (global state) to prevent tab navigation
            
        }else{
            const updatedProjects = data.projectData; 
            // find index of data you want to edit
            const projectIndex = data.projectData.findIndex(project => project.projectId === projectId);
            // overwrite Task with new data
            if (projectIndex !== -1) {
                updatedProjects[projectIndex] = new Project(projectId, editedData.name, editedData.description, editedData.color);
              }
            newData = {
                projectData: updatedProjects, 
                taskData: data.taskData,
                taskIdCounter: data.taskIdCounter,
                projectIdCounter: data.projectIdCounter,
                isSaved: true};
              // save data in Context
            setData(newData);
            
            setIsSaved(true);   // navigation.goBack() in useEffect, because of async handling
            //setData(data => ({...data, isSaved: true}));   // update isSaved in Context (global state) to prevent tab navigation
            
        }
        storeData(newData);

    };
    
    

    return (
        <View style={styles.container}>
        <ModalAlertTwoButton 
            visible={modalAlertVisible}
            onCancel={() => setModalAlertVisible(false)}
            onLeave={() => {
                setModalAlertVisible(false);
                const action = navigationEvent.data.action;
                navigation.dispatch(action);   // go back
                setData(data => ({...data, isSaved: true}));   // reset to enable tab navigation
            }}
            title={modalTitle}
            message={modalMessage}
        />
            <FocusAwareStatusBar barStyle="light-content" backgroundColor = { Colors.backgroundHeader } />
            <InputBox 
                value={isEdit? editedData.name: title}
                onChangeText={isEdit? (text) => setEditedData({...editedData,name: text}): setTitle}
                placeholder = 'Enter title...'
                inputStyle = {styles.input}
                />
            <InputBox
                value = {isEdit? editedData.description:description}
                onChangeText = {isEdit?(text) => setEditedData({...editedData,description: text}): setDescription}
                placeholder = 'Enter Description...'
                inputStyle = {[styles.input,{minHeight: 150, paddingTop:10}]}
                editable
                multiline
                />
            <ColorPicker 
                selectedColor = {isEdit? editedData.color: selectedColor}
                onPress = {isEdit?(text) => setEditedData({...editedData,color: text}): setSelectedColor}
                />
            <View style = {styles.bottomContainer}>
            <TouchableOpacity style={styles.addButton} onPress = {() => addHandler(title,description,selectedColor)}>
                <Text style = {styles.addText} > {isEdit? "Save" : "Add"}</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

export default NewEditProjectScreen;

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
        
        textAlignVertical: 'top'
    
    },
    input2: { 
        fontSize: 16,
        minWidth: 43,
    },
    thirdContainer: {
        backgroundColor: '#E9E9E9',
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 10,
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
    },
    headerText:{
        fontSize: 16,
        fontWeight: 'bold',
        //paddingVertical: 5,
        marginLeft: 5,
        marginBottom: 5

    },
    colorCircle:{
        borderRadius: 30,
        height:40,
        width:40,
        marginRight: 10,
        marginVertical: 5,
        borderColor: 'black'


        
    }
});
