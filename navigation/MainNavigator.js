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
import { Alert, Platform } from 'react-native';


const Tab = createBottomTabNavigator();

const iconSize = Platform.OS === 'android' ? 26 : 24;

export default MainNavigator = () => {

    const [data, setData] = useContext(DataContext);

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: true,
                    tabBarActiveTintColor: Colors.tabbarActive,
                    tabBarInactiveTintColor: Colors.tabbarInactive,
                    tabBarStyle: { height: Platform.OS === 'android' ? 65 : 80, backgroundColor: Colors.backgroundTabbar },
                    tabBarLabelStyle: { fontSize: 12, marginBottom: Platform.OS === 'android' ? 10 : 0, fontWeight: 'bold' },
                    tabBarIconStyle: { marginTop: 5 },
                })}>
                {/* Task Screen */}
                <Tab.Screen
                    name="TaskTab"
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
                                navigation.navigate('ProjectTab', { screen: 'ProjectList' })
                                navigation.navigate('TaskTab', { screen: 'TaskList' })
                            }
                            // if unsaved changes, prevent default action
                            if (!data.isSaved && data.hasChanged) {
                                e.preventDefault();
                                console.log('prevent Navigation, due to unsaved data');
                                Alert.alert('Unsaved Changes', 'You have unsaved changes. Please save or discard them before navigating away from this screen.');
                            }
                        }
                    })}
                />
                {/*<Tab.Screen name="NewTask" component={NewEditTaskScreen} /*/}

                {/* Calendar Screen */}
                <Tab.Screen
                    name="CalendarTab"
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
                                navigation.navigate('TaskTab', { screen: 'TaskList' })
                                navigation.navigate('ProjectTab', { screen: 'ProjectList' })
                                navigation.navigate('CalendarTab', { screen: 'CalendarScreen' })
                            }
                            // if unsaved changes, prevent default action
                            if (!data.isSaved && data.hasChanged) {
                                e.preventDefault();
                                console.log('prevent Navigation, due to unsaved data');
                                Alert.alert('Unsaved Changes', 'You have unsaved changes. Please save or discard them before navigating away from this screen.');
                            }
                        }
                    })}
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
                                navigation.navigate('TaskTab', { screen: 'TaskList' })
                                navigation.navigate('ProjectTab', { screen: 'ProjectList' })
                            }
                            // if unsaved changes, prevent default action
                            if (!data.isSaved && data.hasChanged) {
                                e.preventDefault();
                                console.log('prevent Navigation, due to unsaved data');
                                Alert.alert('Unsaved Changes', 'You have unsaved changes. Please save or discard them before navigating away from this screen.');
                            }
                        }
                    })}


                />

            </Tab.Navigator>
        </NavigationContainer>
    );
};