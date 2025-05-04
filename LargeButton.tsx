import { TouchableOpacity, Text } from 'react-native';

export default function LargeButton({
  title,
  onPress,
  color = '#4285F4'
}: {
  title: string;
  onPress: () => void;
  color?: string;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: color,
        padding: 25,
        borderRadius: 15,
        marginVertical: 10
      }}
      accessibilityLabel={title}
    >
      <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}