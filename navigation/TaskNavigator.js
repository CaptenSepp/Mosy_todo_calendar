import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TaskScreen from "../screens/tasks/TaskScreen";
import newEditTaskScreen from "../screens/tasks/NewEditTaskScreen";

import { Colors } from "../styles/Colors";
import { DefaultStyles } from "../styles/DefaultStyles";

const TaskStack = createStackNavigator();

export default TaskNavigator = () => {
    return (
        <TaskStack.Navigator
            initialRouteName="TaskList"
            screenOptions={{
                headerShown: true,
                headerStyle: DefaultStyles.header,
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 38,
                    color:  Colors.headerLabel ,
                    paddingBottom: 20,
                },
            }}>

            <TaskStack.Screen name="TaskList" component={TaskScreen} 
                options={{
                    headerShown: true,
                    headerTitle: "Tasks",
                }}/>
            <TaskStack.Screen name="AddTask" component={newEditTaskScreen}
                options={{
                    headerShown: true,
                    headerTitle: "Add Task",
                    headerTintColor: Colors.headerLabel,	
                }}/>
            <TaskStack.Screen name="EditTask" component={newEditTaskScreen} 
                options={{
                    headerShown: true,
                    headerTitle: "Edit Task",
                    headerTintColor: Colors.headerLabel,	
                }}/>

        </TaskStack.Navigator>
    );
};
