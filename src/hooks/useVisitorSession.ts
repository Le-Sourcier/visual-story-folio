import { useState, useCallback } from 'react';
import { hasConsented } from './useCookieConsent';

// ======================== TYPES ========================

export interface VisitorSession {
  name: string;
  email: string;
}

// ======================== STORAGE ========================

const STORAGE_KEY = 'visitor_session';
const PERSIST_KEY = 'visitor_session_persist'; // "true" if user chose "Se souvenir"

function isPersisted(): boolean {
  try {
    return localStorage.getItem(PERSIST_KEY) === 'true';
  } catch {
    return false;
  }
}

function getStoredSession(): VisitorSession | null {
  try {
    if (!hasConsented()) return null;

    // Check localStorage first (persisted), then sessionStorage (temporary)
    const raw = isPersisted()
      ? localStorage.getItem(STORAGE_KEY)
      : sessionStorage.getItem(STORAGE_KEY);

    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.name && parsed?.email) return parsed as VisitorSession;
    return null;
  } catch {
    return null;
  }
}

function storeSession(session: VisitorSession, remember: boolean): void {
  if (!hasConsented()) return;

  const data = JSON.stringify(session);

  if (remember) {
    localStorage.setItem(PERSIST_KEY, 'true');
    localStorage.setItem(STORAGE_KEY, data);
    sessionStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.removeItem(PERSIST_KEY);
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.setItem(STORAGE_KEY, data);
  }
}

function clearStoredSession(): void {
  sessionStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(PERSIST_KEY);
}

// ======================== HOOK ========================

export function useVisitorSession() {
  const [session, setSession] = useState<VisitorSession | null>(getStoredSession);

  const saveSession = useCallback((data: VisitorSession, remember = false) => {
    storeSession(data, remember);
    setSession(data);
  }, []);

  const clearSession = useCallback(() => {
    clearStoredSession();
    setSession(null);
  }, []);

  return {
    session,
    isIdentified: !!session,
    isPersisted: isPersisted(),
    saveSession,
    clearSession,
  };
}
