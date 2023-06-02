import React from "react";
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";

import TaskScreen from "./screens/TaskScreen";
import NewEditTaskScreen from "./screens/NewEditTaskScreen";
import CalendarScreen from "./screens/CalendarScreen";
import ProjectScreen from "./screens/ProjectScreen";

const Tab = createBottomTabNavigator();

const Empty = () => {
  return (
    <View />
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name = "TaskScreen" component={TaskScreen} /> 
        {/*<Tab.Screen name="NewTask" component={NewEditTaskScreen} /*/}
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="ProjectScreen" component={ProjectScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
