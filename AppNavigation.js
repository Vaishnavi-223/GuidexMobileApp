// Create src/navigation/AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import GetHelpScreen from '../screens/GetHelpScreen';
import RemindersScreen from '../screens/RemindersScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import FallDetectionScreen from '../screens/FallDetectionScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontSize: 24 }, // Large text
        headerTintColor: '#000', // High contrast
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="GetHelp" component={GetHelpScreen} />
      <Stack.Screen name="Reminders" component={RemindersScreen} />
      <Stack.Screen name="Emergency" component={EmergencyScreen} />
      <Stack.Screen name="FallDetection" component={FallDetectionScreen} />
    </Stack.Navigator>
  );
}