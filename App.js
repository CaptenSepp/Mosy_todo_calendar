import React, { useState } from "react";

import MainNavigator from "./navigation/MainNavigator";

import { DataContext } from "./data/DataContext";
import projectData from "./data/ProjectData";
import taskData from "./data/TaskData";

const Empty = () => {
  return (
    <View />
  );
};

export default function App() {
  const [data, setData] = useState({projectData: projectData, taskData: taskData});
  console.log(projectData);
  return (
    <DataContext.Provider value = {[data,setData]}>
      <MainNavigator />
    </DataContext.Provider>
  );
};
