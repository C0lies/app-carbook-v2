import * as z from 'zod';

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email jest wymagany')
        .email('Nieprawidłowy format email'),
    password: z
        .string()
        .min(6, 'Hasło musi mieć minimum 6 znaków')
        .max(50, 'Hasło nie może być dłuższe niż 50 znaków'),
});

export const signupSchema = z.object({
    email: z
        .string()
        .min(1, 'Email jest wymagany')
        .email('Nieprawidłowy format email'),
    username: z
        .string()
        .min(3, 'Nazwa użytkownika musi mieć minimum 3 znaki')
        .max(30, 'Nazwa użytkownika nie może być dłuższa niż 30 znaków'),
    password: z
        .string()
        .min(6, 'Hasło musi mieć minimum 6 znaków')
        .max(50, 'Hasło nie może być dłuższe niż 50 znaków')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
            'Hasło musi zawierać co najmniej jedną wielką literę, jedną małą literę i jedną cyfrę'
        ),
    confirmPassword: z
        .string()
        .min(1, 'Potwierdzenie hasła jest wymagane'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Hasła nie są takie same",
    path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, 'Email jest wymagany')
        .email('Nieprawidłowy format email'),
});

export const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(6, 'Hasło musi mieć minimum 6 znaków')
        .max(50, 'Hasło nie może być dłuższe niż 50 znaków')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
            'Hasło musi zawierać co najmniej jedną wielką literę, jedną małą literę i jedną cyfrę'
        ),
    confirmPassword: z
        .string()
        .min(1, 'Potwierdzenie hasła jest wymagane'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Hasła nie są takie same",
    path: ["confirmPassword"],
});

// Eksport typów inferowanych ze schematów
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;