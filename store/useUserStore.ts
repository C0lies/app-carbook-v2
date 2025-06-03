import { create } from 'zustand';
import { AuthService } from '../modules/auth/services/authService';
import { User } from '../modules/auth/validation/types';

interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: User | null) => void;
}

const authService = new AuthService();

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isLoading: true,
    error: null,
    isAuthenticated: false,

    setUser: (user: User | null) => {
        set({
            user,
            isAuthenticated: !!user,
            isLoading: false,
            error: null
        });
    },

    login: async (email: string, password: string) => {
        try {
            set({ isLoading: true, error: null });
            const response = await authService.login(email, password);
            set({
                user: response.user,
                isAuthenticated: true,
                isLoading: false,
                error: null
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            set({
                user: null,
                error: errorMessage,
                isAuthenticated: false,
                isLoading: false
            });
            throw error;
        }
    },

    logout: async () => {
        try {
            set({ isLoading: true });
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            set({
                user: null,
                isAuthenticated: false,
                error: null,
                isLoading: false
            });
        }
    }
}));