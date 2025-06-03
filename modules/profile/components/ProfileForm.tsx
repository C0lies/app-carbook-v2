import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { AvatarUpload } from './AvatarUpload';
import { useProfileStore } from '../store/useProfileStore';
import { ThemedView } from '@/components/ThemedView';

export function ProfileForm() {
    const router = useRouter();
    const { name, email, avatar, setProfile } = useProfileStore();
    const [formData, setFormData] = useState({
        name: name || '',
        email: email || '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await setProfile(formData);
            router.back();
        } catch (error) {
            console.error('Failed to update profile:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <AvatarUpload
                currentAvatar={avatar}
                onUpload={(url) => setProfile({ avatar: url })}
            />
            <View style={styles.form}>
                <Input
                    value={formData.name}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                    placeholder="Enter your name"
                    style={styles.input}
                />
                <Input
                    value={formData.email}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                />
                <Button
                    title="Save Changes"
                    onPress={handleSubmit}
                    loading={loading}
                />
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    form: {
        gap: 16,
        marginTop: 24,
    },
    input: {
        marginBottom: 8,
    },
});