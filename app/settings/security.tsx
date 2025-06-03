import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { SecuritySettings } from '@/modules/settings/components/SecuritySettings';

export default function SecurityScreen() {
    return (
        <ThemedView style={styles.container}>
            <SecuritySettings />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});