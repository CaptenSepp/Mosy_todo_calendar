import React from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../styles/Colors';

export default PlusButton = props => {

    return (
        
        <View style = {styles.mainContainer}>
            <TouchableOpacity onPress ={props.OnPress} >
            <Ionicons style = {styles.icon} name = "add-outline" size = {32}></Ionicons>
            </TouchableOpacity>
        </View>
        
    );
};

const styles = StyleSheet.create({
    mainContainer:{
        borderRadius: 100,
        //width: 40,
        //height: 40,
        padding: 5,
        backgroundColor: 'lightgray',
        alignSelf: 'center',
        marginVertical: 10,
        marginHorizontal: 5,
        
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    icon:{
        marginLeft: 3,
        color: Colors.textdarker
    }
});