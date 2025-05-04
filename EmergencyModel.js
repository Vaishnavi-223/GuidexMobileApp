import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';

export default function EmergencyModal({ 
  visible, 
  onConfirm, 
  onCancel,
  emergencyType = 'general'
}) {
  // Voice alert when modal appears
  React.useEffect(() => {
    if (visible) {
      Speech.speak(
        emergencyType === 'fall' 
          ? "Fall detected! Confirm emergency alert?" 
          : "Emergency assistance requested. Confirm?",
        { rate: 0.8 }
      );
    }
  }, [visible]);

  const getEmergencyMessage = () => {
    switch (emergencyType) {
      case 'fall': 
        return "Fall Detected!\nEmergency contact will be alerted.";
      case 'medical':
        return "Medical Emergency!\nHelp is on the way.";
      default:
        return "Emergency Alert!\nAssistance requested.";
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.emergencyText}>{getEmergencyMessage()}</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onCancel}
              style={[styles.button, styles.cancelButton]}
              accessibilityLabel="Cancel emergency"
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={onConfirm}
              style={[styles.button, styles.confirmButton]}
              accessibilityLabel="Confirm emergency"
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.instructions}>
            Open with:
          </Text>
          
          <View style={styles.appOptions}>
            {['WhatsApp', 'Truecaller', 'Messaging'].map((app) => (
              <TouchableOpacity
                key={app}
                style={styles.appButton}
                onPress={() => {/* Implement app-specific actions */}}
              >
                <Text style={styles.appButtonText}>{app}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center'
  },
  emergencyText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#FF3B30',
    lineHeight: 32
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20
  },
  button: {
    padding: 18,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: '#AEAEB2'
  },
  confirmButton: {
    backgroundColor: '#34C759'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  instructions: {
    fontSize: 18,
    marginBottom: 15,
    color: '#000'
  },
  appOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  appButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    minWidth: 100
  },
  appButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  }
});
