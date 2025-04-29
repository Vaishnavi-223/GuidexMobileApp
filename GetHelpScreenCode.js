GET HELP SCREEN CODE :- import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Vibration } from 'react-native';
import * as SMS from 'expo-sms';
import { Audio } from 'expo-av';  // Import expo-av to use audio features

export default function GetHelpScreen() {
  const [triggered, setTriggered] = useState(false);
  const [sound, setSound] = useState(null); // State to hold sound object

  // Function to load and play sound
  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/Rock.mp3')  // Ensure the correct path to your audio file
    );
    setSound(sound);
  };

  // Play sound when the help is triggered
  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
    }
  };

  // Stop the sound after a certain duration (e.g., 5 seconds)
  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();  // Stop the sound
    }
  };

  useEffect(() => {
    loadSound();  // Load sound when component mounts

    return () => {
      // Clean up: unload the sound when component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const handleHelpPress = async () => {
    setTriggered(true);
    Vibration.vibrate(); // Trigger vibration

    playSound();  // Play sound when help is triggered

    // Stop the sound after 10 seconds
    setTimeout(() => {
      stopSound();  // Stop the sound after 5 seconds
    }, 10000);  // 10000 ms = 10 seconds

    const result = await SMS.sendSMSAsync(
      ['+917972432649'], // Emergency contact number(s)
      'Help! I need assistance urgently. Please respond ASAP.'
    );

    if (result.result === 'sent') {
      Alert.alert('Success', 'SMS sent to emergency contacts!');
    } 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleHelpPress}>
        <Text style={styles.buttonText}>Get Help</Text>
      </TouchableOpacity>
      {triggered && <Text style={styles.confirm}>Help has been triggered!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  confirm: {
    fontSize: 18,
    color: 'green',
  },
});
