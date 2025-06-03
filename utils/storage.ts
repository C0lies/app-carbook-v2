import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

class Storage {
    async getItem(key: string): Promise<string | null> {
        if (Platform.OS === 'web') {
            return localStorage.getItem(key);
        } else {
            try {
                return await SecureStore.getItemAsync(key);
            } catch {
                // Fallback to AsyncStorage if SecureStore fails
                return await AsyncStorage.getItem(key);
            }
        }
    }

    async setItem(key: string, value: string): Promise<void> {
        if (Platform.OS === 'web') {
            localStorage.setItem(key, value);
        } else {
            try {
                await SecureStore.setItemAsync(key, value);
            } catch {
                // Fallback to AsyncStorage if SecureStore fails
                await AsyncStorage.setItem(key, value);
            }
        }
    }

    async removeItem(key: string): Promise<void> {
        if (Platform.OS === 'web') {
            localStorage.removeItem(key);
        } else {
            try {
                await SecureStore.deleteItemAsync(key);
            } catch {
                // Fallback to AsyncStorage if SecureStore fails
                await AsyncStorage.removeItem(key);
            }
        }
    }
}

export const storage = new Storage();
