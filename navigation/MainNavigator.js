import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../styles/Colors';

import CalendarScreen from "../screens/CalendarScreen";

import TaskNavigator from './TaskNavigator';
import CalendarNavigator from './CalendarNavigator';
import ProjectNavigator from "./ProjectNavigator";


import { FontAwesome5, MaterialCommunityIcons  } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const iconSize = 26;

export default MainNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: true,
                    tabBarActiveTintColor: Colors.tabbarActive,
                    tabBarInactiveTintColor: Colors.tabbarInactive,
                    tabBarStyle: { height: 65, backgroundColor: Colors.backgroundTabbar},
                    tabBarLabelStyle: { fontSize: 12, marginBottom: 10, fontWeight: 'bold' },
                    tabBarIconStyle: { marginTop: 5 },
                })}>
                {/* Task Screen */}
                <Tab.Screen
                name = "TaskScreen"
                component={TaskNavigator}
                options={{
                    tabBarLabel: 'Tasks',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 style={{ alignSelf: 'center' }} name={'tasks'} size={ iconSize } color={color} /> 
                    ),
                }} /> 
                {/*<Tab.Screen name="NewTask" component={NewEditTaskScreen} /*/}

                {/* Calendar Screen */}
                <Tab.Screen
                name="Calendar"
                component={CalendarNavigator}
                options={{
                    tabBarLabel: 'Calendar',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 style={{ alignSelf: 'center' }} name={'calendar-check'} size={ iconSize } color={color} /> 
                    ),
                }} />

                {/* Project Screen */}
                <Tab.Screen
                name="ProjectTab"
                component={ProjectNavigator}
                options={{
                    tabBarLabel: 'Projects',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons style={{ alignSelf: 'center', paddingBottom: 0 }} name={'bookshelf'} size={ iconSize +8 } color={color} /> 
                    ),
                }} />

            </Tab.Navigator>
        </NavigationContainer>
    );
};