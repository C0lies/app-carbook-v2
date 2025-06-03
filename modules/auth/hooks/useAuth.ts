import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useUserStore } from '../../../store/useUserStore';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export function useAuth() {
    const router = useRouter();
    const segments = useSegments();
    const { user, isAuthenticated, isLoading, login, logout, setUser } = useUserStore();

    useEffect(() => {
        if (isLoading) {
            const initializeSession = async () => {
                try {
                    const currentUser = await authService.getCurrentUser();
                    if (currentUser) {
                        try {
                            const response = await authService.refreshSession();
                            setUser(response.user);
                        } catch (error) {
                            setUser(null);
                        }
                    } else {
                        setUser(null);
                    }
                } catch (error) {
                    setUser(null);
                }
            };

            initializeSession();
        }
    }, [isLoading, setUser]);

    useEffect(() => {
        const inAuthGroup = segments[0] === 'auth';
        const inTabsGroup = segments[0] === '(tabs)';
        const isProfileRoute = segments.some(segment =>
            segment === 'profile' || segment.startsWith('profile/')
        );

        if (!isLoading) {
            if (!isAuthenticated && !inAuthGroup) {
                router.replace('/auth/login');
            } else if (isAuthenticated && inAuthGroup) {
                router.replace('/(tabs)');
            } else if (isAuthenticated && !inTabsGroup && !isProfileRoute) {
                router.replace('/(tabs)');
            }
        }
    }, [isAuthenticated, isLoading, segments, router]);

    return {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout
    };
}