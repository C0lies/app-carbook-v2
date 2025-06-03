import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

interface AvatarProps {
    source?: ImageSourcePropType;
    size?: number;
}

export function Avatar({ source, size = 40 }: AvatarProps) {
    const styles = StyleSheet.create({
        container: {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: '#E1E1E1',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        },
        image: {
            width: size,
            height: size,
        },
    });

    return (
        <View style={styles.container}>
            {source ? (
                <Image source={source} style={styles.image} />
            ) : (
                <IconSymbol name="person.fill" size={size * 0.6} color="#999999" />
            )}
        </View>
    );
}