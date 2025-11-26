import { Text } from 'react-native';

export default function AddSourceModalHeader() {
  return (
    <>
      {/* Header */}
      <Text className="text-base font-semibold text-white">Add New Source</Text>
      <Text className="mt-1 text-sm text-gray-400">
        Add a new news source manually or get AI suggestions.
      </Text>
    </>
  );
}
