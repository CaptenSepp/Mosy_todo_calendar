import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard, StatusBar, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import {projectData} from "../../data/ProjectData";
import { Colors } from "../../styles/Colors";
import { Project } from "../../data/Classes";
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



export default NewEditProjectScreen =  ({ route, navigation }) => {

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

    React.useEffect(() => {
    // Prevent going back 
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        Alert.alert('Discard changes?', 'You have unsaved changes. Are you sure to discard them and leave the screen?',
                    [{text: 'Cancel', style: 'cancel', onPress: () => {e.preventDefault();}},
                    {text: 'Discard', style: 'destructive', onPress: () => navigation.dispatch(e.data.action)}])
        });
    
        return unsubscribe;
    }, [navigation]); 

    const addHandler = (title, description, color) =>{
        // check if Edit or NewScreen
        if(!isEdit ){
            let newIdCounter = data.projectIdCounter + 1;
            let newProjects = data.projectData;
            // put new data at the end of array
            newProjects.push(new Project(newIdCounter, title, description,color));
            // save the data in Context
            setData(data => ({
                projectData: newProjects, 
                taskData: data.taskData, 
                taskIdCounter: data.taskIdCounter,
                projectIdCounter: newIdCounter}));
            navigation.goBack();
        }else{
            const updatedProjects = data.projectData; 
            // find index of data you want to edit
            const projectIndex = data.projectData.findIndex(project => project.projectId === projectId);
            // overwrite Task with new data
            if (projectIndex !== -1) {
                updatedProjects[projectIndex] = new Project(projectId, editedData.name, editedData.description, editedData.color);
              }
              // save data in Context
            setData(data => ({
                projectData: updatedProjects, 
                taskData: data.taskData,
                taskIdCounter: data.taskIdCounter,
                projectIdCounter: data.projectIdCounter}));
            navigation.goBack();
        }

    };
    
    

    return (
        <TouchableWithoutFeedback onPress ={() => Keyboard.dismiss()}>
        <View style={styles.container}>
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
