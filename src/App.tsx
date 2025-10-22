// In App.js in a new project

import '../global.css';
import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './AppNavigator.tsx';
import { GoogleSignInService } from './services/GoogleSignInService';

export default function App() {
  /**
   * Initialize Google Sign-In when app starts
   */
  useEffect(() => {
    GoogleSignInService.initialize();
  }, []);

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
