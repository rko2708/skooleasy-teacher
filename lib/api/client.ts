import { apiConfig } from '@/lib/api/config';
import { getAuthSession, refreshAuthSession } from '@/lib/auth/session-store';

type RequestOptions = {
  body?: unknown;
  headers?: Record<string, string>;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH';
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!apiConfig.baseUrl) {
    throw new Error('Missing EXPO_PUBLIC_API_BASE_URL for remote API mode.');
  }

  const session = getAuthSession();

  const response = await fetch(`${apiConfig.baseUrl}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {}),
      ...(session?.teacherId ? { 'X-Teacher-Id': session.teacherId } : {}),
      ...(session?.role ? { 'X-Teacher-Role': session.role } : {}),
      ...(session?.schoolId || apiConfig.schoolId
        ? { 'X-School-Id': session?.schoolId ?? apiConfig.schoolId }
        : {}),
      ...(options.headers ?? {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (response.status === 401 && session?.refreshToken) {
    const refreshedSession = await refreshAuthSession();

    if (refreshedSession?.accessToken) {
      const retryResponse = await fetch(`${apiConfig.baseUrl}${path}`, {
        method: options.method ?? 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshedSession.accessToken}`,
          ...(refreshedSession.teacherId ? { 'X-Teacher-Id': refreshedSession.teacherId } : {}),
          ...(refreshedSession.role ? { 'X-Teacher-Role': refreshedSession.role } : {}),
          ...(refreshedSession.schoolId || apiConfig.schoolId
            ? { 'X-School-Id': refreshedSession.schoolId ?? apiConfig.schoolId }
            : {}),
          ...(options.headers ?? {}),
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      if (!retryResponse.ok) {
        const retryMessage = await retryResponse.text();
        throw new ApiError(retryMessage || 'API request failed', retryResponse.status);
      }

      return (await retryResponse.json()) as T;
    }
  }

  if (!response.ok) {
    const message = await response.text();
    throw new ApiError(message || 'API request failed', response.status);
  }

  return (await response.json()) as T;
}

export const apiClient = {
  get<T>(path: string, headers?: Record<string, string>) {
    return request<T>(path, { headers, method: 'GET' });
  },

  post<T>(path: string, body?: unknown, headers?: Record<string, string>) {
    return request<T>(path, { body, headers, method: 'POST' });
  },

  put<T>(path: string, body?: unknown, headers?: Record<string, string>) {
    return request<T>(path, { body, headers, method: 'PUT' });
  },

  patch<T>(path: string, body?: unknown, headers?: Record<string, string>) {
    return request<T>(path, { body, headers, method: 'PATCH' });
  },
};
