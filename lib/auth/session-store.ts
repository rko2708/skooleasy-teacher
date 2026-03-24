import type { AuthSession } from '@/types/auth';

let currentSession: AuthSession | null = null;
let refreshHandler: (() => Promise<AuthSession | null>) | null = null;

export function getAuthSession() {
  return currentSession;
}

export function setAuthSession(session: AuthSession | null) {
  currentSession = session;
}

export function registerAuthRefreshHandler(handler: () => Promise<AuthSession | null>) {
  refreshHandler = handler;
}

export async function refreshAuthSession() {
  if (!refreshHandler) {
    return null;
  }

  const nextSession = await refreshHandler();
  currentSession = nextSession;
  return nextSession;
}
