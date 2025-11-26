import { Text, Pressable } from 'react-native';
import { PlusIcon } from 'react-native-heroicons/outline';

interface AddSourceButtonProps {
  onPress?: () => void;
  disabled?: boolean;
}

export default function AddSourceButton({
  onPress,
  disabled,
}: AddSourceButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`
        w-full items-center justify-center rounded-lg border-2 border-dashed p-4 mb-3
        border-gray-600
        active:border-blue-400 active:bg-blue-950/20
        ${disabled ? 'opacity-50' : ''}
      `}
    >
      <PlusIcon size={24} color="#9ca3af" />
      <Text className="mt-2 text-sm font-medium text-gray-300">Add Source</Text>
    </Pressable>
  );
}
