import React, { useContext, useState , useEffect} from "react";
import { FlatList, StyleSheet, View, StatusBar, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Colors } from "../../styles/Colors";

import SmallProjectComponent from "../../components/SmallProjectComponent";
import TaskComponent from "../../components/TaskComponent";
import PlusButton from "../../components/PlusButton";

import { addLastElement, colorHandler } from "../../functions";

import { DataContext } from "../../data/DataContext";
import { Task } from "../../data/Classes";
import Timer from "../../components/timerComponent";
import moment from "moment";
import { storeData } from "../../data/AppStorage";



const TaskScreen = ({navigation}) => {
  const [data,setData] = useContext(DataContext);
  const [selectedProject, setSelectedProject] = useState("c1");


  const formatTime= (time)=>{
    return moment(time).format('HH:mm');
  };

  const formatDate = (date) =>{
    if (date != undefined){
    
    const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (months are zero-based) and pad with leading zero if necessary
    const year = date.getFullYear().toString(); // Get full year
    const formattedDate = `${day}.${month}.${year}`;
    //return moment(date).format('MMMM Do YYYY');
    return formattedDate;
  } else{
    
  }};

  // set selectedProject when every project was deleted to first newProject
  useEffect(() => {
    if (data.projectData.length == 1) {
      setSelectedProject(data.projectData[0].projectId);
    }
  }, [data]);

  // get Tasks from the selected Project
  const shownTasks = data.taskData.filter(task => task.projectId === selectedProject);

  // add plus Button to the end of the data
  const modifiedTaskData = addLastElement(shownTasks); 
  const modifiedProjectData = addLastElement(data.projectData); 
  
  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null;
  }
  
  const addTaskHandler = () =>{
    if (!data.projectData.find(project => project.projectId === selectedProject)) {
      Alert.alert('Create a project first', 'Please add a project before creating a task.');
      return;
    }
    navigation.navigate('AddTask', {isEdit: false,projectId: selectedProject});
  };

  const addProjectHandler = () =>{
    navigation.navigate('ProjectTab',{ screen: 'AddProject',params:{isEdit:false}});
  };

  const editTaskHandler = (id) => {
    navigation.navigate('EditTask', {isEdit: true,taskId: id});
  };

  const deleteTaskHandler = (id ) => {
    // delete Task
    const updatedTasks = data.taskData.filter(task => task.id != id);
    let newData = {
      projectData: data.projectData, 
      taskData:updatedTasks,
      taskIdCounter: data.taskIdCounter,
      projectIdCounter: data.projectIdCounter};
    setData(newData);
    storeData(newData);
  };

  const checkHandler = (id) =>{
    const updatedTasks = [...data.taskData]; 
    // find index of data you want to edit
    const taskIndex = data.taskData.findIndex(task => task.id === id);
    // get Task at index
    const originalTask = data.taskData[taskIndex];
    const isFinished = !originalTask.isFinished
    // overwrite Task with new data
    const updatedTask = {
        ...originalTask, // copy all properties from the original object
        isFinished: isFinished 
      };  
      
      updatedTasks[taskIndex] = updatedTask;
    let newData = {
      projectData: data.projectData, 
      taskData:updatedTasks,
      taskIdCounter: data.taskIdCounter,
      projectIdCounter: data.projectIdCounter};
    // save data in Context
    setData(newData);
    // save Data persistent
    storeData(newData);

  };

  const renderTaskItem = ({ item }) => {
    // check if projectId is add Button
    if(item.projectId == "addButton"){
      return(<PlusButton OnPress = {addTaskHandler}/>)
    }else{
    // get colors of current Project
    const currentProject = data.projectData.find(project =>project.projectId == item.projectId);
    const colors = colorHandler(currentProject.color); //get project colors
    const starttime = formatTime(item.starttime); // format Time from Date to HH:mm
    const endtime = formatTime(item.endtime);
    const date = formatDate(item.date); // format date from Date to dd.mm.yyyy
      return (
        <TaskComponent
          id = {item.id}
          title={item.name}
          description={item.description}
          date = {date}
          starttime={starttime}
          stoptime={endtime}
          isFinished={item.isFinished}
          colors = {colors}
          editHandler = {editTaskHandler}
          deleteHandler = {deleteTaskHandler}
          checkHandler = {checkHandler}
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
        selectedProject = {selectedProject}
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

export default TaskScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  topContainer: {
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundBody,
    borderBottomColor: Colors.light,
    borderBottomWidth: 1,
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
    width: '100%',
    //justifyContent: 'space-evenl'
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
