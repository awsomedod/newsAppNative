import OrDivider from './OrDivider';
import LoginInputs from './LoginInputs';
import AuthActionLinks from './AuthActionLinks';
import AuthActionButton from './AuthActionButton';
import GoogleSignInButton from './GoogleSignInButton';

export default function LoginForm() {
  return (
    <>
      <LoginInputs />
      <AuthActionLinks />
      <AuthActionButton text="Sign in" />
      <OrDivider text="or" />
      <GoogleSignInButton text="Sign in with Google" />
    </>
  );
}
