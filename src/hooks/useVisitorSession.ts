import { useState, useCallback } from 'react';
import { hasConsented } from './useCookieConsent';

// ======================== TYPES ========================

export interface VisitorSession {
  name: string;
  email: string;
}

// ======================== STORAGE ========================

const STORAGE_KEY = 'visitor_session';

function getStoredSession(): VisitorSession | null {
  try {
    if (!hasConsented()) return null;
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.name && parsed?.email) return parsed as VisitorSession;
    return null;
  } catch {
    return null;
  }
}

function storeSession(session: VisitorSession): void {
  if (!hasConsented()) return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function clearStoredSession(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}

// ======================== HOOK ========================

export function useVisitorSession() {
  const [session, setSession] = useState<VisitorSession | null>(getStoredSession);

  const saveSession = useCallback((data: VisitorSession) => {
    storeSession(data);
    setSession(data);
  }, []);

  const clearSession = useCallback(() => {
    clearStoredSession();
    setSession(null);
  }, []);

  return {
    session,
    isIdentified: !!session,
    saveSession,
    clearSession,
  };
}
