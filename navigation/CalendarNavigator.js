import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CalendarScreen from "../screens/calendar/CalendarScreen";

import { Colors } from "../styles/Colors";
import { DefaultStyles } from "../styles/DefaultStyles";

const CalendarStack = createStackNavigator();

export default TaskNavigator = () => {
    return (
        <CalendarStack.Navigator
            initialRouteName="Task"
            screenOptions={{
                headerShown: true,
                headerStyle: DefaultStyles.header,
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 38,
                    color: Colors.headerLabel,
                    paddingBottom: 20,
                },
            }}>

            <CalendarStack.Screen name="CalendarScreen" component={CalendarScreen}
                options={{
                    headerShown: true,
                    headerTitle: "Calendar",
                }} />

        </CalendarStack.Navigator>
    );
};
