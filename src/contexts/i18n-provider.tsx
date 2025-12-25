
'use client';

import React, { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import ar from '@/locales/ar.json';
import en from '@/locales/en.json';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface I18nContextType {
  language: Language;
  direction: Direction;
  t: (key: keyof typeof en) => string;
  toggleLanguage: () => void;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations = { en, ar };

// Create a client-side only wrapper for the provider
function I18nClientProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');
  const [direction, setDirection] = useState<Direction>('rtl');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language | null;
    if (storedLang) {
      setLanguage(storedLang);
      setDirection(storedLang === 'ar' ? 'rtl' : 'ltr');
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    localStorage.setItem('language', language);
  }, [language, direction]);

  const t = useCallback((key: keyof typeof en) => {
    return translations[language][key] || key;
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    setDirection(newLanguage === 'ar' ? 'rtl' : 'ltr');
  };

  return (
    <I18nContext.Provider value={{ language, direction, t, toggleLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}


export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Render a placeholder on the server and the actual provider on the client
  return isClient ? <I18nClientProvider>{children}</I18nClientProvider> : <>{children}</>;
}
