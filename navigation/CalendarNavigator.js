import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CalendarScreen from "../screens/CalendarScreen";

import { Colors } from "../styles/Colors";

const CalendarStack = createStackNavigator();

export default TaskNavigator = () => {
    return (
        <CalendarStack.Navigator
            initialRouteName="Task"
            screenOptions={{
                headerShown: true,
                headerStyle: { height: 140, backgroundColor: Colors.backgroundHeader },
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 38,
                    color:  Colors.headerLabel ,
                    paddingBottom: 20,
                },
            }}>

            <CalendarStack.Screen name="Calendar" component={CalendarScreen} 
                options={{
                    headerShown: true,
                    headerTitle: "Calendar",
                }}/>

        </CalendarStack.Navigator>
    );
};
