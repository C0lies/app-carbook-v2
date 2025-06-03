import LoginScreen from './login'; // Import ekranu logowania
import SignupScreen from './signup'; // Import ekranu rejestracji
import ForgotPasswordScreen from './forgot-password'; // Import ekranu resetowania hasła
import { Redirect } from 'expo-router';

export default function AuthIndex() {
    return <Redirect href="/auth/login" />;
}

export { LoginScreen, SignupScreen, ForgotPasswordScreen };