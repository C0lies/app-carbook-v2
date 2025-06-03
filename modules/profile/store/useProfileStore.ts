import { create } from 'zustand';

interface ProfileState {
    name: string;
    email: string;
    avatar: string | null;
    preferences: {
        notifications: boolean;
        darkMode: boolean;
        language: 'en' | 'pl';
    };
    setProfile: (profile: Partial<Omit<ProfileState, 'setProfile' | 'updatePreferences'>>) => void;
    updatePreferences: (preferences: Partial<ProfileState['preferences']>) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
    name: '',
    email: '',
    avatar: null,
    preferences: {
        notifications: true,
        darkMode: false,
        language: 'en',
    },
    setProfile: (profile) => set((state) => ({ ...state, ...profile })),
    updatePreferences: (preferences) =>
        set((state) => ({
            ...state,
            preferences: { ...state.preferences, ...preferences },
        })),
}));