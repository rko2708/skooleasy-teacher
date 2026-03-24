const rawBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim() ?? '';
const rawUseMock = process.env.EXPO_PUBLIC_USE_MOCK_API?.trim().toLowerCase();

export const apiConfig = {
  baseUrl: rawBaseUrl,
  useMockApi: rawUseMock !== 'false',
};
