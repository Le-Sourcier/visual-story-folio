import { useState, useCallback, useMemo } from 'react';

// ======================== TYPES ========================

export interface CookiePreferences {
  essential: boolean;   // Always true - required
  analytics: boolean;   // Traffic analysis, page views
  marketing: boolean;   // Personalization, ads
}

export type ConsentChoice = 'all' | 'essential' | null;

// ======================== STORAGE ========================

const STORAGE_KEY = 'cookie_consent';

function getStoredConsent(): ConsentChoice {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'all' || raw === 'essential') return raw;
    return null;
  } catch {
    return null;
  }
}

// ======================== HOOK ========================

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentChoice>(getStoredConsent);

  const accept = useCallback((choice: 'all' | 'essential') => {
    localStorage.setItem(STORAGE_KEY, choice);
    setConsent(choice);
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setConsent(null);
  }, []);

  const preferences: CookiePreferences = useMemo(() => ({
    essential: true, // always
    analytics: consent === 'all',
    marketing: consent === 'all',
  }), [consent]);

  return {
    consent,
    hasConsented: consent !== null,
    preferences,
    accept,
    reset,
  };
}

// ======================== STANDALONE GUARD ========================
// For use outside React components (API client, scripts, etc.)

export function getCookiePreferences(): CookiePreferences {
  const consent = getStoredConsent();
  return {
    essential: true,
    analytics: consent === 'all',
    marketing: consent === 'all',
  };
}

export function hasConsented(): boolean {
  return getStoredConsent() !== null;
}

export function canUse(category: keyof CookiePreferences): boolean {
  return getCookiePreferences()[category];
}
