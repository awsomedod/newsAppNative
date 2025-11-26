import { Pressable, Text } from 'react-native';

interface AddSourceModalTabProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function AddSourceModalTab({
  label,
  isSelected,
  onPress,
}: AddSourceModalTabProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-1 rounded-md px-3 py-2 ${
        isSelected ? 'bg-gray-700' : ''
      }`}
    >
      <Text
        className={`text-sm font-medium text-center ${
          isSelected ? 'text-white' : 'text-gray-300'
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
