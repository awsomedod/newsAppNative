// In App.js in a new project

import '../global.css';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './AppNavigator.tsx';

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
