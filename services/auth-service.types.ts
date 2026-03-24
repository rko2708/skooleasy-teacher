import type { AuthSession, LoginInput, RefreshSessionInput } from '@/types/auth';

export type AuthService = {
  login(input: LoginInput): Promise<AuthSession>;
  refresh(input: RefreshSessionInput): Promise<AuthSession>;
  logout(): Promise<void>;
};
