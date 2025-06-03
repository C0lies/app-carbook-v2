import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useTranslation } from '@/localization';
import { getEmailError } from '@/utils/validateEmail';
import { getPasswordError } from '@/utils/validatePassword';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const { login } = useAuth();

    const validateForm = () => {
        const newErrors = {
            email: '',
            password: ''
        };

        newErrors.email = getEmailError(email);
        newErrors.password = getPasswordError(password);

        setErrors(newErrors);
        return !newErrors.email && !newErrors.password;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            await login(email, password);
            router.replace('/(tabs)');
        } catch (error) {
            console.error('Login error:', error);
            setErrors({
                email: t('auth.loginError'),
                password: t('auth.loginError')
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{t('auth.welcomeBack')}</Text>
                <Text style={styles.subtitle}>
                    {t('auth.pleaseLogin')}
                    {'\n'}(użyj: email@example.com / test123)
                </Text>
            </View>

            <View style={styles.form}>
                <Input
                    placeholder={t('auth.email')}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    error={errors.email}
                />
                <Input
                    placeholder={t('auth.password')}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    error={errors.password}
                />
                <Button
                    title={t('auth.login')}
                    onPress={handleSubmit}
                    loading={loading}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    header: {
        marginBottom: 32,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    form: {
        gap: 16,
    },
});