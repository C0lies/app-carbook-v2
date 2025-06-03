import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { useTranslation } from '@/localization';

export const SecuritySettings = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Button
                title={t('settings.changePassword')}
                onPress={() => { }}
                variant="secondary"
            />
            <Button
                title={t('settings.enable2FA')}
                onPress={() => { }}
                variant="secondary"
            />
            <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>
                    {t('settings.lastLogin')}
                </ThemedText>
                <ThemedText style={styles.sectionContent}>
                    2023-06-02 12:00:00
                </ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 14,
        opacity: 0.7,
        marginBottom: 8,
    },
    sectionContent: {
        fontSize: 16,
    },
});