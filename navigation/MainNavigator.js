import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../styles/Colors';

import CalendarScreen from "../screens/calendar/CalendarScreen";

import TaskNavigator from './TaskNavigator';
import CalendarNavigator from './CalendarNavigator';
import ProjectNavigator from "./ProjectNavigator";

import { DataContext } from '../data/DataContext';


import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const iconSize = 26;

export default MainNavigator = () => {

    const [data,setData] = useContext(DataContext);

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: true,
                    tabBarActiveTintColor: Colors.tabbarActive,
                    tabBarInactiveTintColor: Colors.tabbarInactive,
                    tabBarStyle: { height: 65, backgroundColor: Colors.backgroundTabbar },
                    tabBarLabelStyle: { fontSize: 12, marginBottom: 10, fontWeight: 'bold' },
                    tabBarIconStyle: { marginTop: 5 },
                })}>
                {/* Task Screen */}
                <Tab.Screen
                    name="TaskScreen"
                    component={TaskNavigator}
                    options={{
                        tabBarLabel: 'Tasks',
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 style={{ alignSelf: 'center' }} name={'tasks'} size={iconSize} color={color} />
                        ),
                    }}
                    listeners={({ navigation, route }) => ({
                        tabPress: e => {
                            // if no changes, just navigate
                            if (!data.hasChanged) {
                                navigation.navigate('ProjectList');
                                navigation.navigate('TaskList');
                            }
                            // if unsaved changes, prevent default action
                            if (!data.isSaved && data.hasChanged) {
                                console.log('prevent Navigation, due to unsaved data');
                                e.preventDefault();
                            }
                        }})}
                />
                {/*<Tab.Screen name="NewTask" component={NewEditTaskScreen} /*/}

                {/* Calendar Screen */}
                <Tab.Screen
                    name="Calendar"
                    component={CalendarNavigator}
                    options={{
                        tabBarLabel: 'Calendar',
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 style={{ alignSelf: 'center' }} name={'calendar-check'} size={iconSize} color={color} />
                        ),
                    }}
                    listeners={({ navigation, route }) => ({
                        tabPress: e => {
                            // if no changes, just navigate
                            if (!data.hasChanged) {
                                navigation.navigate('ProjectList');
                                navigation.navigate('TaskList');
                                navigation.navigate('CalendarScreen');
                            }
                            // if unsaved changes, prevent default action
                            if (!data.isSaved && data.hasChanged) {
                                console.log('prevent Navigation, due to unsaved data');
                                e.preventDefault();
                            }
                        }})}
                />

                {/* Project Screen */}
                <Tab.Screen
                    name="ProjectTab"
                    component={ProjectNavigator}
                    options={{
                        tabBarLabel: 'Projects',
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons style={{ alignSelf: 'center', paddingBottom: 0 }} name={'bookshelf'} size={iconSize + 8} color={color} />
                        ),
                    }} 
                    listeners={({ navigation, route }) => ({
                        tabPress: e => {
                            // if no changes, just navigate
                            if (!data.hasChanged) {
                                navigation.navigate('TaskList');
                                navigation.navigate('ProjectList');
                            }
                            // if unsaved changes, prevent default action
                            if (!data.isSaved && data.hasChanged) {
                                console.log('prevent Navigation, due to unsaved data');
                                e.preventDefault();
                            }
                        }})}
                    

                />

            </Tab.Navigator>
        </NavigationContainer>
    );
};