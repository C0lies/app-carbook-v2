const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Dodanie konfiguracji resolverów
config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = [
    'require',
    'react-native',
    'default',
];

// Wyciszenie ostrzeżeń
config.logger = {
    warn: (message) => {
        if (message.includes('shadow*') || message.includes('pointerEvents')) {
            return;
        }
        console.warn(message);
    }
};

module.exports = config;
