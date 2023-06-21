import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

import { Colors } from "../styles/Colors";



export default SmallProjectComponent = props => {
    const isSelected = props.selectedProject === props.id;
    return (
        <TouchableOpacity onPress={() => props.onPress(props.id)}>
            <View style={[styles.projectItem, {
                backgroundColor: props.colors.primary,
                borderColor: props.colors.light,
                borderWidth: isSelected ? 3 : 0,
                paddingVertical: isSelected ? 10.75 : 13,
                paddingHorizontal: isSelected ? 18 : 21
            }]}>
                <Text style={[styles.headerText]}> {props.name}</Text>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    projectItem: {
        minWidth: 100,
        borderRadius: 30,
        //alignSelf: 'center',
        marginVertical: 10,
        marginHorizontal: 5,
        //paddingVertical: 13,
        //paddingHorizontal:21,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 5,
    },
    headerText: {
        color: Colors.white,
        fontSize: 17,
        fontWeight: 'bold',
    },
}
);
