import React, {useContext} from "react";
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors } from "../../styles/Colors";

import ProjectComponent from "../../components/Project Component";
import PlusButton from "../../components/PlusButton";

import { DataContext } from "../../data/DataContext";

export default ProjectScreen = ({ navigation }) => {
  const [data,setData] = useContext(DataContext);
  
  const deleteHandler = (title, id ) => {
    console.log("Delete: " + title + ' (ID: ' + id + ')');
    alert("Delete: " + title + ' (ID: ' + id + ')');
  };

  const editHandler = (title, projectId ) => {
    console.log("Edit: " + title + ' (ID: ' + projectId + ')' );
    navigation.navigate('EditProject', {id: projectId});
  };

  const addHandler = () => {
    console.log("Add Project");
    navigation.navigate('AddProject');
  };


  const addLastElement = (data) =>{
    const endValue = {id: data.length+1,projectId: "addButton"};
    const updatedData = [...data, endValue];
    return updatedData
  }

  
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
          onDelete={() => deleteHandler(item.name, item.projectId)}
          onEdit={() => editHandler( item.name, item.projectId)}
        />)
      ;}
  };

  return (
    <View style={styles.listContainer}>
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
