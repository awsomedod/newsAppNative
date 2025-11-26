import { Text, View, TextInput } from 'react-native';

interface FormInputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  setFocusedInput: (input: string | null) => void;
  focusedInput: string | null;
  placeholder: string;
}

export default function FormInputField({
  label,
  value,
  onChangeText,
  setFocusedInput,
  focusedInput,
  placeholder,
}: FormInputFieldProps) {
  return (
    <View className="mt-4">
      <Text className="text-sm font-medium text-gray-300 mb-1">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocusedInput(label)}
        onBlur={() => setFocusedInput(null)}
        className={`w-full rounded-lg border-2 ${focusedInput === label ? 'border-blue-500' : 'border-gray-700'} px-3 py-2 text-sm text-gray-100 bg-gray-800`}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
}
