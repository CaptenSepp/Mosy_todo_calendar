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
                headerStyle: { height: 70, backgroundColor: Colors.backgroundHeader },
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 38,
                    color:  Colors.headerLabel ,
                    paddingBottom: 20,
                },
                animation: "slide_from_bottom",
            }}>

            <ProjectStack.Screen name="ProjectList" component={ProjectScreen} 
                options={{
                    headerShown: true,
                    headerTitle: "Projects",
                    headerTintColor: Colors.headerLabel,
                    headerAnimationPreset: "fade",
                }}/>
            <ProjectStack.Screen name="AddProject" component={NewEditProjectScreen}
                options={{
                    headerShown: true,
                    headerTitle: "Add Project",
                    headerTintColor: Colors.headerLabel,
                    animation: "slide_from_bottom",
                }}/>
            <ProjectStack.Screen name="EditProject" component={NewEditProjectScreen} 
                options={{
                    headerShown: true,
                    headerTitle: "Edit Project",
                    headerTintColor: Colors.headerLabel,	
                }}/>

        </ProjectStack.Navigator>
    );
};
