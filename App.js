import React, { useEffect, useLayoutEffect, useState } from "react";

import MainNavigator from "./navigation/MainNavigator";

import { DataContext } from "./data/DataContext";
import { getData, storeData,  } from "./data/AppStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function App() {
  // set initial data for Context use
  const [data, setData] = useState({
    projectData: [],
    taskData: [],
    taskIdCounter: 0,
    projectIdCounter: 0,
    isSaved: true,
    hasChanged: false,
  });

 //AsyncStorage.clear();

  useEffect(() => {
    getData().then((returnedData) => {setData(returnedData)}).catch(() => {console.log("Error")})
  }, []);
  
  return (
    <DataContext.Provider value={[data, setData]}>
      <MainNavigator />
    </DataContext.Provider>
  );
};
