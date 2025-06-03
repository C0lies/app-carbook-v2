export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
};

export const getPasswordError = (password: string): string => {
    if (!password) {
        return 'Hasło jest wymagane';
    }
    if (!validatePassword(password)) {
        return 'Hasło musi mieć minimum 6 znaków';
    }
    return '';
};

export const getConfirmPasswordError = (password: string, confirmPassword: string): string => {
    if (!confirmPassword) {
        return 'Potwierdzenie hasła jest wymagane';
    }
    if (!validatePasswordMatch(password, confirmPassword)) {
        return 'Hasła nie są takie same';
    }
    return '';
};