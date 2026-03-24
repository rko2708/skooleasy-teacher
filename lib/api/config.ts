const rawBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim() ?? '';
const rawUseMock = process.env.EXPO_PUBLIC_USE_MOCK_API?.trim().toLowerCase();
const rawSchoolId = process.env.EXPO_PUBLIC_SCHOOL_ID?.trim() ?? '';

export const apiConfig = {
  baseUrl: rawBaseUrl,
  schoolId: rawSchoolId,
  useMockApi: rawUseMock !== 'false',
};
