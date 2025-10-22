import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import GradientBackground from './Global/GradientBackground';
import LandingScreen from './LandingScreen/LandingScreen';
import AuthScreen from './AuthScreen/AuthScreen';
import DashboardScreen from './screens/DashboardScreen';

const Stack = createNativeStackNavigator();

/**
 * Navigation stack for unauthenticated users
 * Includes Landing and Auth screens
 */
function AuthNavigator() {
  return (
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
  );
}

/**
 * Navigation stack for authenticated users
 * Includes Dashboard and other app screens
 */
function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
        animation: 'simple_push',
        animationDuration: 50,
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}

/**
 * Root navigator that switches between auth and app stacks
 * based on authentication state
 */
function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <GradientBackground>
      <SafeAreaProvider>
        {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
      </SafeAreaProvider>
    </GradientBackground>
  );
}

/**
 * Main app component with authentication provider
 */
export default function RootStack() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
