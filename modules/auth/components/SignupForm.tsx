import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { getEmailError } from '@/utils/validateEmail';
import { getPasswordError, getConfirmPasswordError } from '@/utils/validatePassword';

export const SignupForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        };

        // Walidacja email używając funkcji z utils
        newErrors.email = getEmailError(formData.email);

        // Walidacja nazwy użytkownika
        if (!formData.username) {
            newErrors.username = 'Nazwa użytkownika jest wymagana';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Nazwa użytkownika musi mieć minimum 3 znaki';
        }

        // Walidacja hasła
        newErrors.password = getPasswordError(formData.password);

        // Walidacja potwierdzenia hasła
        newErrors.confirmPassword = getConfirmPasswordError(formData.password, formData.confirmPassword);

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setLoading(true);
            try {
                // TODO: Implement registration logic
                console.log('Registering with:', formData);
            } catch (error) {
                console.error('Registration error:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleChange = (field: keyof typeof formData) => (value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Zarejestruj się</Text>
                <Text style={styles.subtitle}>
                    Stwórz nowe konto, aby korzystać z wszystkich funkcji
                </Text>
            </View>

            <View style={styles.form}>
                <Input
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={handleChange('email')}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    error={errors.email}
                />
                <Input
                    placeholder="Nazwa użytkownika"
                    value={formData.username}
                    onChangeText={handleChange('username')}
                    autoCapitalize="none"
                    error={errors.username}
                />
                <Input
                    placeholder="Hasło"
                    value={formData.password}
                    onChangeText={handleChange('password')}
                    secureTextEntry
                    error={errors.password}
                />
                <Input
                    placeholder="Potwierdź hasło"
                    value={formData.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    secureTextEntry
                    error={errors.confirmPassword}
                />
                <Button
                    title="Zarejestruj się"
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