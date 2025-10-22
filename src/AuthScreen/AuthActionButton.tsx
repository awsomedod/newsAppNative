import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { ArrowRightIcon } from 'react-native-heroicons/outline';

interface AuthActionButtonProps {
  text: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function AuthActionButton({ 
  text, 
  onPress, 
  loading = false, 
  disabled = false 
}: AuthActionButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <View className="items-center">
      <Pressable
        onPress={isDisabled ? undefined : onPress}
        className={`
          w-full flex-row items-center justify-center gap-2
          rounded-lg px-4 py-2.5
          text-sm font-medium shadow-sm
          transition-colors duration-200
          ${isDisabled 
            ? 'bg-gray-600 opacity-50' 
            : 'bg-blue-600 active:bg-blue-700'
          }
        `}
        disabled={isDisabled}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <>
            <Text className="text-white text-sm font-medium">{text}</Text>
            <ArrowRightIcon className="h-4 w-4" color="white" />
          </>
        )}
      </Pressable>
    </View>
  );
}
