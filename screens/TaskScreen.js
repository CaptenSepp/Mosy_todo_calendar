import React from "react";
import { FlatList, StyleSheet, View, } from 'react-native';

import projectData from "../data/ProjectData";
import taskData from "../data/TaskData";

import SmallProjectComponent from "../components/SmallProjectComponent";
import TaskComponent from "../components/TaskComponent";

import { Colors } from "../styles/Colors";


export const colorHandler = (color) => {
  const colorValues = Colors[color];
  if (colorValues) {
    const { primary, secondary, light } = colorValues;
    return { primary, secondary, light };
  }
  return null;
};

const renderTaskItem = ({ item }) => {
  return (
    <TaskComponent
      title={item.name}
      description={item.description}
      starttime={item.starttime}
      stoptime={item.endtime}
      isFinished={item.isFinished}
    />
  );
};


const renderProjectItem = ({ item }) => {
  return (
    <SmallProjectComponent
      name={item.name}
      id={item.id}
      colors={colorHandler(item.color)}
    />
  );
};

export default TaskScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <FlatList
          horizontal
          data={projectData}
          renderItem={renderProjectItem}
          showsHorizontalScrollIndicator={false} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          style={styles.list}
          data={taskData}
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
    flex: 0.1,
    backgroundColor: 'white',
    paddingVertical: 3,
    //backgroundColor: 'lightgray',
  },
  listContainer: {
    flex: 1,
    paddingVertical: 5,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',

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
