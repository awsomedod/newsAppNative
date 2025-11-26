import { Text, Pressable } from 'react-native';

interface AuthTabProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function AuthTab({ label, isSelected, onPress }: AuthTabProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-1 items-center rounded-lg px-3 py-2
      ${isSelected ? 'bg-gray-900 border-2 border-blue-500' : 'bg-transparent'}`}
    >
      <Text
        className={`text-sm font-medium
        ${isSelected ? 'text-white' : 'text-gray-300'}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
