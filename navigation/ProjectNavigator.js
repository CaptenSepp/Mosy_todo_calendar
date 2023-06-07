import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectScreen from "../screens/project/ProjectScreen";
import NewEditProjectScreen from "../screens/project/NewEditProjectScreen";

import { Colors } from "../styles/Colors";

const ProjectStack = createStackNavigator();

export default ProjectNavigator = () => {
    return (
        <ProjectStack.Navigator
            initialRouteName="Project"
            screenOptions={{
                headerShown: true,
                headerStyle: { height: 140, backgroundColor: Colors.BackgroundHeader },
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 32,
                    color:  Colors.primary ,
                },
            }}>

            <ProjectStack.Screen name="ProjectList" component={ProjectScreen} 
                options={{
                    headerShown: true,
                    headerTitle: "Projects",
                }}/>
            <ProjectStack.Screen name="AddProject" component={NewEditProjectScreen}
                options={{
                    headerShown: true,
                    headerTitle: "Add Project",
                }}/>
            <ProjectStack.Screen name="EditProject" component={NewEditProjectScreen} 
                options={{
                    headerShown: true,
                    headerTitle: "Edit Project",
                }}/>

        </ProjectStack.Navigator>
    );
};
