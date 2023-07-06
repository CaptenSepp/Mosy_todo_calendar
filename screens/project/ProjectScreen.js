import React, {useContext} from "react";
import { FlatList, StyleSheet, View, StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Colors } from "../../styles/Colors";

import ProjectComponent from "../../components/Project Component";
import PlusButton from "../../components/PlusButton";

import { DataContext } from "../../data/DataContext";
import { addLastElement } from "../../functions";
import { storeData } from "../../data/AppStorage";

export default ProjectScreen = ({ navigation }) => {

  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null;
  }

  const [data,setData] = useContext(DataContext);
  
  const deleteHandler = (id) => {
    // delete project
    const updatedProjects = data.projectData.filter(project => project.projectId != id);
    // delete all tasks of selected project
    const updatedTasks = data.taskData.filter(task => task.projectId != id);
    let newData = {
      projectData: updatedProjects, 
      taskData:updatedTasks,
      taskIdCounter: data.taskIdCounter,
      projectIdCounter: data.projectIdCounter}
    setData(newData);
    // save data persistent
    storeData(newData);
  };
  

  const editHandler = ( projectId ) => {
    navigation.navigate('EditProject', {isEdit: true,projectId: projectId});
  };

  const addHandler = () => {
    navigation.navigate('AddProject', {isEdit: false});
    
  };

  // add plus button to the end  
  modifiedProjectData = addLastElement(data.projectData); 

  const renderProjectItem = ({ item }) => {
    if(item.projectId == "addButton"){
      return(
        <PlusButton OnPress={addHandler} />)
    }else{
      return (
        <ProjectComponent
          title={item.name}
          color={item.color}
          description={item.description} 
          onDelete={() => deleteHandler(item.projectId)}
          onEdit={() => editHandler(item.projectId)}
        />)
      ;}
  };

  return (
    <View style={styles.listContainer}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor={Colors.backgroundHeader} />
      <FlatList
        data={modifiedProjectData}
        contentContainerStyle={styles.contentContainer}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={renderProjectItem} />
    </View>

  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingTop: 8,
    paddingVertical: 3,
    alignItems: 'center',
    backgroundColor: Colors.backgroundBody,
  },
  list: {
    width: '90%',
  },
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignSelf: 'stretch'
  },
});
