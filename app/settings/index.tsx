import React from 'react';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTranslation } from '@/localization';

export default function SettingsScreen() {
    const { t } = useTranslation();

    return (
        <ThemedView style={styles.container}>
            <Link href="/settings/notifications" asChild>
                <ThemedText style={styles.link}>
                    {t('settings.notifications')}
                </ThemedText>
            </Link>
            <Link href="/settings/security" asChild>
                <ThemedText style={styles.link}>
                    {t('settings.security')}
                </ThemedText>
            </Link>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    link: {
        fontSize: 16,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});