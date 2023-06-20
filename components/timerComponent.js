import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const TimerScreen = () => {
  const [timerValue, setTimerValue] = useState(1500); // 25 minutes in seconds 
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let timerInterval;
    if (isRunning) {
      timerInterval = setInterval(() => {
        setTimerValue((prevValue) => prevValue - 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning]);
  const handleTimerClick = () => {
    setIsRunning((prevValue) => !prevValue);
  };
  const handleSetTimerValue = (value) => {
    if (!isRunning) {
      setTimerValue(value);
    }
  };
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 20,
          backgroundColor: 'lightsalmon',
          paddingHorizontal: 10,
          paddingVertical: 30,
        }}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: 'orangered',
            marginRight: 30,
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
            marginLeft: 30,
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
export default TimerScreen; 