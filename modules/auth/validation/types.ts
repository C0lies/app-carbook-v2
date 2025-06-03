export interface User {
    id: number;
    email: string;
    name?: string;
    role: string;
    avatarUrl?: string;
}

export interface AuthResponse {
    accessToken: string;
}

export interface DecodedToken {
    id: number;
    email: string;
    role: string;
    exp: number;
    iat: number;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RefreshResponse {
    accessToken: string;
}
