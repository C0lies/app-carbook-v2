import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    loading?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = ({
    title,
    loading = false,
    variant = 'primary',
    style,
    disabled,
    ...props
}: ButtonProps) => {
    const buttonStyles = [
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        variant === 'danger' && styles.buttonDanger,
        disabled && styles.buttonDisabled,
        style,
    ];

    const textStyles = [
        styles.text,
        variant === 'secondary' && styles.textSecondary,
        variant === 'danger' && styles.textDanger,
        disabled && styles.textDisabled,
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={textStyles}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSecondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    buttonDanger: {
        backgroundColor: '#FF3B30',
    },
    buttonDisabled: {
        backgroundColor: '#E5E5EA',
        borderColor: '#E5E5EA',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    textSecondary: {
        color: '#007AFF',
    },
    textDanger: {
        color: '#FFFFFF',
    },
    textDisabled: {
        color: '#C7C7CC',
    },
});