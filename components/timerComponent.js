import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';

import ModalAlert from './ModalAlert';

const TimerComponent = () => {
  const [timerValue, setTimerValue] = useState(1500); // Initial timer value is set to 25 minutes
  const [isRunning, setIsRunning] = useState(false); // Indicates whether the timer is running or not

  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

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
  };

  // Work button click handler
  const handleLeftButtonClick = () => {
    setTimerValue(1500); // Reset the timer value to 25 minutes
    setIsRunning(true); // Stop the timer
    setModalTitle("Time's Up!"); // Set the modal title
    setModalMessage("Your work session has ended. Take a break and recharge."); // Set the modal message
  };

  // Break button click handler
  const handleRightButtonClick = () => {
    setTimerValue(300); // Set the timer value to 5 minutes
    setIsRunning(true); // Stop the timer
    setModalTitle("Break's Over!"); // Set the modal title
    setModalMessage("Your break time has ended. It's time to get back to work."); // Set the modal message
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <ModalAlert 
        visible={timerValue === 0}
        onClose={() => setTimerValue(1500)}
        title={modalTitle}
        message={modalMessage}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLeftButtonClick}>
          <Text style={styles.buttonText}>Work 25:00</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTimerClick}>
          <Text style={styles.timerText}>{formatTime(timerValue)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRightButtonClick}>
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
