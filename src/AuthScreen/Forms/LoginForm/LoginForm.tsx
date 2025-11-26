import { useState } from 'react';
import { Alert } from 'react-native';
import OrDivider from '../OrDivider';
import LoginInputs from './LoginInputs';
import AuthActionLinks from './AuthActionLinks';
import AuthActionButton from '../AuthActionButton';
import GoogleSignInButton from '../GoogleSignInButton';
import { useAuth } from '../../../contexts/AuthContext';
import { ApiService } from '../../../services/api';

export default function LoginForm() {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Handle login form submission
   */
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await ApiService.login({
        identifier: identifier,
        password: password,
      });

      login(response); // Now synchronous
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Login Error', error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoginInputs
        identifier={identifier}
        password={password}
        setIdentifier={setIdentifier}
        setPassword={setPassword}
      />
      <AuthActionLinks />
      <AuthActionButton
        text="Sign in"
        onPress={handleLogin}
        loading={loading}
        disabled={!identifier || !password}
      />
      <OrDivider text="or" />
      <GoogleSignInButton text="Sign in with Google" mode="login" />
    </>
  );
}
