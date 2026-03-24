import type { AuthSession } from '@/types/auth';

let currentSession: AuthSession | null = null;

export function getAuthSession() {
  return currentSession;
}

export function setAuthSession(session: AuthSession | null) {
  currentSession = session;
}
