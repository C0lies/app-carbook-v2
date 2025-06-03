import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import en from './en.json';
import pl from './pl.json';

type Language = 'en' | 'pl';
type TranslationKey = string;
type NestedTranslations = { [key: string]: string | NestedTranslations };

interface I18nState {
    language: Language;
    translations: typeof en;
    setLanguage: (language: Language) => void;
    t: (key: string) => string;
}

const translations = {
    en,
    pl,
};

const getNestedValue = (obj: NestedTranslations, path: string): string => {
    return path.split('.').reduce((acc, part) => {
        if (acc && typeof acc === 'object') {
            return acc[part];
        }
        return '';
    }, obj as any) as string;
};

export const useI18n = create<I18nState>()(
    persist(
        (set, get) => ({
            language: 'en',
            translations: translations.en,
            setLanguage: (language) => {
                set({
                    language,
                    translations: translations[language],
                });
            },
            t: (key: TranslationKey) => {
                const state = get();
                const translated = getNestedValue(state.translations, key);
                return translated || key;
            },
        }),
        {
            name: 'language-storage',
        }
    )
);

// Hook dla komponentów funkcyjnych
export const useTranslation = () => {
    const { t, language, setLanguage } = useI18n();
    return { t, language, setLanguage };
};