import { View, Alert } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import InputField from '../InputField';
import GoogleSignInButton from '../GoogleSignInButton';
import { UserIcon } from 'react-native-heroicons/outline';
import { ApiService } from '../../../services/api';

export default function GoogleSignUpSection() {
  const [googleUsername, setGoogleUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const usernameCheckTimeout = useRef<number | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (usernameCheckTimeout.current) {
        clearTimeout(usernameCheckTimeout.current);
      }
    };
  }, []);

  /**
   * Validate username format
   */
  const validateUsernameFormat = (username: string): boolean => {
    const pattern = /^[a-zA-Z0-9_]{3,30}$/;
    return pattern.test(username);
  };

  /**
   * Check username availability when user finishes typing
   */
  const checkUsernameAvailability = async (username: string) => {
    if (!username.trim()) {
      setUsernameError('');
      return;
    }

    if (!validateUsernameFormat(username)) {
      setUsernameError(
        'Username must be 3-30 characters, alphanumeric and underscores only',
      );
      return;
    }

    setIsCheckingUsername(true);
    try {
      const response = await ApiService.checkUsername(username);
      if (!response.available) {
        setUsernameError('Username is already taken');
      } else {
        setUsernameError('');
      }
    } catch (error: any) {
      console.error('Username check error:', error);
      setUsernameError('Unable to check username availability');
    } finally {
      setIsCheckingUsername(false);
    }
  };

  /**
   * Handle username change with debounced availability check
   */
  const handleUsernameChange = (text: string) => {
    setGoogleUsername(text);
    setUsernameError('');

    // Clear any existing timeout
    if (usernameCheckTimeout.current) {
      clearTimeout(usernameCheckTimeout.current);
    }

    // Set new timeout for username check
    usernameCheckTimeout.current = setTimeout(() => {
      checkUsernameAvailability(text);
    }, 500);
  };

  /**
   * Handle when Google button is pressed but username is missing
   */
  const handleUsernameRequired = () => {
    if (!googleUsername.trim()) {
      setUsernameError('Username is required for Google sign up');
      Alert.alert(
        'Username Required',
        'Please enter a username to sign up with Google.',
        [{ text: 'OK' }],
      );
    }
  };

  return (
    <View>
      {/* Google username field */}
      <InputField
        label="Username (for Google sign up)"
        icon={UserIcon}
        placeholder="your_username"
        autoComplete="username"
        value={googleUsername}
        onChangeText={handleUsernameChange}
        error={usernameError}
        loading={isCheckingUsername}
      />

      {/* Google sign up button */}
      <GoogleSignInButton
        text="Sign up with Google"
        mode="signup"
        username={googleUsername}
        onUsernameRequired={handleUsernameRequired}
      />
    </View>
  );
}
