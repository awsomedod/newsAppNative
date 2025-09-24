import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

interface GradientBackgroundProps {
  children: React.ReactNode;
}

export default function GradientBackground({
  children,
}: GradientBackgroundProps) {
  return (
    <LinearGradient
      colors={['#101828', '#101828', '#1e2939']}
      className="flex-1"
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
}
