import { View, Alert } from 'react-native';
import { useState } from 'react';
import OrDivider from './OrDivider';
import SignUpInputs from './SignUpInputs';
import AuthActionButton from './AuthActionButton';
import GoogleSignUpSection from './GoogleSignUpSection';
import SwitchToLoginLink from './SwitchToLoginLink';
import { useAuth } from '../contexts/AuthContext';
import { ApiService } from '../services/api';

export default function SignUpForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Handle signup form submission
   */
  const handleSignUp = async () => {
    setLoading(true);
    try {
      // Register the user
      const registerResponse = await ApiService.register({
        email: email,
        username: username,
        password: password,
      });

      // Auto-login after successful registration
      login(registerResponse); // Now synchronous
    } catch (error: any) {
      console.error('Signup error:', error);

      Alert.alert('Registration Error', error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email && username && password && confirmPassword;

  return (
    <View>
      <SignUpInputs
        email={email}
        username={username}
        password={password}
        confirmPassword={confirmPassword}
        setEmail={setEmail}
        setUsername={setUsername}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
      />
      <AuthActionButton
        text="Sign up"
        onPress={handleSignUp}
        loading={loading}
        disabled={!isFormValid}
      />
      <OrDivider text="or sign up with Google" />
      <GoogleSignUpSection />
      <SwitchToLoginLink />
    </View>
  );
}
