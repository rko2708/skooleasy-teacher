import { apiConfig } from '@/lib/api/config';

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

  const response = await fetch(`${apiConfig.baseUrl}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

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
