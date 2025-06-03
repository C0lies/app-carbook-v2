import React from 'react';
import { TextInput, StyleSheet, View, Text, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
    error?: string;
}

export const Input = ({ error, style, ...props }: InputProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    { borderColor: error ? '#ff3b30' : '#e1e1e1' },
                    style
                ]}
                placeholderTextColor="#666"
                {...props}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    errorText: {
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
        color: '#ff3b30',
    },
});