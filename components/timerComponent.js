import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { scheduleNotification, registerNotificationHandler, addNotificationListener } from './timerNotifier';


const TimerComponent = () => {
  const [timerValue, setTimerValue] = useState(1500); // 25 minutes in seconds 
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      timerInterval = setInterval(() => {
        setTimerValue((prevValue) => prevValue - 1);
      }, 1000);
    }
    if (timerValue === 0) {
      scheduleNotification('Timer Expired', 'The timer has reached 00:00');
      setIsRunning(false);
    }
    
    return () => clearInterval(timerInterval);
  }, [isRunning, timerValue]);

  const handleTimerClick = () => {
    setIsRunning(!isRunning);
  };
  
  const handleLeftButtonClick = () => {
    setTimerValue(1500); // 25 minutes in seconds
    setIsRunning(false);
  };

  const handleRightButtonClick = () => {
    setTimerValue(300); // 5 minutes in seconds
    setIsRunning(false);
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
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: 'orangered',
            marginRight: 15,
          }}
          onPress={handleSetTimerValue.bind(null, 1500)}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>
            Work 25:00
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTimerClick}>
          <Text style={{ fontSize: 34, marginBottom: 20, fontWeight: 'bold' }}>
            {formatTime(timerValue)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: 'orangered',
            marginLeft: 15,
          }}
          onPress={handleSetTimerValue.bind(null, 300)}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>
            Break 05:00
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default TimerComponent; 