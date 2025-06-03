import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useTranslation } from '@/localization';

export const NotificationToggle = () => {
    const [enabled, setEnabled] = React.useState(true);
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <ThemedText>{t('settings.pushNotifications')}</ThemedText>
                <Switch
                    value={enabled}
                    onValueChange={setEnabled}
                />
            </View>
            <View style={styles.row}>
                <ThemedText>{t('settings.emailNotifications')}</ThemedText>
                <Switch
                    value={enabled}
                    onValueChange={setEnabled}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
});