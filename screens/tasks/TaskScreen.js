import React from "react";
import { FlatList, StyleSheet, View, } from 'react-native';

import projectData from "../../data/ProjectData";
import taskData from "../../data/TaskData";

import SmallProjectComponent from "../../components/SmallProjectComponent";
import TaskComponent from "../../components/TaskComponent";
import PlusButton from "../../components/PlusButton";

import { Colors } from "../../styles/Colors";

export const colorHandler = (color) => {
  const colorValues = Colors[color];
  if (colorValues) {
    const { primary, secondary, light } = colorValues;
    return { primary, secondary, light };
  }
  return null;
};

const addLastElement = (data) =>{
  const endValue = {id: data.length+1,projectId: "addButton"};
  const updatedData = [...data, endValue];
  return updatedData
}

modifiedTaskData = addLastElement(taskData); 
modifiedProjectData = addLastElement(projectData); 

const renderTaskItem = ({ item }) => {
  
  if(item.projectId == "addButton"){
    return(<PlusButton/>)
  }else{
    return (
      <TaskComponent
        title={item.name}
        description={item.description}
        starttime={item.starttime}
        stoptime={item.endtime}
        isFinished={item.isFinished}
      />)
    ;}
};

const renderProjectItem = ({ item }) => {
  
  if(item.projectId== "addButton"){
    return(<PlusButton />)
  }else{
  return (
    <SmallProjectComponent
      name={item.name}
      id={item.id}
      colors={colorHandler(item.color)}
    />)
    ;}
};

export default TaskScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <FlatList
          horizontal
          data={modifiedProjectData}
          style = {styles.topListStyle}
          contentContainer = {styles.horizontalContainer}
          renderItem={renderProjectItem}
          showsHorizontalScrollIndicator={false} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          style={styles.list}
          data={modifiedTaskData}
          renderItem={renderTaskItem}
          showsVerticalScrollIndicator={false} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  topContainer: {
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 3,
    //backgroundColor: 'lightgray',
  },
  listContainer: {
    flex: 1,
    paddingVertical: 5,

    alignItems: 'center',
    backgroundColor: 'white',

  },
  horizontalContainer:{
    padding: 5,
    width: '100%'
    //flex: 1,
  },
  topListStyle:{
    width: '100%'
  },
  list: {
    width: '90%',
    backgroundColor: 'white'
    //backgroundColor: 'lightgray',
  },
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignSelf: 'stretch'
  },
});
