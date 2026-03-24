import type {
  AssignmentDetail,
  AssignmentEntry,
  AssignmentFormInput,
  AssignmentSubmission,
  AttendanceDetail,
  AttendanceEntry,
  AttendanceStudent,
  ClassOverview,
  DashboardStat,
  InsightItem,
  ScheduleEntry,
  TeacherProfile,
} from '@/types/teacher';

export type TeacherService = {
  getProfile(): Promise<TeacherProfile>;
  getDashboardStats(): Promise<DashboardStat[]>;
  getTodaysSchedule(): Promise<ScheduleEntry[]>;
  getAssignments(): Promise<AssignmentEntry[]>;
  getAssignmentDetail(id: string): Promise<AssignmentDetail | null>;
  createAssignment(input: AssignmentFormInput): Promise<AssignmentDetail>;
  updateSubmissionReview(
    assignmentId: string,
    submissionId: string,
    reviewStatus: AssignmentSubmission['reviewStatus'],
  ): Promise<AssignmentDetail>;
  getAttendance(): Promise<AttendanceEntry[]>;
  getAttendanceDetail(id: string): Promise<AttendanceDetail | null>;
  saveAttendance(id: string, students: AttendanceStudent[]): Promise<AttendanceDetail>;
  getClasses(): Promise<ClassOverview[]>;
  getNotices(): Promise<InsightItem[]>;
  getStudentSupportItems(): Promise<InsightItem[]>;
  getAttendanceInsights(): Promise<InsightItem[]>;
};
