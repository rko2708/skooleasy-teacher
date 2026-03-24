export type AuthSession = {
  accessToken: string;
  refreshToken?: string;
  teacherId: string;
  schoolId: string;
  teacherName: string;
  role: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RefreshSessionInput = {
  refreshToken: string;
};
