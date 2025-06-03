import React from 'react';
import { Stack } from 'expo-router';
import { ProfileForm } from '@/modules/profile/components/ProfileForm';

export default function EditProfileScreen() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Edit Profile',
                }}
            />
            <ProfileForm />
        </>
    );
}