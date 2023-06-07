import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../styles/Colors';

import TaskScreen from "../screens/TaskScreen";
import CalendarScreen from "../screens/CalendarScreen";

import ProjectNavigator from "./ProjectNavigator";

import { FontAwesome5, MaterialCommunityIcons  } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default MainNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: true,
                    tabBarActiveTintColor: Colors.tabbarActive,
                    tabBarInactiveTintColor: Colors.tabbarInactive,
                    tabBarStyle: { height: 75, backgroundColor: Colors.backgroundTabbar},
                    tabBarLabelStyle: { fontSize: 18, marginBottom: 5 },
                    tabBarIconStyle: { marginTop: 5 },
                })}>
                {/* Task Screen */}
                <Tab.Screen
                name = "TaskScreen"
                component={TaskScreen}
                options={{
                    tabBarLabel: 'Tasks',
                    tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 style={{ alignSelf: 'center' }} name={'tasks'} size={32} color={color} /> 
                    ),
                }} /> 
                {/*<Tab.Screen name="NewTask" component={NewEditTaskScreen} /*/}

                {/* Calendar Screen */}
                <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    tabBarLabel: 'Calendar',
                    tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 style={{ alignSelf: 'center' }} name={'calendar-check'} size={32} color={color} /> 
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
                    <MaterialCommunityIcons style={{ alignSelf: 'center' }} name={'bookshelf'} size={32} color={color} /> 
                    ),
                }} />

            </Tab.Navigator>
        </NavigationContainer>
    );
};