import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Audio } from 'expo-av';
import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';
import { useState } from 'react';
import * as Speech from 'expo-speech'; // 👈 Added for speech
import FallTest from './fall-test'; // ⬅ adjust path if needed

const FALL_DETECTION_TASK = 'fall-detection-task';

const handleEmergency = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/fall.mp3')
    );
    await sound.playAsync();
    sendSMSWithLocation();
    openDialer();
  } catch (error) {
    console.error('Error during emergency handling:', error);
  }
};

const sendSMSWithLocation = async () => {
  const loc = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = loc.coords;

  const message = 🚨 Fall detected! I may need help.\nLocation: ${latitude}, ${longitude}\nhttps://maps.google.com/?q=${latitude},${longitude};
  const smsUrl = sms:+919822115810?body=${encodeURIComponent(message)};

  Linking.openURL(smsUrl).catch(() => {
    console.error('Failed to open SMS');
  });
};

const openDialer = () => {
  Linking.openURL(tel:+919822115810).catch(() => {
    console.error('Failed to open dialer');
  });
};

TaskManager.defineTask(FALL_DETECTION_TASK, async () => {
  try {
    const x = 0, y = 0, z = 0; // Replace with actual sensor data
    const acceleration = Math.sqrt(x * x + y * y + z * z);
    const fallThreshold = 1.2;

    if (acceleration > fallThreshold) {
      handleEmergency();
    }
  } catch (error) {
    console.error('Error detecting fall:', error);
  }
});

export default function App() {
  const router = useRouter();

  // 👇 Moved here so it’s accessible in useEffect
  const speakButtons = () => {
    const message =
      'Welcome to GuideX. The first button is Get Help, the second is Navigation, third is Reminders, and fourth is Emergency Alerts.';
    Speech.speak(message, { rate: 0.9 });
  };

  useEffect(() => {
    const startBackgroundTask = async () => {
      try {
        await BackgroundFetch.registerTaskAsync(FALL_DETECTION_TASK, {
          minimumInterval: 15 * 60,
          stopOnTerminate: false,
          startOnBoot: true,
        });
        console.log('Background task registered');
      } catch (error) {
        console.error('Failed to register background task:', error);
      }
    };

    startBackgroundTask();

    // 🔊 Speak automatically when app loads
    speakButtons();

  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FallTest />

      <Text style={styles.title}>Welcome to GuideX</Text>

      {/* 🔊 Optional: Keep the manual button for testing or remove it */}
      {/* <TouchableOpacity style={styles.voiceButton} onPress={speakButtons}>
        <Text style={styles.voiceButtonText}>🔊 Speak Button Info</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.button} onPress={() => router.push('/get-help')}>
        <Text style={styles.buttonText}>Get Help</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/nav')}>
        <Text style={styles.buttonText}>Navigation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/reminder')}>
        <Text style={styles.buttonText}>Reminders</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/emergency')}>
        <Text style={styles.buttonText}>Emergency Alerts</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F0FE',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  voiceButton: {
    backgroundColor: '#34A853',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 20,
  },
  voiceButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
