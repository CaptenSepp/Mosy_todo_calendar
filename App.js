import React from "react";
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";

import TaskScreen from "./screens/TaskScreen";
import NewEditTaskScreen from "./screens/NewEditTaskScreen";
import CalendarScreen from "./screens/CalendarScreen";
import ProjectScreen from "./screens/ProjectScreen";

const Tab = createBottomTabNavigator();

import { FontAwesome5, MaterialCommunityIcons  } from '@expo/vector-icons';

const Empty = () => {
  return (
    <View />
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
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
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarLabel: 'Calendar',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 style={{ alignSelf: 'center' }} name={'calendar-check'} size={32} color={color} /> 
            ),
           }} />
        <Tab.Screen
          name="ProjectScreen"
          component={ProjectScreen}
          options={{
            tabBarLabel: 'Projects',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons style={{ alignSelf: 'center' }} name={'bookshelf'} size={32} color={color} /> 
            ),
           }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
