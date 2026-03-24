import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import {
  registerAuthRefreshHandler,
  setAuthSession,
} from '@/lib/auth/session-store';
import {
  clearPersistedSession,
  loadPersistedSession,
  persistSession,
} from '@/lib/auth/session-persistence';
import { authService } from '@/services/auth-service';
import type { AuthSession, LoginInput } from '@/types/auth';

type AuthContextValue = {
  initialized: boolean;
  session: AuthSession | null;
  signIn: (input: LoginInput) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [initialized, setInitialized] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      const restoredSession = await loadPersistedSession();

      if (!active) {
        return;
      }

      setSession(restoredSession);
      setAuthSession(restoredSession);
      setInitialized(true);
    }

    bootstrap();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    registerAuthRefreshHandler(async () => {
      if (!session?.refreshToken) {
        setSession(null);
        setAuthSession(null);
        await clearPersistedSession();
        return null;
      }

      try {
        const nextSession = await authService.refresh({
          refreshToken: session.refreshToken,
        });
        setSession(nextSession);
        setAuthSession(nextSession);
        await persistSession(nextSession);
        return nextSession;
      } catch {
        setSession(null);
        setAuthSession(null);
        await clearPersistedSession();
        return null;
      }
    });
  }, [session]);

  async function signIn(input: LoginInput) {
    const nextSession = await authService.login(input);
    setSession(nextSession);
    setAuthSession(nextSession);
    await persistSession(nextSession);
  }

  async function signOut() {
    await authService.logout();
    setSession(null);
    setAuthSession(null);
    await clearPersistedSession();
  }

  const value = useMemo(
    () => ({
      initialized,
      session,
      signIn,
      signOut,
    }),
    [initialized, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
