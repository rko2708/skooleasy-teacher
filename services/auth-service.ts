import { apiConfig } from '@/lib/api/config';
import { apiAuthService } from '@/services/auth-service.api';
import { mockAuthService } from '@/services/auth-service.mock';

export const authService = apiConfig.useMockApi ? mockAuthService : apiAuthService;
