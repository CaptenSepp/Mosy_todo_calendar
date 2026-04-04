import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Animated, Platform } from 'react-native';
import { Colors } from '../styles/Colors';
import { NavigationContainer } from "@react-navigation/native";

import { colorHandler } from "../functions";

const FoldOutComponent = props => {
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useState(new Animated.Value(0))[0];
  const animatedOpacity = useState(new Animated.Value(0))[0];

  const toggleExpand = () => {
    if (expanded) {
      // Collapse animation
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => setExpanded(false));
    } else {
      // Expand animation
      setExpanded(true);
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: Platform.OS === 'ios'? 150 : 155, // Adjust the expanded height as needed
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return (
  
    <View style={[styles.ProjectContainer, {backgroundColor: colorHandler(props.color).primary}  ]} >
      <TouchableOpacity onPress={toggleExpand} >
        <View style={styles.topContainer}>
          <Text style={[styles.headerText]}>{props.title}</Text>
        </View>
      </TouchableOpacity>

      <Animated.View style={{ height: animatedHeight }}>
        <Animated.View style={{ opacity: animatedOpacity }}>
          <View>
            {expanded ? props.foldedOutContent : props.collapsedContent}
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const InnerContainer = props => {
  
  return (
    <View>
      <View style={[styles.innerContainer, { minHeight: 100 }, {backgroundColor: colorHandler(props.color).light} ]}>
        <Text style={styles.innerNormalText}> {props.description}</Text>
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity onPress={props.onEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const ProjectComponent = props => {
  return (
    <FoldOutComponent
      title={props.title}
      color={props.color}
      isFinished={props.isFinished}
      foldedOutContent={<InnerContainer
        description={props.description}
        color={props.color}
        onDelete={() => props.onDelete(props.title)}
        onEdit={() => props.onEdit(props.title)} />} />
  );
};

export default ProjectComponent;

const styles = StyleSheet.create({
  ProjectContainer: {
    backgroundColor: Colors.blue.secondary,
    //width: '95%',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    margin: 5
  },
  innerContainer: {
    backgroundColor: Colors.blue.light,
    borderRadius: 10,

    padding: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',

  },
  headerText: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textdarker,

  },
  innerHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 3,
    color: Colors.textdarker,

  },
  innerNormalText: {
    fontSize: 16,
    paddingVertical: 3,
    color: Colors.textdarker,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingVertical: 5
    // backgroundColor: 'gray'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.textdarker,
  }
});
