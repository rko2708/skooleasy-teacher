import type { AuthSession, LoginInput } from '@/types/auth';

export type AuthService = {
  login(input: LoginInput): Promise<AuthSession>;
  logout(): Promise<void>;
};
