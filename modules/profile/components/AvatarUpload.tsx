import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar } from '@/components/Avatar';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface AvatarUploadProps {
    currentAvatar: string | null;
    onUpload: (url: string) => void;
}

export function AvatarUpload({ currentAvatar, onUpload }: AvatarUploadProps) {
    const handlePress = async () => {
        // TODO: Implement image picker and upload functionality
        // For now, just use a placeholder URL
        onUpload('https://via.placeholder.com/150');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress} style={styles.uploadButton}>
                <Avatar size={100} source={currentAvatar ? { uri: currentAvatar } : undefined} />
                <View style={styles.editIcon}>
                    <IconSymbol name="pencil" size={16} color="white" />
                </View>
            </TouchableOpacity>
            <ThemedText style={styles.hint}>Tap to change photo</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    uploadButton: {
        position: 'relative',
    },
    editIcon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#007AFF',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hint: {
        marginTop: 8,
        fontSize: 14,
        opacity: 0.7,
    },
});