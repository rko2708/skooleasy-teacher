import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import { setAuthSession } from '@/lib/auth/session-store';
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
    setInitialized(true);
  }, []);

  async function signIn(input: LoginInput) {
    const nextSession = await authService.login(input);
    setSession(nextSession);
    setAuthSession(nextSession);
  }

  async function signOut() {
    await authService.logout();
    setSession(null);
    setAuthSession(null);
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
