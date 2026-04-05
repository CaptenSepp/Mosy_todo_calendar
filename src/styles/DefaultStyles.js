import { StyleSheet } from 'react-native';
import { Colors } from './Colors';
import { Platform } from 'react-native';

export const DefaultStyles = StyleSheet.create({
    header: {
        height: Platform.OS ==='android'? 70: 100,
        backgroundColor: Colors.backgroundHeader,
    },


});