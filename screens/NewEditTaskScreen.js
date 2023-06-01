import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';

const SecondScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [stopTime, setStopTime] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter title"
                    value={title}
                    onChangeText={setTitle}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter description"
                    value={description}
                    onChangeText={setDescription}
                />
            </View>
            <View style={styles.thirdContainer}>
                <View style={styles.columnContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.labelText}>Date:</Text>
                        <View style={styles.space}></View>
                        <TextInput
                            style={styles.input2} //*made orange to visible
                            placeholder="01.01.2000"
                            value={date}
                            onChangeText={setDate}
                        />
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.labelText}>Start:</Text>
                        <View style={styles.space}></View>
                        <TextInput
                            style={styles.input2}
                            placeholder="00:00"
                            value={startTime}
                            onChangeText={setStartTime}
                        />

                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.labelText}>Stop:</Text>
                        <View style={styles.space}></View>
                        <TextInput
                            style={styles.input2}
                            placeholder="00:00"
                            value={stopTime}
                            onChangeText={setStopTime}
                        />

                    </View>

                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        // backgroundColor: '#ffffff',
    },
    inputContainer: {
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#E9DDD7',
        borderRadius: 15,
        borderColor: "#D0C6C0",
        padding: 10,
        fontSize: 16,
    },
    input2: {
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    thirdContainer: {
        backgroundColor: '#E9DDD7',
        flexDirection: 'row',
        padding: 10,
        marginTop: 20,
        borderRadius: 15,
        fontSize: 16,
    },
    columnContainer: {
        flex: 1,
    },
    rowContainer: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    labelText: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    },

    space: {
        flex: 1,

    }
});

export default SecondScreen;
