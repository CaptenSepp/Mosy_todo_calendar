import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard } from 'react-native';

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

const NewEditTaskScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [stopTime, setStopTime] = useState('');

    return (
        <TouchableWithoutFeedback onPress ={() => Keyboard.dismiss()}>
        <View style={styles.container}>
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
            <View style={styles.thirdContainer}>
                <View style={styles.columnContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.labelText}>Date:</Text>
                        <Picker style={[styles.input2,{minWidth: 80}]} 
                            placeholder="01.01.2000"
                            value={date}
                            onChangeText={setDate}/>
                        
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.labelText}>Start:</Text>
                        <Picker
                            style={styles.input2}
                            placeholder="00:00"
                            value={startTime}
                            onChangeText={setStartTime}
                            />
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.labelText}>Stop:</Text>
                       <Picker 
                            style={styles.input2}
                            placeholder="00:00"
                            value={stopTime}
                            onChangeText={setStopTime}
                            />
                    </View>
                </View>
            </View>
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
