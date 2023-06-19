import React, { useState } from "react";

import MainNavigator from "./navigation/MainNavigator";

import { DataContext } from "./data/DataContext";
import {projectData, PROJECTIDCOUNTER} from "./data/ProjectData";
import {taskData,TASKIDCOUNTER } from "./data/TaskData";


const Empty = () => {
  return (
    <View />
  );
};

export default function App() {
  // set initial data for Context use
  const [data, setData] = useState({
    projectData: projectData, 
    taskData: taskData, 
    taskIdCounter: TASKIDCOUNTER,
    projectIdCounter: PROJECTIDCOUNTER,
    isSaved: true,
    hasChanged: false,
  });

  return (
    <DataContext.Provider value = {[data,setData]}>
      <MainNavigator />
    </DataContext.Provider>
  );
};
