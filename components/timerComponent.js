import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Animated } from 'react-native';

import ModalAlert from './ModalAlert';
import { Audio } from 'expo-av';


const animatedOpacity = new Animated.Value(0.5);

const TimerComponent = () => {
  // Timer
  const [breakDuration, setBreakDuration] = useState(300); // Initial break duration is set to 5 minutes
  const [workDuration, setWorkDuration] = useState(1500); // Initial work duration is set to 25 minutes
  const [timerValue, setTimerValue] = useState(1500); // Initial timer value is set to 25 minutes
  const [isRunning, setIsRunning] = useState(false); // Indicates whether the timer is running or not
  const [lastMode, setLastMode] = useState('work'); // Indicates the last mode of the timer ['work', 'break'
  // ModalAlert
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  // pause opacity animation
  const [paused, setPaused] = useState(true);
  
  useEffect(() => {
    if (paused) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedOpacity, {
            toValue: 0.5,
            duration: 750,
            useNativeDriver: true,
          }),
          Animated.timing(animatedOpacity, {
            toValue: 1,
            duration: 750,
            useNativeDriver: true,
          }),
          Animated.timing(animatedOpacity, {
            toValue: 0.5,
            duration: 750,
            useNativeDriver: true,
          }),
          
        ])
      ).start();
    } else {
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }).start();
  }
}), [paused];
    

  // Timer
  useEffect(() => {
    let timerInterval;
    if (isRunning) {
      // Start the timer if it is running
      timerInterval = setInterval(() => {
        setTimerValue((prevValue) => prevValue - 1);
      }, 1000);
    }
    if (timerValue === 0) {
      setIsRunning(false); // Stop the timer
    }
    // Clean up the timer interval on component unmount or when the dependencies change
    return () => clearInterval(timerInterval);
  }, [isRunning, timerValue]);

  const handleTimerClick = () => {
    setIsRunning(!isRunning); // Toggle the timer state (start/stop)
    setPaused(!paused);
  };

  // Work button click handler
  const handleLeftButtonClick = shallRun => {
    setTimerValue(workDuration); // Reset the timer value to 25 minutes
    setIsRunning(shallRun); // eventually start the timer
    setLastMode('work'); // Set the last mode to 'work'

    setModalTitle("Time's Up!"); // Set the modal title
    setModalMessage("Your work session has ended. Take a break and recharge."); // Set the modal message
  };

  // Break button click handler
  const handleRightButtonClick = shallRun => {
    setTimerValue(breakDuration); // Set the timer value to 5 minutes
    setIsRunning(shallRun); // eventually start the timer
    setLastMode('break'); // Set the last mode to 'break'

    setModalTitle("Break's Over!"); // Set the modal title
    setModalMessage("Your break time has ended. It's time to get back to work."); // Set the modal message
  };

  // ModalAlert Play Sound
  const [sound, setSound] = React.useState();
  async function playSound() {
    console.log('Loading Sound');
    // maximize volume
    const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/notification.mp3'),
    );
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync(); 
  }
  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);
  React.useEffect(() => {
        // if isRunning is false and timerValue is 0, play sound
        if (timerValue === 0  && !isRunning) {
          playSound();
        }
  }, [isRunning, timerValue]);

  // Format the time in MM:SS format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <ModalAlert 
        visible={timerValue === 0}
        onClose={() => lastMode === 'work' ? handleRightButtonClick(shallRun=false) : handleLeftButtonClick(shallRun=false)}
        title={modalTitle}
        message={modalMessage}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleLeftButtonClick(shallRun=true)}>
            <Text style={styles.buttonText}>Work 25:00</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTimerClick}>
          <Animated.View style={{opacity: animatedOpacity}}>
            <Text style={styles.timerText}>{formatTime(timerValue)}</Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleRightButtonClick(shallRun=true)}>
          <Text style={styles.buttonText}>Break 05:00</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'lightsalmon',
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 15,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: 'orangered',
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 15,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  timerText: {
    fontSize: 34,
    marginBottom: 20,
    fontWeight: 'bold',
  },
};

export default TimerComponent;
