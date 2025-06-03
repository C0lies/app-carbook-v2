import { useAuth } from '@/modules/auth/hooks/useAuth';
import { Redirect } from 'expo-router';

export default function Index() {
    const { isAuthenticated } = useAuth();

    // Przekieruj na odpowiedni ekran w zależności od stanu autoryzacji
    if (isAuthenticated) {
        return <Redirect href="/(tabs)" />;
    }

    return <Redirect href="/auth/login" />;
}