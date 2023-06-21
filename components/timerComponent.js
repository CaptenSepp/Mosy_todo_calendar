import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { scheduleNotification, registerNotificationHandler, addNotificationListener } from './timerNotifier';

const TimerComponent = () => {
  const [timerValue, setTimerValue] = useState(1500); // Initial timer value is set to 25 minutes
  const [isRunning, setIsRunning] = useState(false); // Indicates whether the timer is running or not

  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      // Start the timer if it is running
      timerInterval = setInterval(() => {
        setTimerValue((prevValue) => prevValue - 1);
      }, 1000);
    }

    if (timerValue === 0) {
      // Timer has reached 00:00, schedule a notification
      scheduleNotification('Timer Expired', 'The timer has reached 00:00');
      setIsRunning(false); // Stop the timer
    }

    // Clean up the timer interval on component unmount or when the dependencies change
    return () => clearInterval(timerInterval);
  }, [isRunning, timerValue]);

  const handleTimerClick = () => {
    setIsRunning(!isRunning); // Toggle the timer state (start/stop)
  };

  const handleLeftButtonClick = () => {
    setTimerValue(1500); // Reset the timer value to 25 minutes
    setIsRunning(false); // Stop the timer
  };

  const handleRightButtonClick = () => {
    setTimerValue(300); // Set the timer value to 5 minutes
    setIsRunning(false); // Stop the timer
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 20,
          backgroundColor: 'lightsalmon',
          paddingHorizontal: 10,
          paddingVertical: 25,
          borderRadius: 10,
        }}>
        {/* Button to set timer to 25 minutes */}
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: 'orangered',
            marginRight: 15,
          }}
          onPress={handleLeftButtonClick}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>
            Work 25:00
          </Text>
        </TouchableOpacity>
        {/* Timer display */}
        <TouchableOpacity onPress={handleTimerClick}>
          <Text style={{ fontSize: 34, marginBottom: 20, fontWeight: 'bold' }}>
            {formatTime(timerValue)}
          </Text>
        </TouchableOpacity>
        {/* Button to set timer to 5 minutes */}
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: 'orangered',
            marginLeft: 15,
          }}
          onPress={handleRightButtonClick}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>
            Break 05:00
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimerComponent;
