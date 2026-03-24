import { apiClient } from '@/lib/api/client';
import type { TeacherService } from '@/services/teacher-service.types';

export const apiTeacherService: TeacherService = {
  getProfile() {
    return apiClient.get('/me');
  },

  getDashboardStats() {
    return apiClient.get('/teachers/me/dashboard-stats');
  },

  getTodaysSchedule() {
    return apiClient.get('/teachers/me/timetable/today');
  },

  getAssignments() {
    return apiClient.get('/teachers/me/assignments');
  },

  getAssignmentDetail(id) {
    return apiClient.get(`/assignments/${id}`);
  },

  createAssignment(input) {
    return apiClient.post('/assignments', input);
  },

  updateSubmissionReview(assignmentId, submissionId, reviewStatus) {
    return apiClient.patch(
      `/assignments/${assignmentId}/submissions/${submissionId}`,
      { reviewStatus },
    );
  },

  getAttendance() {
    return apiClient.get('/teachers/me/attendance');
  },

  getAttendanceDetail(id) {
    return apiClient.get(`/attendance/${id}`);
  },

  saveAttendance(id, students) {
    return apiClient.put(`/attendance/${id}`, { students });
  },

  getClasses() {
    return apiClient.get('/teachers/me/classes');
  },

  getNotices() {
    return apiClient.get('/notices');
  },

  getStudentSupportItems() {
    return apiClient.get('/teachers/me/student-support');
  },

  getAttendanceInsights() {
    return apiClient.get('/teachers/me/attendance-insights');
  },
};
