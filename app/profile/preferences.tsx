import React from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, View, Switch } from 'react-native';
import { useProfileStore } from '@/modules/profile/store/useProfileStore';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTranslation } from '@/localization';

export default function PreferencesScreen() {
    const { preferences, updatePreferences } = useProfileStore();
    const { theme, toggleTheme } = useThemeStore();
    const { t, language, setLanguage } = useTranslation();

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'pl' : 'en';
        setLanguage(newLanguage);
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: t('preferences.title'),
                }}
            />
            <ThemedView style={styles.container}>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <ThemedText>{t('preferences.pushNotifications')}</ThemedText>
                        <Switch
                            value={preferences.notifications}
                            onValueChange={(value) =>
                                updatePreferences({ notifications: value })
                            }
                        />
                    </View>
                    <View style={styles.row}>
                        <ThemedText>{t('preferences.darkMode')}</ThemedText>
                        <Switch
                            value={theme === 'dark'}
                            onValueChange={toggleTheme}
                        />
                    </View>
                    <View style={styles.row}>
                        <ThemedText>{t('preferences.language')}</ThemedText>
                        <ThemedText
                            onPress={toggleLanguage}
                            style={styles.language}
                        >
                            {language.toUpperCase()}
                        </ThemedText>
                    </View>
                </View>
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    section: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        gap: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    language: {
        color: '#007AFF',
    },
});