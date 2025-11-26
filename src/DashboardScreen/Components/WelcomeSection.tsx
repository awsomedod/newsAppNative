import { View, Text } from 'react-native';

interface WelcomeSectionProps {
  /**
   * Username to display in welcome message
   */
  username: string | undefined;
}

/**
 * Welcome section with personalized greeting
 */
export default function WelcomeSection({ username }: WelcomeSectionProps) {
  return (
    <View className="my-4">
      <Text className="text-2xl font-semibold text-white">
        Welcome, {username || 'User'}!
      </Text>
      <Text className="text-sm text-gray-400">
        Here's what's happening with your news today.
      </Text>
    </View>
  );
}
