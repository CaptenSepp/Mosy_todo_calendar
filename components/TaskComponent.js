import React, { useState, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import { Colors } from '../styles/Colors';
import { Ionicons } from '@expo/vector-icons';



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
          toValue: 275, // Adjust the expanded height as needed
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
    <View style={[styles.taskContainer,{backgroundColor: props.colors.secondary}]} >
      <TouchableOpacity onPress={toggleExpand} >
        <View style={styles.topContainer}>

          <Text style={[styles.headerText, props.isFinished ? { textDecorationLine: 'line-through' } : null]}>{props.title}</Text>
          <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => props.checkHandler(props.id)}>
            {props.isFinished === false ? <Ionicons style={{ alignSelf: 'center' }} name={'ellipse-outline'} size={32} color={'black'} /> : <Ionicons style={{ alignSelf: 'center' }} name={'checkmark-circle-outline'} size={32} color={'black'} />}
          </TouchableOpacity>
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
      <View style={[styles.innerContainer, { minHeight: 100 , backgroundColor: props.colors.light}]}>
        <Text style={styles.innerNormalText}> {props.description}</Text>
      </View>
      <View style={[styles.innerContainer,{backgroundColor: props.colors.light}]}>
        <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.innerHeaderText}>Date</Text>
          <Text style={styles.innerHeaderText}>{props.date}</Text>
        </View>
        <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.innerHeaderText}>Start-Time</Text>
          <Text style={styles.innerHeaderText}>{props.startTime}</Text>
        </View>
        <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.innerHeaderText}>Stop-Time</Text>
          <Text style={styles.innerHeaderText}>{props.stopTime}</Text>
        </View>
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity onPress = {() =>props.editHandler(props.id)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() =>props.deleteHandler(props.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskComponent = props => {
  
  return (
    <FoldOutComponent
      title={props.title}
      isFinished={props.isFinished}
      colors = {props.colors}
      id = {props.id}
      checkHandler = {props.checkHandler}
      foldedOutContent={<InnerContainer
        id = {props.id}
        content={'Content'}
        description={props.description}
        startTime={props.starttime}
        stopTime={props.stoptime}
        date = {props.date}
        colors = {props.colors} 
        editHandler = {props.editHandler}
        deleteHandler = {props.deleteHandler}/>} />
  );
};

const styles = StyleSheet.create({
  taskContainer: {
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
    alignItems: 'flex-start'

  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  headerText: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textdarker

  },
  innerHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 3,
    color: Colors.textdark

  },
  innerNormalText: {
    fontSize: 15,
    paddingVertical: 3,
    color: Colors.textdark
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
