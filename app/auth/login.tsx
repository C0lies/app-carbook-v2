import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LoginForm } from '@/modules/auth/components/LoginForm';
import { Button } from '@/components/Button';
import { useTranslation } from '@/localization';

type AuthStackParamList = {
    'auth/signup': undefined;
    'auth/forgot-password': undefined;
};

const LoginScreen = () => {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <LoginForm />
                    </View>
                    <View style={styles.additionalButtons}>
                        <Button
                            title={t('auth.signup')}
                            variant="secondary"
                            onPress={() => navigation.navigate('auth/signup')}
                        />
                        <Button
                            title={t('auth.forgotPassword')}
                            variant="secondary"
                            onPress={() => navigation.navigate('auth/forgot-password')}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardView: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    additionalButtons: {
        padding: 16,
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
});

export default LoginScreen;