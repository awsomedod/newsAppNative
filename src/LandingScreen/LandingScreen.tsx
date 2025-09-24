import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import GetStartedButton from './GetStartedButton';

const LandingScreen = ({ navigation }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isPushed, setIsPushed] = useState(true);

  const handlePress = () => {
    setIsPushed(false);
    navigation.navigate('AuthScreen');
    setTimeout(() => {
      setIsPushed(true);
    }, 1000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 500); // Wait 2.5 seconds before starting fade in

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  return (
    <View className="flex-1 items-center justify-center">
      {isPushed && (
        <>
          <Text className="text-white text-2xl font-bold mb-4">
            Welcome to News App!
          </Text>
          <Animated.View style={{ opacity: fadeAnim }}>
            <GetStartedButton onPress={handlePress} />
          </Animated.View>
        </>
      )}
    </View>
  );
};

export default LandingScreen;
