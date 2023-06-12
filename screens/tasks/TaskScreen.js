import React, { useContext, useState } from "react";
import { FlatList, StyleSheet, View, StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Colors } from "../../styles/Colors";

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

  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null;
  }

  const addTaskHandler = () =>{
    navigation.navigate('AddTask', {isEdit: false,projectId: selectedProject});
  };

  const addProjectHandler = () =>{
    navigation.navigate('ProjectTab',{ screen: 'AddProject'});
  };

  const editTaskHandler = (id) => {
    navigation.navigate('EditTask', {isEdit: true,taskId: id});
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
          date = {item.date}
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
      <FocusAwareStatusBar barStyle="light-content" backgroundColor={Colors.backgroundHeader} />
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
          showsVerticalScrollIndicator={false}/>
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
    backgroundColor: Colors.backgroundBody,
    borderBottomColor: Colors.light,
    borderBottomWidth: .5,
    paddingVertical: 3,
  },
  listContainer: {
    flex: 1,
    paddingVertical: 5,

    alignItems: 'center',
    backgroundColor: Colors.backgroundBody,

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
    backgroundColor: Colors.backgroundBody,
    //backgroundColor: 'lightgray',
  },
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignSelf: 'stretch'
  },
});
