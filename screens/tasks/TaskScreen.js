import React, { useContext, useState } from "react";
import { FlatList, StyleSheet, View, } from 'react-native';

import SmallProjectComponent from "../../components/SmallProjectComponent";
import TaskComponent from "../../components/TaskComponent";
import PlusButton from "../../components/PlusButton";

import { addLastElement, colorHandler } from "../../functions";

import { DataContext } from "../../data/DataContext";


export default TaskScreen = ({navigation}) => {
  const [data,setData] = useContext(DataContext);
  const [selectedProject, setSelectedProject] = useState("c1");

  const shownTasks = data.taskData.filter(task => task.projectId === selectedProject);
  
  modifiedTaskData = addLastElement(shownTasks); 
  modifiedProjectData = addLastElement(data.projectData); 


  const addTaskHandler = () =>{
    navigation.navigate('AddTask');
  };

  const addProjectHandler = () =>{
    navigation.navigate('ProjectTab',{ screen: 'AddProject'});
  };

  const editTaskHandler = (id ) => {
    navigation.navigate('EditTask', {id: id});
  };

  const deleteTaskHandler = (id ) => {
    console.log('Delete Task: '+id);
  };

  const renderTaskItem = ({ item }) => {
   
    if(item.projectId == "addButton"){
      return(<PlusButton OnPress = {addTaskHandler}/>)
    }else{
    const currentProject = data.projectData.find(project =>project.projectId == item.projectId) ;
    const colors = colorHandler(currentProject.color); 

      return (
        <TaskComponent
          id = {item.id}
          title={item.name}
          description={item.description}
          starttime={item.starttime}
          stoptime={item.endtime}
          isFinished={item.isFinished}
          colors = {colors}
          editHandler = {editTaskHandler}
          deleteHandler = {deleteTaskHandler}
        />)
      ;}
  };
  
  const renderProjectItem = ({ item }) => {
    if(item.projectId== "addButton"){
      return(<PlusButton OnPress ={addProjectHandler}/>)
    }else{
    return (
      <SmallProjectComponent
        name={item.name}
        id={item.projectId}
        colors={colorHandler(item.color)}
        onPress={setSelectedProject}
      />)
      ;}
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <FlatList
          horizontal
          data={modifiedProjectData}
          style = {styles.topListStyle}
          contentContainer = {styles.horizontalContainer}
          renderItem={renderProjectItem}
          showsHorizontalScrollIndicator={false}
           />
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
