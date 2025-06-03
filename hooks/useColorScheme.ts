import { useThemeStore } from '@/store/useThemeStore';

export function useColorScheme() {
    const { theme } = useThemeStore();
    return theme;
}
