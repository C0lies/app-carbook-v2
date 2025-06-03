import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const { theme } = useThemeStore();

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (hasHydrated) {
    return theme;
  }

  return 'light';
}
