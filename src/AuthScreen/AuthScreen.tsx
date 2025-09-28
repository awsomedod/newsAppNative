import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WelcomeHeader from './WelcomeHeader';
import AuthTabSwitcher from './AuthTabSwitcher';
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { createContext } from 'react';

export const AuthContext = createContext({
  setSelected: (_selected: 'Login' | 'Sign Up') => {},
});

export default function AuthScreen() {
  const [selected, setSelected] = useState<'Login' | 'Sign Up'>('Login');

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      className="flex-1 pt-[StatusBar.currentHeight]"
    >
      <KeyboardAvoidingView behavior={'padding'} className="flex-1">
        <ScrollView
          contentContainerClassName="justify-start pt-2.5"
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center">
            <WelcomeHeader />
            <View className="rounded-2xl border p-6 border-gray-800 bg-gray-900 mx-8">
              <AuthTabSwitcher
                selected={selected}
                onSelectionChange={setSelected}
              />
              <AuthContext.Provider value={{ setSelected }}>
                {selected === 'Login' ? <LoginForm /> : <SignUpForm />}
              </AuthContext.Provider>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
