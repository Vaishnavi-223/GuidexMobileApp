import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Speech from 'expo-speech';

export default function TimePicker({ 
  label, 
  onTimeSelected, 
  initialTime = new Date() 
}) {
  const [time, setTime] = useState(initialTime);
  const [showPicker, setShowPicker] = useState(false);

  const handleTimeChange = (event, selectedTime) => {
    setShowPicker(false);
    if (selectedTime) {
      setTime(selectedTime);
      onTimeSelected(selectedTime);
      // Voice feedback for accessibility
      Speech.speak(`Time set to ${selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, {
        rate: 0.9
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.timeButton}
        accessibilityLabel={`Select ${label.toLowerCase()}`}
        accessibilityHint="Opens time picker dialog"
      >
        <Text style={styles.timeText}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
          onChange={handleTimeChange}
          minuteInterval={5} // Easier selection for elderly users
        />
      )}
    </View>
  );
}

const styles = {
  container: {
    marginVertical: 15
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333'
  },
  timeButton: {
    backgroundColor: '#4285F4',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  timeText: {
    color: 'white',
    fontSize: 22
  }
};