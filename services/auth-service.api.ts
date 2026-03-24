import { apiClient } from '@/lib/api/client';
import type { AuthService } from '@/services/auth-service.types';
import type { AuthSession, LoginInput } from '@/types/auth';

export const apiAuthService: AuthService = {
  login(input: LoginInput) {
    return apiClient.post<AuthSession>('/auth/login', input, {
      'X-Auth-Mode': 'password',
    });
  },

  refresh(input) {
    return apiClient.post<AuthSession>('/auth/refresh', input, {
      'X-Auth-Mode': 'refresh-token',
    });
  },

  logout() {
    return apiClient.post<void>('/auth/logout');
  },
};
