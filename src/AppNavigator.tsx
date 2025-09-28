import { createContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GradientBackground from './Global/GradientBackground';
import LandingScreen from './LandingScreen/LandingScreen';
import AuthScreen from './AuthScreen/AuthScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
export const GlobaStateContext = createContext({});

export default function RootStack() {
  const [movie, setMovie] = useState('avengers');

  return (
    <GlobaStateContext.Provider value={{ movie, setMovie }}>
      <GradientBackground>
        <SafeAreaProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
              animation: 'simple_push',
              animationDuration: 50,
            }}
          >
            <Stack.Screen name="LandingScreen" component={LandingScreen} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </GradientBackground>
    </GlobaStateContext.Provider>
  );
}
