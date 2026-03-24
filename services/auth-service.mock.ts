import type { AuthService } from '@/services/auth-service.types';

const wait = async (delay = 180) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, delay);
  });

export const mockAuthService: AuthService = {
  async login({ email }) {
    await wait();

    const normalizedEmail = email.trim().toLowerCase();
    const nameFromEmail = normalizedEmail.split('@')[0] || 'teacher';
    const teacherName = nameFromEmail
      .split('.')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      teacherId: 'teacher-101',
      schoolId: 'school-skool-easy',
      teacherName,
      role: 'Class Teacher',
    };
  },

  async refresh({ refreshToken }) {
    await wait(120);

    return {
      accessToken: `mock-access-token-${Date.now()}`,
      refreshToken,
      teacherId: 'teacher-101',
      schoolId: 'school-skool-easy',
      teacherName: 'Ananya Mehta',
      role: 'Class Teacher',
    };
  },

  async logout() {
    await wait(80);
  },
};
