import { View } from 'react-native';
import OrDivider from './OrDivider';
import SignUpInputs from './SignUpInputs';
import AuthActionButton from './AuthActionButton';
import GoogleSignUpSection from './GoogleSignUpSection';
import SwitchToLoginLink from './SwitchToLoginLink';

export default function SignUpForm() {
  return (
    <View>
      <SignUpInputs />
      <AuthActionButton text="Sign up" />
      <OrDivider text="or sign up with Google" />
      <GoogleSignUpSection />
      <SwitchToLoginLink />
    </View>
  );
}
