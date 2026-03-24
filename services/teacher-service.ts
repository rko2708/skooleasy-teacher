import { apiConfig } from '@/lib/api/config';
import { apiTeacherService } from '@/services/teacher-service.api';
import { mockTeacherService } from '@/services/teacher-service.mock';

export const teacherService = apiConfig.useMockApi ? mockTeacherService : apiTeacherService;
