import React, { useEffect, useState } from "react";
import MainNavigator from "./navigation/MainNavigator";
import { DataContext } from "./data/DataContext";
import { getData } from "./data/AppStorage";

export default function App() {
  // Set the first app state for the context.
  const [data, setData] = useState({
    projectData: [],
    taskData: [],
    taskIdCounter: 0,
    projectIdCounter: 0,
    isSaved: true,
    hasChanged: false,
  });

  // Load saved data when the app starts.
  useEffect(() => {
    getData()
      .then((returnedData) => {
        setData(returnedData);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  return (
    <DataContext.Provider value={[data, setData]}>
      <MainNavigator />
    </DataContext.Provider>
  );
}
