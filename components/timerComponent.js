import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Timer = ({ initialValue1, initialValue2 }) => {
  const [timerValue1, setTimerValue1] = useState(initialValue1);
  const [timerValue2, setTimerValue2] = useState(initialValue2);
  const [isRunning1, setIsRunning1] = useState(false);
  const [isRunning2, setIsRunning2] = useState(false);

  useEffect(() => {
    let timerInterval1, timerInterval2;
    if (isRunning1) {
      timerInterval1 = setInterval(() => {
        setTimerValue1((prevValue) => prevValue - 1);
      }, 1000);
    }
    if (isRunning2) {
      timerInterval2 = setInterval(() => {
        setTimerValue2((prevValue) => prevValue - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timerInterval1);
      clearInterval(timerInterval2);
    };
  }, [isRunning1, isRunning2]);

  const handleStart1 = () => {
    setIsRunning1(true);
  };

  const handleStop1 = () => {
    setIsRunning1(false);
  };

  const handleStart2 = () => {
    setIsRunning2(true);
  };

  const handleStop2 = () => {
    setIsRunning2(false);
  };

  const handleChangeTimerValue1 = (value) => {
    setTimerValue1(value);
    setIsRunning1(false);
  };

  const handleChangeTimerValue2 = (value) => {
    setTimerValue2(value);
    setIsRunning2(false);
  };

  return (
    <View>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Timer 1: {timerValue1}</Text>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <TouchableOpacity
          style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#007AFF', marginRight: 10 }}
          onPress={handleStart1}
        >
          <Text style={{ color: 'white' }}>Start 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#FF3B30' }}
          onPress={handleStop1}
        >
          <Text style={{ color: 'white' }}>Stop 1</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16 }}>Change Timer 1 Value:</Text>
        <TouchableOpacity onPress={() => handleChangeTimerValue1(30)}>
          <Text style={{ fontSize: 16, color: 'blue' }}>30 seconds</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeTimerValue1(60)}>
          <Text style={{ fontSize: 16, color: 'blue' }}>60 seconds</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeTimerValue1(120)}>
          <Text style={{ fontSize: 16, color: 'blue' }}>120 seconds</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 24, marginBottom: 20, marginTop: 40 }}>Timer 2: {timerValue2}</Text>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <TouchableOpacity
          style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#007AFF', marginRight: 10 }}
          onPress={handleStart2}
        >
          <Text style={{ color: 'white' }}>Start 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#FF3B30' }}
          onPress={handleStop2}
        >
          <Text style={{ color: 'white' }}>Stop 2</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16 }}>Change Timer 2 Value:</Text>
        <TouchableOpacity onPress={() => handleChangeTimerValue2(30)}>
          <Text style={{ fontSize: 16, color: 'blue' }}>30 seconds</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeTimerValue2(60)}>
          <Text style={{ fontSize: 16, color: 'blue' }}>60 seconds</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeTimerValue2(120)}>
          <Text style={{ fontSize: 16, color: 'blue' }}>120 seconds</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Timer;
