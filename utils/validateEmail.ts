export const validateEmail = (email: string): boolean => {
    // Podstawowa walidacja emaila
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Funkcja zwracająca komunikat błędu
export const getEmailError = (email: string): string => {
    if (!email) {
        return 'Email jest wymagany';
    }
    if (!validateEmail(email)) {
        return 'Nieprawidłowy format email';
    }
    return '';
};