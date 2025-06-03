import { jwtDecode } from 'jwt-decode';
import { apiClient } from '../../../services/apiClient';
import { storage } from '../../../utils/storage';
import { AuthResponse, DecodedToken, RefreshResponse, User } from '../validation/types';

export class AuthService {
    async login(email: string, password: string): Promise<AuthResponse & { user: User }> {
        try {
            const response = await apiClient.post<AuthResponse>('/auth', { email, password });

            if (!response.accessToken) {
                throw new Error('No access token received');
            }

            // Dekoduj token JWT aby uzyskać dane użytkownika
            const decodedToken = jwtDecode<DecodedToken>(response.accessToken);

            // Utwórz obiekt user z danych z tokena
            const user: User = {
                id: decodedToken.id,
                email: decodedToken.email,
                role: decodedToken.role
            };

            // Set the token in the API client
            apiClient.setAuthToken(response.accessToken);

            // Store user data
            await storage.setItem('user', JSON.stringify(user));

            return {
                ...response,
                user
            };
        } catch (error) {
            console.error('Login error details:', error);
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            // Call logout endpoint to invalidate refresh token
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clean up local storage and API client
            apiClient.clearAuthToken();
            await storage.removeItem('user');
        }
    } async refreshSession(): Promise<{ user: User }> {
        try {
            // Najpierw spróbuj pobrać użytkownika z local storage
            const storedUser = await storage.getItem('user');
            let user: User | null = storedUser ? JSON.parse(storedUser) : null;

            // Spróbuj odświeżyć token
            const response = await apiClient.get<RefreshResponse>('/auth/refresh');

            // Jeśli dostaliśmy nowy token, zaktualizuj go
            if (response.accessToken) {
                apiClient.setAuthToken(response.accessToken);
                const decodedToken = jwtDecode<DecodedToken>(response.accessToken);
                user = {
                    id: decodedToken.id,
                    email: decodedToken.email,
                    role: decodedToken.role
                };
                await storage.setItem('user', JSON.stringify(user));
            }

            // Jeśli nie mamy użytkownika (ani z response, ani z storage), rzuć błąd
            if (!user) {
                throw new Error('No user data available');
            }

            return { user };
        } catch (error) {
            console.error('Session refresh error:', error);
            throw error;
        }
    }

    async getCurrentUser(): Promise<User | null> {
        try {
            const userStr = await storage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error('Get current user error:', error);
            return null;
        }
    }
}