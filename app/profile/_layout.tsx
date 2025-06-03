import { Stack } from 'expo-router';

export default function ProfileLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="edit"
                options={{
                    title: 'Edit Profile',
                    headerShown: true,
                    presentation: 'modal'
                }}
            />
            <Stack.Screen
                name="preferences"
                options={{
                    title: 'Preferences',
                    headerShown: true,
                    presentation: 'modal'
                }}
            />
        </Stack>
    );
}