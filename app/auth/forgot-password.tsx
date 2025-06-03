import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ForgotPasswordForm } from '@/modules/auth/components/ForgotPasswordForm';
import { Button } from '@/components/Button';
import { useTranslation } from '@/localization';

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <ForgotPasswordForm />
                    </View>
                    <View style={styles.additionalButtons}>
                        <Button
                            title={t('auth.backToLogin')}
                            variant="secondary"
                            onPress={() => navigation.goBack()}
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

export default ForgotPasswordScreen;