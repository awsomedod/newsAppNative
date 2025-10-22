import {
  View,
  Text,
  TextInput,
  TextInputProps,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { ComponentType, useState } from 'react';
import {
  EyeIcon,
  EyeSlashIcon,
  ExclamationCircleIcon,
} from 'react-native-heroicons/outline';

interface InputFieldProps extends TextInputProps {
  label: string;
  icon: ComponentType<{ size: number; className: string; color?: string }>;
  placeholder: string;
  password?: boolean;
  error?: string;
  loading?: boolean;
}

export default function InputField({
  label,
  icon: Icon,
  placeholder,
  password = false,
  error,
  loading = false,
  ...textInputProps
}: InputFieldProps) {
  /**
   * A customizable input field component with label, icon, and placeholder text.
   * @param label - The text label displayed above the input
   * @param icon - The icon component to display on the left side of the input
   * @param placeholder - The placeholder text shown inside the input
   * @param password - Whether the input is a password input
   * @param error - Error message to display below the input
   * @param loading - Whether to show loading indicator
   * @param textInputProps - All other TextInput props are passed through
   */

  const [secure, setSecure] = useState(password);

  // Determine border color based on error state
  const borderColor = error ? 'border-red-500' : 'border-gray-700';

  return (
    <View className="mb-5">
      <Text className="block text-sm font-medium text-gray-200 mb-1.5">
        {label}
      </Text>
      <View className="relative w-full">
        {/* Outer container */}
        <View
          className={`flex-row items-center rounded-lg border ${borderColor} bg-gray-800 px-3`}
        >
          {/* Left icon */}
          <Icon size={20} color="#99a1af" className="mr-2" />

          {/* Input */}
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            autoCorrect={false}
            className="flex-1 py-2.5 text-gray-100 sm:text-sm"
            secureTextEntry={secure}
            {...textInputProps}
          />

          {/* Right side icons */}
          <View className="flex-row items-center gap-2">
            {/* Loading indicator */}
            {loading && <ActivityIndicator size="small" color="#99a1af" />}

            {/* Password toggle */}
            {password && (
              <Pressable onPress={() => setSecure(!secure)}>
                {secure ? (
                  <EyeIcon size={20} color="#99a1af" />
                ) : (
                  <EyeSlashIcon size={20} color="#99a1af" />
                )}
              </Pressable>
            )}
          </View>
        </View>

        {/* Error message */}
        {error && (
          <View className="flex-row items-center gap-1 mt-1">
            <ExclamationCircleIcon size={16} color="#ef4444" />
            <Text className="text-sm text-red-400">{error}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
