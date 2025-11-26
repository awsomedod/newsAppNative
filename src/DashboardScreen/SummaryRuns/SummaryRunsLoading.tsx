import { ActivityIndicator, Text } from 'react-native';

export default function SummaryRunsLoading() {
  return (
    <>
      <ActivityIndicator size="large" color="white" />
      <Text className="text-white text-lg font-medium">Loading...</Text>
    </>
  );
}
