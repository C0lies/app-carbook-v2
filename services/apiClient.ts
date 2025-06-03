import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';

const BASE_URL = Platform.select({
    web: 'http://localhost:4000/api',
    ios: 'http://192.168.0.101:4000/api',
    android: 'http://192.168.0.101:4000/api',
    default: 'http://localhost:4000/api',
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

export class ApiClient {
    private client: AxiosInstance;
    private refreshPromise: Promise<string> | null = null;

    constructor() {
        this.client = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // Ważne dla obsługi ciasteczek
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.client.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config;
                if (!originalRequest) return Promise.reject(error);

                // If the error is not 401 or the request was for refresh, reject
                if (error.response?.status !== 401 || originalRequest.url === '/auth/refresh') {
                    return Promise.reject(error);
                }

                if (!isRefreshing) {
                    isRefreshing = true;

                    try {
                        const { data } = await this.client.post('/auth/refresh');
                        const { accessToken } = data;

                        this.setAuthToken(accessToken);
                        refreshSubscribers.forEach((cb) => cb(accessToken));
                        refreshSubscribers = [];

                        // Retry original request with new token
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                        return this.client(originalRequest);
                    } catch (refreshError) {
                        refreshSubscribers = [];
                        // Handle refresh token failure (e.g., redirect to login)
                        return Promise.reject(refreshError);
                    } finally {
                        isRefreshing = false;
                    }
                }

                // If refresh is already in progress, wait for the new token
                return new Promise((resolve) => {
                    refreshSubscribers.push((token: string) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(this.client(originalRequest));
                    });
                });
            }
        );
    }

    setAuthToken(token: string) {
        this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    clearAuthToken() {
        delete this.client.defaults.headers.common['Authorization'];
    }

    private async refreshToken(): Promise<string> {
        try {
            this.refreshPromise = (async () => {
                const response = await this.client.get<{ accessToken: string }>('/auth/refresh');
                const accessToken = response.data.accessToken;
                this.setAuthToken(accessToken);
                return accessToken;
            })();
            const token = await this.refreshPromise;
            this.refreshPromise = null;
            return token;
        } catch (error) {
            this.refreshPromise = null;
            throw error;
        }
    }

    async get<T = any>(path: string, config?: AxiosRequestConfig) {
        const response = await this.client.get<T>(path, config);
        return response.data;
    }

    async post<T = any>(path: string, data?: any, config?: AxiosRequestConfig) {
        const response = await this.client.post<T>(path, data, config);
        return response.data;
    }

    async put<T = any>(path: string, data?: any, config?: AxiosRequestConfig) {
        const response = await this.client.put<T>(path, data, config);
        return response.data;
    }

    async delete<T = any>(path: string, config?: AxiosRequestConfig) {
        const response = await this.client.delete<T>(path, config);
        return response.data;
    }
}

export const apiClient = new ApiClient();