import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectScreen from "../screens/project/ProjectScreen";
import NewEditProjectScreen from "../screens/project/NewEditProjectScreen";

import { Colors } from "../styles/Colors";
import { DefaultStyles } from "../styles/DefaultStyles";

const ProjectStack = createStackNavigator();

const ProjectNavigator = () => {
    return (
        <ProjectStack.Navigator
            initialRouteName="ProjectList"
            screenOptions={{
                headerShown: true,
                headerStyle:  DefaultStyles.header ,
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 38,
                    color:  Colors.headerLabel ,
                    paddingBottom: 20,
                },
            }}>

            <ProjectStack.Screen name="ProjectList" component={ProjectScreen} 
                options={{
                    headerShown: true,
                    headerTitle: "Projects",
                    headerTintColor: Colors.headerLabel,
                }}/>
            <ProjectStack.Screen name="AddProject" component={NewEditProjectScreen}
                options={{
                    headerShown: true,
                    headerTitle: "Add Project",
                    headerTintColor: Colors.headerLabel,
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

export default ProjectNavigator;
