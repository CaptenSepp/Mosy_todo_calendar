import React, { useState, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import { Colors } from '../styles/Colors';
import { Ionicons } from '@expo/vector-icons';



const FoldOutComponent = props => {
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useState(new Animated.Value(0))[0];

  const toggleExpand = () => {
    Animated.timing(animatedHeight, {
      toValue: expanded ? 0 : 265, // Adjust expanded and collapsed heights as needed
      duration: 200,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    if (!expanded) {
      animatedHeight.setValue(height);
    }
  };

  return (
    <View style={styles.taskContainer} >
      <TouchableOpacity onPress={toggleExpand} >
        <View style={styles.topContainer}>

          <Text style={[styles.headerText, props.isFinished ? { textDecorationLine: 'line-through' } : null]}>{props.title}</Text>
          <TouchableOpacity style={{ justifyContent: 'center' }}>
            {props.isFinished === false ? <Ionicons style={{ alignSelf: 'center' }} name={'ellipse-outline'} size={32} color={'black'} /> : <Ionicons style={{ alignSelf: 'center' }} name={'checkmark-circle-outline'} size={32} color={'black'} />}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Animated.View style={{ height: animatedHeight }}>
        <View onLayout={handleLayout}>
          {expanded ? props.foldedOutContent : props.collapsedContent}

        </View>
      </Animated.View>
    </View>
  );
};

const InnerContainer = props => {
  return (
    <View>
      <View style={[styles.innerContainer, { minHeight: 100 }]}>
        <Text style={styles.innerNormalText}> {props.description}</Text>
      </View>
      <View style={styles.innerContainer}>
        <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.innerHeaderText}>Date</Text>
          <Text style={styles.innerHeaderText}>01.01.2000</Text>
        </View>
        <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.innerHeaderText}>Start-Time</Text>
          <Text style={styles.innerHeaderText}>{props.timeEstimation}</Text>
        </View>
        <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.innerHeaderText}>Stop-Time</Text>
          <Text style={styles.innerHeaderText}>{props.timeBlockDuration}</Text>
        </View>
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity>
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
      foldedOutContent={<InnerContainer
        content={'Content'}
        description={props.description}
        timeEstimation={props.starttime}
        timeBlockDuration={props.stoptime} />} />
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

  },
  innerHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 3,

  },
  innerNormalText: {
    fontSize: 15,
    paddingVertical: 3,
    color: 'gray'
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
    fontSize: 15
  }
});
