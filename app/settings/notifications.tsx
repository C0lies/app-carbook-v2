import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { NotificationToggle } from '@/modules/settings/components/NotificationToggle';

export default function NotificationsScreen() {
    return (
        <ThemedView style={styles.container}>
            <NotificationToggle />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});