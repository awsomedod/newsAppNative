import {
  Pressable,
  Image,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import { GoogleSignInService } from '../services/GoogleSignInService';
import { ApiService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface GoogleButtonProps {
  text: string;
  mode?: 'login' | 'signup';
  username?: string; // Required for signup mode
  onUsernameRequired?: () => void; // Callback when username is needed for signup
}

export default function GoogleButton({
  text,
  mode = 'login',
  username,
  onUsernameRequired,
}: GoogleButtonProps) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  /**
   * Handle Google Sign-In button press
   */
  const handleGoogleSignIn = async () => {
    // For signup mode, ensure username is provided
    if (mode === 'signup' && !username?.trim()) {
      onUsernameRequired?.();
      return;
    }

    setLoading(true);
    try {
      // Get Google ID token
      const googleUser = await GoogleSignInService.signIn();

      if (mode === 'login') {
        // Login with existing Google account
        const response = await ApiService.loginWithGoogle({
          id_token: googleUser.idToken,
        });
        login(response);
      } else {
        // Sign up with Google
        const response = await ApiService.signupWithGoogle({
          id_token: googleUser.idToken,
          username: username!.trim(),
        });
        login(response);
      }
    } catch (error: any) {
      console.error('Google Sign-In error:', error);

      // Handle specific error cases
      if (error.message?.includes('cancelled')) {
        // User cancelled - don't show error
        return;
      } else if (error.message?.includes('Account not found')) {
        Alert.alert(
          'Account Not Found',
          'No account found with this Google email. Please sign up first.',
          [{ text: 'OK' }],
        );
      } else if (error.message?.includes('Username already taken')) {
        Alert.alert(
          'Username Taken',
          'This username is already taken. Please choose a different username.',
          [{ text: 'OK' }],
        );
      } else if (error.message?.includes('Email already registered')) {
        Alert.alert(
          'Email Already Registered',
          'This email is already registered. Please use Google login instead.',
          [{ text: 'OK' }],
        );
      } else {
        Alert.alert(
          'Sign-In Error',
          error.message || 'Google Sign-In failed. Please try again.',
          [{ text: 'OK' }],
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Pressable
        onPress={handleGoogleSignIn}
        disabled={loading}
        className={`w-full flex-row items-center justify-center gap-2
             rounded-lg border border-gray-300 bg-white
             px-4 py-2.5 shadow-sm
             ${loading ? 'opacity-70' : 'active:bg-gray-100'}`}
      >
        {/* Loading indicator or Google Logo */}
        {loading ? (
          <ActivityIndicator size="small" color="#4285f4" />
        ) : (
          <Image
            source={{
              uri: 'https://www.gstatic.com/images/branding/product/1x/gsa_ios_64dp.png',
            }}
            className="h-5 w-5"
          />
        )}

        {/* Button text */}
        <Text className="text-sm font-medium text-gray-700">
          {loading ? 'Signing in...' : text}
        </Text>
      </Pressable>
    </View>
  );
}
