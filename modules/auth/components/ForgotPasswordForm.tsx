import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { getEmailError } from '@/utils/validateEmail';
import { useTranslation } from '@/localization';
import { ThemedText } from '@/components/ThemedText';

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const { t } = useTranslation();

    const validateForm = () => {
        const emailError = getEmailError(email);
        setError(emailError);
        return !emailError;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setLoading(true);
            try {
                // Symulacja wywołania API
                await new Promise(resolve => setTimeout(resolve, 1000));
                setSent(true);
            } catch (error) {
                console.error('Błąd resetowania hasła:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    if (sent) {
        return (
            <View style={styles.container}>
                <ThemedText style={styles.message}>
                    {t('auth.resetPassword')}
                </ThemedText>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder={t('auth.email')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                error={error}
            />
            <Button
                title={t('auth.resetPassword')}
                onPress={handleSubmit}
                loading={loading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16,
    },
    message: {
        textAlign: 'center',
    },
});