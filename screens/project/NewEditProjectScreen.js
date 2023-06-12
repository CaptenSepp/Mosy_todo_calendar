import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard, StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import {projectData} from "../../data/ProjectData";
import { Colors } from "../../styles/Colors";


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
    
    const filteredColors = Object.entries(Colors).reduce((acc, [colorName, color]) => {
        if (color.hasOwnProperty('primary') && color.hasOwnProperty('secondary') && color.hasOwnProperty('light')) {
          acc.push({
            name: colorName,
            primary: color.primary,
          });
        }
        return acc;
      }, []);
      
    const firstRow = filteredColors.slice(0,filteredColors.length/2);
    const secondRow = filteredColors.slice(filteredColors.length/2);
    
    return(
        <View style={styles.thirdContainer}>
            <Text style ={styles.headerText}>Pick Color</Text>
            <View style = {{flexDirection: 'row',justifyContent: 'flex-start'}}>
            {firstRow.map((color, index) => (
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
    
    function FocusAwareStatusBar(props) {
        const isFocused = useIsFocused();
        return isFocused ? <StatusBar {...props} /> : null;
    }

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedColor,setSelectedColor] = useState('blue');
    
 
    // if params are passed, it is an edit, otherwise it is a new project
    if (route.params != null) {
        const { id } = route.params;
        const isEdit = id != null;
        console.log("isEdit: " + isEdit);
        
        const project = projectData.find((project) => project.projectId === id);
        console.log("project: " + project.name, project.description);

        //setTitle(project.name);
    } else {
        console.log("isEdit: false");
    }

    return (
        <TouchableWithoutFeedback onPress ={() => Keyboard.dismiss()}>
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor = { Colors.backgroundHeader } />
            <InputBox 
                value = {title}
                onChangeText = {setTitle}
                placeholder = 'Enter title...'
                inputStyle = {styles.input}
                />
            <InputBox
                value = {description}
                onChangeText = {setDescription}
                placeholder = 'Enter Description...'
                inputStyle = {[styles.input,{minHeight: 150, paddingTop:10}]}
                editable
                multiline
                />
            <ColorPicker 
                selectedColor = {selectedColor}
                onPress = {setSelectedColor}
                />
            <View style = {styles.bottomContainer}>
            <TouchableOpacity style={styles.addButton}>
                <Text style = {styles.addText}> Add</Text>
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
