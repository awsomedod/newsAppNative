import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface GetStartedButtonProps {
  onPress?: () => void;
}

export default function GetStartedButton({ onPress }: GetStartedButtonProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Default behavior - functionality will be added later
      console.log('Get Started pressed');
    }
  };

  return (
    <TouchableOpacity
      className="bg-white/10 border border-white/20 px-8 py-3 rounded-full"
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <Text className="text-white text-lg font-medium tracking-wide text-center">
        Get Started
      </Text>
    </TouchableOpacity>
  );
}
