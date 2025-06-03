import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/localization';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useProfileStore } from '../../modules/profile/store/useProfileStore';

export default function ProfileScreen() {
    const { user, logout } = useAuth();
    const { name, email, avatar } = useProfileStore();
    const { t } = useTranslation();
    const colorScheme = useColorScheme();

    const handleBack = () => {
        router.replace('/(tabs)');
    };

    const handleEditProfile = () => {
        router.push('/profile/edit');
    };

    const handlePreferences = () => {
        router.push('/profile/preferences');
    };

    const handleSettings = () => {
        router.push('/settings');
    };

    // Kolor strzałki na podstawie aktualnego motywu
    const arrowColor = Colors[colorScheme ?? 'light'].text;

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={handleBack}
                    style={styles.backButton}
                    activeOpacity={0.7}
                >
                    <IconSymbol
                        size={24}
                        name="chevron.left"
                        color={arrowColor}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Avatar
                    size={80}
                    source={avatar ? { uri: avatar } : undefined}
                />
                <View style={styles.userInfo}>
                    <ThemedText style={styles.name}>{name || user?.email}</ThemedText>
                    <ThemedText style={styles.email}>{email || user?.email}</ThemedText>
                </View>
            </View>

            <View style={styles.options}>
                <Button
                    title={t('profile.editProfile')}
                    onPress={handleEditProfile}
                    variant="secondary"
                    style={styles.option}
                />

                <Button
                    title={t('profile.preferences')}
                    onPress={handlePreferences}
                    variant="secondary"
                    style={styles.option}
                />

                <Button
                    title={t('profile.settings')}
                    onPress={handleSettings}
                    variant="secondary"
                    style={styles.option}
                />
            </View>

            <Button
                title={t('profile.logout')}
                onPress={logout}
                variant="danger"
                style={styles.logoutButton}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
        paddingLeft: 40,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 0,
        paddingRight: 16,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        opacity: 0.8, // Zwiększona przezroczystość dla lepszej widoczności
    },
    userInfo: {
        marginLeft: 16,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        opacity: 0.7,
    },
    options: {
        marginBottom: 32,
    },
    option: {
        marginBottom: 8,
    },
    logoutButton: {
        marginTop: 'auto',
    },
});